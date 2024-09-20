import { promises as fs } from "fs";
import * as path from "path";

import { Scanner } from "./Scanner";
import { Token } from "./Token";

export class Lox {
  public static hadError: boolean = false;

  public main(args: string[]): void {
    if (args.length != 1) {
      console.error(`(ERROR) - Missing file path.`);
      process.exit(1);
    }
    this.runFile(args[0]);
  }

  private async runFile(filePath: string): Promise<void> {
    const bytes: Buffer = await fs.readFile(path.resolve(filePath));
    const fileContent: string = bytes.toString();

    this.run(fileContent);

    if (Lox.hadError) process.exit(1);
  }

  private run(source: string): void {
    const scanner: Scanner = new Scanner(source);
    const tokens: Token[] = scanner.scanTokens();
    for (const token of tokens) console.log(token);
  }

  public static error(line: number, message: string): void {
    this.report(line, "", message);
  }

  private static report(line: number, where: string, message: string): void {
    console.error(`[line ${line}] Error${where}: ${message}`);
  }
}

const lox = new Lox();
lox.main(process.argv.slice(2));
