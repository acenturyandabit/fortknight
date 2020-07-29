const fs = require("fs");
let index = String(fs.readFileSync("../index.html"));
index = index.split("\n");
entrypoint = index.map((v, i) => [v, i]).filter((v) => v[0].match(/insert images here/))[0][1];
exitpoint = index.map((v, i) => [v, i]).filter((v) => v[0].match(/end insert images/))[0][1];
index.splice(entrypoint + 1, exitpoint - entrypoint - 1);
// get svg's
let newSVGs = [];
for (let f of fs.readdirSync(".")) {
    if (f.endsWith(".svg")) {
        let thisSVG = String(fs.readFileSync(f));
        
        thisSVG = thisSVG.split("\n");
        let hitsvg = false;
        thisSVG = thisSVG.filter((p, i) => { if (hitsvg) return true; else if (p.match(/<svg/)) { hitsvg = true; return true; }; return false; });
        thisSVG = thisSVG.join("");
        thisSVG = thisSVG.replace(/>\s{1,}</g, `><`);
        thisSVG = thisSVG.replace(/\s{2,}/g, ` `);
        thisSVG = thisSVG.replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent);
        
        thisSVG = "data:image/svg+xml," + thisSVG;
        thisSVG = `<img style='background:white' id='${f.slice(0, f.length - 4)}' src='${thisSVG}'>`;
        newSVGs.push(thisSVG);
    }
}
index.splice(entrypoint + 1, 0, ...newSVGs);
fs.writeFileSync("../index.html", index.join("\n"));