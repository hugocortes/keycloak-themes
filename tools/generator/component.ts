import * as fs from "fs";
import * as ts from "typescript";
import * as glob from "glob";
import { createImport } from "./utils";

const tsf = ts.factory;

async function fileExists(path: string) {
  try {
    const file = fs.statSync(path);
    return file.isFile();
  } catch (error) {
    return false;
  }
}

async function globFileExists(path: string) {
  try {
    const files = glob.sync(path);
    return files.length > 0;
  } catch (error) {
    return false;
  }
}

async function createDirIfNotExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, 0o744);
  }
}

async function cpFromSrcToDest(src: string, dest: string) {
  const files = glob.sync(`${src}/*`);
  files.map((file) => {
    fs.copyFileSync(file, `${dest}/${file.slice(file.lastIndexOf("/") + 1)}`);
  });
}

export async function generateComponent(client: string) {
  const srcDirectory = `${__dirname}/assets/${client}`;
  if (!fs.existsSync(srcDirectory)) {
    console.warn(`${client}, does not have any assets, skipping`);
    return;
  }

  const componentDirectory = `${__dirname}/../../src/app/components/KcApp/clients/generated/${client}`;
  await createDirIfNotExists(componentDirectory);

  await cpFromSrcToDest(srcDirectory, componentDirectory);

  const root: ts.Statement[] = [];

  root.push(
    ts.addSyntheticLeadingComment(
      tsf.createEmptyStatement(),
      ts.SyntaxKind.MultiLineCommentTrivia,
      "Auto-generated file, do not modify"
    )
  );

  root.push(await createImport("react", ["memo"]));
  root.push(await createImport("keycloakify/lib/components/Login", ["Login"]));
  root.push(await createImport("../../../types", ["KcContextLoginProps"]));

  const scssPath = `${srcDirectory}/index.scss`;
  const hasScss = await fileExists(scssPath);
  if (hasScss) {
    root.push(
      tsf.createImportDeclaration(
        undefined,
        undefined,
        undefined,
        tsf.createStringLiteral(`./index.scss`)
      )
    );
  }

  const faviconPath = `${srcDirectory}/favicon.ico`;
  const hasFavicon = await fileExists(faviconPath);
  if (hasFavicon) {
    root.push(await createImport("../../utils", ["setFav"]));
    root.push(
      tsf.createImportDeclaration(
        undefined,
        undefined,
        tsf.createImportClause(
          false,
          tsf.createIdentifier("favicon"),
          undefined
        ),
        tsf.createStringLiteral("./favicon.ico")
      )
    );
  }

  const logoPath = `${srcDirectory}/logo.*`;
  const hasLogo = await globFileExists(logoPath);
  if (hasLogo) {
    root.push(
      await createImport("keycloakify", ["kcMessages", "useKcLanguageTag"])
    );
  }

  const statementBlock: ts.Statement[] = [];

  if (hasFavicon) {
    statementBlock.push(
      tsf.createExpressionStatement(
        tsf.createCallExpression(tsf.createIdentifier("setFav"), undefined, [
          tsf.createIdentifier("favicon"),
        ])
      )
    );
  }

  if (hasLogo) {
    statementBlock.push(
      tsf.createVariableStatement(
        undefined,
        tsf.createVariableDeclarationList(
          [
            tsf.createVariableDeclaration(
              tsf.createIdentifier("{ kcLanguageTag }"),
              undefined,
              undefined,
              tsf.createCallExpression(
                tsf.createIdentifier("useKcLanguageTag"),
                undefined,
                undefined
              )
            ),
          ],
          ts.NodeFlags.Const
        )
      )
    );

    statementBlock.push(
      tsf.createExpressionStatement(
        tsf.createAssignment(
          tsf.createIdentifier("kcMessages[kcLanguageTag].loginTitleHtml"),
          tsf.createStringLiteral('<div class="kc-logo-text"></div>')
        )
      )
    );
  }

  statementBlock.push(
    tsf.createReturnStatement(
      tsf.createJsxElement(
        tsf.createJsxOpeningElement(
          tsf.createIdentifier("Login"),
          undefined,
          tsf.createJsxAttributes([
            tsf.createJsxSpreadAttribute(tsf.createIdentifier("props")),
          ])
        ),
        [],
        tsf.createJsxClosingElement(tsf.createIdentifier("Login"))
      )
    )
  );

  root.push(
    tsf.createFunctionDeclaration(
      undefined,
      undefined,
      undefined,
      "clientLogin",
      undefined,
      [
        tsf.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          "props",
          undefined,
          tsf.createTypeReferenceNode("KcContextLoginProps")
        ),
      ],
      tsf.createTypeReferenceNode("JSX.Element"),
      tsf.createBlock(statementBlock)
    )
  );

  // convert to memo component
  root.push(
    tsf.createVariableStatement(
      undefined,
      tsf.createVariableDeclarationList(
        [
          tsf.createVariableDeclaration(
            tsf.createIdentifier("ClientLogin"),
            undefined,
            undefined,
            tsf.createCallExpression(tsf.createIdentifier("memo"), undefined, [
              tsf.createIdentifier("clientLogin"),
            ])
          ),
        ],
        ts.NodeFlags.Const
      )
    )
  );
  root.push(
    tsf.createExpressionStatement(
      tsf.createAssignment(
        tsf.createIdentifier("ClientLogin.displayName"),
        tsf.createStringLiteral(`${client}Login`)
      )
    )
  );

  root.push(tsf.createExportDefault(tsf.createIdentifier("ClientLogin")));

  const file = ts.createSourceFile(
    "_.ts",
    "",
    ts.ScriptTarget.ES2020,
    false,
    ts.ScriptKind.TSX
  );
  (file.statements as any) = tsf.createNodeArray(root); // readonly var

  const types = ts.createPrinter().printFile(file);

  fs.writeFileSync(`${componentDirectory}/index.tsx`, types, {
    encoding: "utf-8",
  });
}
