// Page numbers - Start from 0 on a new section
// Import from 'docx' rather than '../build' if you install from npm
import * as fs from "fs";
import { AlignmentType, Document, Header, Packer, PageBreak, PageNumber, PageNumberSeparator, Paragraph, TextRun } from "../build";

const doc = new Document();

doc.addSection({
    headers: {
        default: new Header({
            children: [
                new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                        new TextRun("My Title "),
                        new TextRun({
                            children: ["Page ", PageNumber.CURRENT],
                        }),
                    ],
                }),
            ],
        }),
        first: new Header({
            children: [
                new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                        new TextRun("First Page Header "),
                        new TextRun({
                            children: ["Page ", PageNumber.CURRENT],
                        }),
                    ],
                }),
            ],
        }),
    },
    children: [
        new Paragraph({
            children: [new TextRun("First Page"), new PageBreak()],
        }),
        new Paragraph("Second Page"),
    ],
});

doc.addSection({
    properties: {
        pageNumberStart: 1,
        pageNumberSeparator: PageNumberSeparator.EM_DASH
    },
    headers: {
        default: new Header({
            children: [
                new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                        new TextRun("My Title "),
                        new TextRun({
                            children: ["Page ", PageNumber.CURRENT],
                        }),
                    ],
                }),
            ],
        }),
        first: new Header({
            children: [
                new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                        new TextRun("First Page Header of Second section"),
                        new TextRun({
                            children: ["Page ", PageNumber.CURRENT],
                        }),
                    ],
                }),
            ],
        }),
    },
    children: [
        new Paragraph({
            children: [new TextRun("Third Page"), new PageBreak()],
        }),
        new Paragraph("Fourth Page"),
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});
