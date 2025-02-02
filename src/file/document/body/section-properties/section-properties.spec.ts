import { expect } from "chai";

import { convertInchesToTwip } from "convenience-functions";
import { Formatter } from "export/formatter";
import { FooterWrapper } from "file/footer-wrapper";
import { HeaderWrapper } from "file/header-wrapper";
import { Media } from "file/media";
import { LineNumberRestartFormat } from "./line-number";

import { PageBorderOffsetFrom } from "./page-border";
import { PageNumberFormat } from "./page-number";
import { SectionProperties } from "./section-properties";
import { SectionType } from "./type/section-type-attributes";
import { SectionVerticalAlignValue } from "./vertical-align";

describe("SectionProperties", () => {
    describe("#constructor()", () => {
        it("should create section properties with options", () => {
            const media = new Media();

            const properties = new SectionProperties({
                width: 11906,
                height: 16838,
                top: convertInchesToTwip(1),
                right: convertInchesToTwip(1),
                bottom: convertInchesToTwip(1),
                left: convertInchesToTwip(1),
                header: 708,
                footer: 708,
                gutter: 0,
                mirror: false,
                column: {
                    space: 708,
                    count: 1,
                    separate: true,
                },
                linePitch: convertInchesToTwip(0.25),
                headers: {
                    default: new HeaderWrapper(media, 100),
                },
                footers: {
                    even: new FooterWrapper(media, 200),
                },
                pageNumberStart: 10,
                pageNumberFormatType: PageNumberFormat.CARDINAL_TEXT,
                titlePage: true,
                verticalAlign: SectionVerticalAlignValue.TOP,
            });
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["w:sectPr"]);
            expect(tree["w:sectPr"]).to.be.an.instanceof(Array);
            expect(tree["w:sectPr"][0]).to.deep.equal({ "w:pgSz": { _attr: { "w:h": 16838, "w:w": 11906, "w:orient": "portrait" } } });
            expect(tree["w:sectPr"][1]).to.deep.equal({
                "w:pgMar": {
                    _attr: {
                        "w:bottom": 1440,
                        "w:footer": 708,
                        "w:top": 1440,
                        "w:right": 1440,
                        "w:left": 1440,
                        "w:header": 708,
                        "w:gutter": 0,
                        "w:mirrorMargins": false,
                    },
                },
            });

            expect(tree["w:sectPr"][2]).to.deep.equal({ "w:cols": { _attr: { "w:space": 708, "w:sep": true, "w:num": 1 } } });
            expect(tree["w:sectPr"][3]).to.deep.equal({ "w:docGrid": { _attr: { "w:linePitch": 360 } } });
            expect(tree["w:sectPr"][4]).to.deep.equal({ "w:headerReference": { _attr: { "r:id": "rId100", "w:type": "default" } } });
            expect(tree["w:sectPr"][5]).to.deep.equal({ "w:footerReference": { _attr: { "r:id": "rId200", "w:type": "even" } } });
            expect(tree["w:sectPr"][6]).to.deep.equal({ "w:pgNumType": { _attr: { "w:fmt": "cardinalText", "w:start": 10 } } });
        });

        it("should create section properties with no options", () => {
            const properties = new SectionProperties();
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["w:sectPr"]);
            expect(tree["w:sectPr"]).to.be.an.instanceof(Array);
            expect(tree["w:sectPr"][0]).to.deep.equal({ "w:pgSz": { _attr: { "w:h": 16838, "w:w": 11906, "w:orient": "portrait" } } });
            expect(tree["w:sectPr"][1]).to.deep.equal({
                "w:pgMar": {
                    _attr: {
                        "w:bottom": 1440,
                        "w:footer": 708,
                        "w:top": 1440,
                        "w:right": 1440,
                        "w:left": 1440,
                        "w:header": 708,
                        "w:gutter": 0,
                        "w:mirrorMargins": false,
                    },
                },
            });
            expect(tree["w:sectPr"][2]).to.deep.equal({ "w:cols": { _attr: { "w:space": 708, "w:sep": false, "w:num": 1 } } });
            expect(tree["w:sectPr"][3]).to.deep.equal({ "w:docGrid": { _attr: { "w:linePitch": 360 } } });
        });

        it("should create section properties with changed options", () => {
            const properties = new SectionProperties({
                top: 0,
            });
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["w:sectPr"]);
            expect(tree["w:sectPr"]).to.be.an.instanceof(Array);
            expect(tree["w:sectPr"][0]).to.deep.equal({ "w:pgSz": { _attr: { "w:h": 16838, "w:w": 11906, "w:orient": "portrait" } } });
            expect(tree["w:sectPr"][1]).to.deep.equal({
                "w:pgMar": {
                    _attr: {
                        "w:bottom": 1440,
                        "w:footer": 708,
                        "w:top": 0,
                        "w:right": 1440,
                        "w:left": 1440,
                        "w:header": 708,
                        "w:gutter": 0,
                        "w:mirrorMargins": false,
                    },
                },
            });
        });

        it("should create section properties with changed options", () => {
            const properties = new SectionProperties({
                bottom: 0,
            });
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["w:sectPr"]);
            expect(tree["w:sectPr"]).to.be.an.instanceof(Array);
            expect(tree["w:sectPr"][0]).to.deep.equal({ "w:pgSz": { _attr: { "w:h": 16838, "w:w": 11906, "w:orient": "portrait" } } });
            expect(tree["w:sectPr"][1]).to.deep.equal({
                "w:pgMar": {
                    _attr: {
                        "w:bottom": 0,
                        "w:footer": 708,
                        "w:top": 1440,
                        "w:right": 1440,
                        "w:left": 1440,
                        "w:header": 708,
                        "w:gutter": 0,
                        "w:mirrorMargins": false,
                    },
                },
            });
        });

        it("should create section properties with changed options", () => {
            const properties = new SectionProperties({
                width: 0,
                height: 0,
            });
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["w:sectPr"]);
            expect(tree["w:sectPr"]).to.be.an.instanceof(Array);
            expect(tree["w:sectPr"][0]).to.deep.equal({ "w:pgSz": { _attr: { "w:h": 0, "w:w": 0, "w:orient": "portrait" } } });
            expect(tree["w:sectPr"][1]).to.deep.equal({
                "w:pgMar": {
                    _attr: {
                        "w:bottom": 1440,
                        "w:footer": 708,
                        "w:top": 1440,
                        "w:right": 1440,
                        "w:left": 1440,
                        "w:header": 708,
                        "w:gutter": 0,
                        "w:mirrorMargins": false,
                    },
                },
            });
        });

        it("should create section properties with page borders", () => {
            const properties = new SectionProperties({
                pageBorders: {
                    offsetFrom: PageBorderOffsetFrom.PAGE,
                },
            });
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["w:sectPr"]);
            const pgBorders = tree["w:sectPr"].find((item) => item["w:pgBorders"] !== undefined);
            expect(pgBorders).to.deep.equal({
                "w:pgBorders": { _attr: { "w:offsetFrom": "page" } },
            });
        });

        it("should create section properties with page number type, but without start attribute", () => {
            const properties = new SectionProperties({
                pageNumberFormatType: PageNumberFormat.UPPER_ROMAN,
            });
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["w:sectPr"]);
            const pgNumType = tree["w:sectPr"].find((item) => item["w:pgNumType"] !== undefined);
            expect(pgNumType).to.deep.equal({
                "w:pgNumType": { _attr: { "w:fmt": "upperRoman" } },
            });
        });

        it("should create section properties with a page number type by default", () => {
            const properties = new SectionProperties({});
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["w:sectPr"]);
            const pgNumType = tree["w:sectPr"].find((item) => item["w:pgNumType"] !== undefined);
            expect(pgNumType).to.deep.equal({ "w:pgNumType": { _attr: {} } });
        });

        it("should create section properties with section type", () => {
            const properties = new SectionProperties({
                type: SectionType.CONTINUOUS,
            });
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["w:sectPr"]);
            const type = tree["w:sectPr"].find((item) => item["w:type"] !== undefined);
            expect(type).to.deep.equal({
                "w:type": { _attr: { "w:val": "continuous" } },
            });
        });

        it("should create section properties line number type", () => {
            const properties = new SectionProperties({
                lineNumberCountBy: 2,
                lineNumberStart: 2,
                lineNumberRestart: LineNumberRestartFormat.CONTINUOUS,
                lineNumberDistance: 4,
            });
            const tree = new Formatter().format(properties);
            expect(Object.keys(tree)).to.deep.equal(["w:sectPr"]);
            const type = tree["w:sectPr"].find((item) => item["w:lnNumType"] !== undefined);
            expect(type).to.deep.equal({
                "w:lnNumType": { _attr: { "w:countBy": 2, "w:distance": 4, "w:restart": "continuous", "w:start": 2 } },
            });
        });
    });
});
