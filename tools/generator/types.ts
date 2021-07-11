import * as fs from "fs";
import * as ts from "typescript";
import { createImport } from "./utils";

const tsf = ts.factory;

async function generateComponentImport(
  componentName: string,
  componentPath: string
) {
  return tsf.createVariableStatement(
    undefined,
    tsf.createVariableDeclarationList(
      [
        tsf.createVariableDeclaration(
          tsf.createIdentifier(componentName),
          undefined,
          undefined,
          tsf.createCallExpression(tsf.createIdentifier("lazy"), undefined, [
            tsf.createArrowFunction(
              undefined,
              undefined,
              [],
              undefined,
              undefined,
              tsf.createBlock([
                tsf.createReturnStatement(
                  tsf.createCallExpression(
                    tsf.createIdentifier("Promise.resolve"),
                    undefined,
                    [
                      tsf.createCallExpression(
                        tsf.createIdentifier("import"),
                        undefined,
                        [tsf.createStringLiteral(componentPath)]
                      ),
                    ]
                  )
                ),
              ])
            ),
          ])
        ),
      ],
      ts.NodeFlags.Const
    )
  );
}

export async function generateTypes(clients: string[]) {
  const generatedDest = `${__dirname}/../../src/app/components/KcApp/clients/generated.ts`;

  const root: ts.Statement[] = [];

  root.push(
    ts.addSyntheticLeadingComment(
      tsf.createEmptyStatement(),
      ts.SyntaxKind.MultiLineCommentTrivia,
      "Auto-generated file, do not modify"
    )
  );

  root.push(await createImport("react", ["lazy"]));
  root.push(await createImport("./types", ["Client", "ClientConfig"]));

  root.push(
    tsf.createVariableStatement(
      tsf.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
      tsf.createVariableDeclarationList(
        [
          tsf.createVariableDeclaration(
            tsf.createIdentifier("Clients"),
            undefined,
            undefined,
            tsf.createAsExpression(
              tsf.createArrayLiteralExpression(
                clients.map((client) => tsf.createStringLiteral(client))
              ),
              tsf.createTypeReferenceNode("const", undefined)
            )
          ),
        ],
        ts.NodeFlags.Const
      )
    )
  );

  // const defaultComponent = {
  //   name: "DefaultLogin",
  //   path: "./default",
  // };
  // root.push(
  //   await generateComponentImport(defaultComponent.name, defaultComponent.path)
  // );

  await Promise.all(
    clients.map(async (client) => {
      root.push(
        await generateComponentImport(`${client}Login`, `./generated/${client}`)
      );
      return;
    })
  );

  root.push(
    tsf.createVariableStatement(
      tsf.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
      tsf.createVariableDeclarationList(
        [
          tsf.createVariableDeclaration(
            tsf.createIdentifier("clientConfig"),
            undefined,
            tsf.createTypeReferenceNode("{ [key in Client]: ClientConfig }"),
            tsf.createObjectLiteralExpression(
              clients.map((client) => {
                return tsf.createPropertyAssignment(
                  client,
                  tsf.createObjectLiteralExpression([
                    tsf.createPropertyAssignment(
                      "login",
                      tsf.createIdentifier(`${client}Login`)
                    ),
                  ])
                );
              }),
              undefined
            )
          ),
        ],
        ts.NodeFlags.Const
      )
    )
  );

  const file = ts.createSourceFile(
    "_.ts",
    "",
    ts.ScriptTarget.ES2020,
    false,
    ts.ScriptKind.TSX
  );
  (file.statements as any) = tsf.createNodeArray(root); // readonly var

  const types = ts.createPrinter().printFile(file);

  fs.writeFileSync(generatedDest, types, {
    encoding: "utf-8",
  });
}
