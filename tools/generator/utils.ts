import * as ts from "typescript";

const tsf = ts.factory;

export async function createImport(module: string, props: string[]) {
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
