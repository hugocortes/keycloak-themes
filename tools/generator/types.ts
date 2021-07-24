import * as fs from "fs";
import * as ts from "typescript";
import { createImport, createLeadingComment, printStatements } from "./utils";

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

  root.push(createLeadingComment("Auto-generated file, do not modify"));
  root.push(createImport("react", ["lazy"]));
  root.push(createImport("./types", ["ClientConfig"]));

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

  root.push(
    tsf.createTypeAliasDeclaration(
      undefined,
      tsf.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
      tsf.createIdentifier("Client"),
      undefined,
      tsf.createIndexedAccessTypeNode(
        tsf.createTypeQueryNode(tsf.createIdentifier("Clients")),
        tsf.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
      )
    )
  );

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

  const statements = printStatements(root);
  fs.writeFileSync(generatedDest, statements, {
    encoding: "utf-8",
  });
}
