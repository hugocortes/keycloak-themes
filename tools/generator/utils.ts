import * as ts from "typescript";

const tsf = ts.factory;

export function createLeadingComment(comment: string) {
  return ts.addSyntheticLeadingComment(
    tsf.createEmptyStatement(),
    ts.SyntaxKind.MultiLineCommentTrivia,
    comment
  );
}

export function createImport(module: string, props: string[]) {
  return tsf.createImportDeclaration(
    undefined,
    undefined,
    tsf.createImportClause(
      false,
      undefined,
      tsf.createNamedImports(
        props.map((prop) =>
          tsf.createImportSpecifier(undefined, tsf.createIdentifier(prop))
        )
      )
    ),
    tsf.createStringLiteral(module)
  );
}

export function printStatements(statements: ts.Statement[]) {
  const file = ts.createSourceFile(
    "_.ts",
    "",
    ts.ScriptTarget.ES2020,
    false,
    ts.ScriptKind.TSX
  );
  (file.statements as any) = tsf.createNodeArray(statements); // readonly var

  return ts.createPrinter().printFile(file);
}
