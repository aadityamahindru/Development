let $ = require("jquery")
const path = require("path")
let fs = require("fs")
let myEditor, myMonaco;
let os = require('os');
let pty = require('node-pty');
let Terminal = require('xterm').Terminal;
let { FitAddon } = require('xterm-addon-fit');
$(document).ready(async function () {
    myEditor = await createEditor();
    let src = process.cwd();
    let name = path.basename(src);
    let pObj = {
        id: src,
        parent: "#",
        text: name
    }
    let chArr = createChildnode(src);
    chArr.unshift(pObj);
    $("#tree").jstree({
        "core": {
            "data": chArr,
            "check_callback": true,
            "themes": {
                "icons": false,
                dots: false
            }
        },
    }).on("open_node.jstree", function (e, data) {
        let children = data.node.children;
        for (let i = 0; i < children.length; i++) {
            let gcNodes = createChildnode(children[i]);
            for (let j = 0; j < gcNodes.length; j++) {
                let isGcPresent = $("#tree").jstree(true).get_node(gcNodes[j].id);
                if (isGcPresent) {
                    return
                }
                $("#tree").jstree().create_node(children[i], gcNodes[j], "last")
            }
        }
    }).on("select_node.jstree", function (e, data) {
        let src = data.node.id;
        let isFile = fs.lstatSync(src).isFile();
        if (!isFile) {
            return;
        }
        setData(src)
        $(".tab-container").append(`
        <div class=tab>
        <span id=${src} onclick=openTab(this)>${path.basename(src)}</span>
        <i class="fa fa-close" onclick=closeTab(this)></i>
        </div>
        `)
    })
    // themes of monaco 
    myMonaco.editor.defineTheme("Twilight", {
        "base": "vs-dark",
        "inherit": true,
        "rules": [
            {
                "background": "141414",
                "token": ""
            },
            {
                "foreground": "5f5a60",
                "fontStyle": "italic",
                "token": "comment"
            },
            {
                "foreground": "cf6a4c",
                "token": "constant"
            },
            {
                "foreground": "9b703f",
                "token": "entity"
            },
            {
                "foreground": "cda869",
                "token": "keyword"
            },
            {
                "foreground": "f9ee98",
                "token": "storage"
            },
            {
                "foreground": "8f9d6a",
                "token": "string"
            },
            {
                "foreground": "9b859d",
                "token": "support"
            },
            {
                "foreground": "7587a6",
                "token": "variable"
            },
            {
                "foreground": "d2a8a1",
                "fontStyle": "italic underline",
                "token": "invalid.deprecated"
            },
            {
                "foreground": "f8f8f8",
                "background": "562d56bf",
                "token": "invalid.illegal"
            },
            {
                "background": "b0b3ba14",
                "token": "text source"
            },
            {
                "background": "b1b3ba21",
                "token": "text.html.ruby source"
            },
            {
                "foreground": "9b5c2e",
                "fontStyle": "italic",
                "token": "entity.other.inherited-class"
            },
            {
                "foreground": "daefa3",
                "token": "string source"
            },
            {
                "foreground": "ddf2a4",
                "token": "string constant"
            },
            {
                "foreground": "e9c062",
                "token": "string.regexp"
            },
            {
                "foreground": "cf7d34",
                "token": "string.regexp constant.character.escape"
            },
            {
                "foreground": "cf7d34",
                "token": "string.regexp source.ruby.embedded"
            },
            {
                "foreground": "cf7d34",
                "token": "string.regexp string.regexp.arbitrary-repitition"
            },
            {
                "foreground": "8a9a95",
                "token": "string variable"
            },
            {
                "foreground": "dad085",
                "token": "support.function"
            },
            {
                "foreground": "cf6a4c",
                "token": "support.constant"
            },
            {
                "foreground": "8996a8",
                "token": "meta.preprocessor.c"
            },
            {
                "foreground": "afc4db",
                "token": "meta.preprocessor.c keyword"
            },
            {
                "foreground": "494949",
                "token": "meta.tag.sgml.doctype"
            },
            {
                "foreground": "494949",
                "token": "meta.tag.sgml.doctype entity"
            },
            {
                "foreground": "494949",
                "token": "meta.tag.sgml.doctype string"
            },
            {
                "foreground": "494949",
                "token": "meta.tag.preprocessor.xml"
            },
            {
                "foreground": "494949",
                "token": "meta.tag.preprocessor.xml entity"
            },
            {
                "foreground": "494949",
                "token": "meta.tag.preprocessor.xml string"
            },
            {
                "foreground": "ac885b",
                "token": "declaration.tag"
            },
            {
                "foreground": "ac885b",
                "token": "declaration.tag entity"
            },
            {
                "foreground": "ac885b",
                "token": "meta.tag"
            },
            {
                "foreground": "ac885b",
                "token": "meta.tag entity"
            },
            {
                "foreground": "e0c589",
                "token": "declaration.tag.inline"
            },
            {
                "foreground": "e0c589",
                "token": "declaration.tag.inline entity"
            },
            {
                "foreground": "e0c589",
                "token": "source entity.name.tag"
            },
            {
                "foreground": "e0c589",
                "token": "source entity.other.attribute-name"
            },
            {
                "foreground": "e0c589",
                "token": "meta.tag.inline"
            },
            {
                "foreground": "e0c589",
                "token": "meta.tag.inline entity"
            },
            {
                "foreground": "cda869",
                "token": "meta.selector.css entity.name.tag"
            },
            {
                "foreground": "8f9d6a",
                "token": "meta.selector.css entity.other.attribute-name.tag.pseudo-class"
            },
            {
                "foreground": "8b98ab",
                "token": "meta.selector.css entity.other.attribute-name.id"
            },
            {
                "foreground": "9b703f",
                "token": "meta.selector.css entity.other.attribute-name.class"
            },
            {
                "foreground": "c5af75",
                "token": "support.type.property-name.css"
            },
            {
                "foreground": "f9ee98",
                "token": "meta.property-group support.constant.property-value.css"
            },
            {
                "foreground": "f9ee98",
                "token": "meta.property-value support.constant.property-value.css"
            },
            {
                "foreground": "8693a5",
                "token": "meta.preprocessor.at-rule keyword.control.at-rule"
            },
            {
                "foreground": "ca7840",
                "token": "meta.property-value support.constant.named-color.css"
            },
            {
                "foreground": "ca7840",
                "token": "meta.property-value constant"
            },
            {
                "foreground": "8f9d6a",
                "token": "meta.constructor.argument.css"
            },
            {
                "foreground": "f8f8f8",
                "background": "0e2231",
                "fontStyle": "italic",
                "token": "meta.diff"
            },
            {
                "foreground": "f8f8f8",
                "background": "0e2231",
                "fontStyle": "italic",
                "token": "meta.diff.header"
            },
            {
                "foreground": "f8f8f8",
                "background": "0e2231",
                "fontStyle": "italic",
                "token": "meta.separator"
            },
            {
                "foreground": "f8f8f8",
                "background": "420e09",
                "token": "markup.deleted"
            },
            {
                "foreground": "f8f8f8",
                "background": "4a410d",
                "token": "markup.changed"
            },
            {
                "foreground": "f8f8f8",
                "background": "253b22",
                "token": "markup.inserted"
            },
            {
                "foreground": "f9ee98",
                "token": "markup.list"
            },
            {
                "foreground": "cf6a4c",
                "token": "markup.heading"
            }
        ],
        "colors": {
            "editor.foreground": "#F8F8F8",
            "editor.background": "#141414",
            "editor.selectionBackground": "#DDF0FF33",
            "editor.lineHighlightBackground": "#FFFFFF08",
            "editorCursor.foreground": "#A7A7A7",
            "editorWhitespace.foreground": "#FFFFFF40"
        }
    })
    myMonaco.editor.defineTheme("Hallows", {
        "base": "vs-dark",
        "inherit": true,
        "rules": [
            {
                "background": "000000",
                "token": ""
            },
            {
                "foreground": "ffffff",
                "background": "434242",
                "token": "text"
            },
            {
                "foreground": "ffffff",
                "background": "000000",
                "token": "source"
            },
            {
                "foreground": "9933cc",
                "token": "comment"
            },
            {
                "foreground": "3387cc",
                "token": "constant"
            },
            {
                "foreground": "cc7833",
                "token": "keyword"
            },
            {
                "foreground": "d0d0ff",
                "token": "meta.preprocessor.c"
            },
            {
                "fontStyle": "italic",
                "token": "variable.parameter"
            },
            {
                "foreground": "ffffff",
                "background": "9b9b9b",
                "token": "source comment.block"
            },
            {
                "foreground": "66cc33",
                "token": "string"
            },
            {
                "foreground": "aaaaaa",
                "token": "string constant.character.escape"
            },
            {
                "foreground": "000000",
                "background": "cccc33",
                "token": "string.interpolated"
            },
            {
                "foreground": "cccc33",
                "token": "string.regexp"
            },
            {
                "foreground": "cccc33",
                "token": "string.literal"
            },
            {
                "foreground": "555555",
                "token": "string.interpolated constant.character.escape"
            },
            {
                "fontStyle": "underline",
                "token": "entity.name.type"
            },
            {
                "fontStyle": "italic underline",
                "token": "entity.other.inherited-class"
            },
            {
                "fontStyle": "underline",
                "token": "entity.name.tag"
            },
            {
                "foreground": "c83730",
                "token": "support.function"
            }
        ],
        "colors": {
            "editor.foreground": "#FFFFFF",
            "editor.background": "#000000",
            "editor.selectionBackground": "#73597EE0",
            "editor.lineHighlightBackground": "#333300",
            "editorCursor.foreground": "#FFFFFF",
            "editorWhitespace.foreground": "#404040"
        }
    })
    $("#theme").on("change", function () {
        let val = $(this).val();
        if (val == "Twilight") {
            myMonaco.editor.setTheme('Twilight');
        }else if(val=="Hallows"){
            myMonaco.editor.setTheme('Hallows');
        }else if(val=="light"){
            myMonaco.editor.setTheme('vs');
        }else {
            myMonaco.editor.setTheme('vs-dark');
        }
    })
})
// Initialize node-pty with an appropriate shell
const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.cwd(),
    env: process.env
});

// Initialize xterm.js and attach it to the DOM
const xterm = new Terminal();
const fitAddon = new FitAddon();
xterm.setOption('theme', { background: 'rebeccapurple' });
xterm.loadAddon(fitAddon);
xterm.open(document.getElementById('terminal'));
// Setup communication between xterm.js and node-pty
xterm.onData(data => ptyProcess.write(data));
ptyProcess.on('data', function (data) {
    xterm.write(data);
});
fitAddon.fit();
function openTab(element) {
    let src = $(element).attr("id");
    setData(src);
}
function setData(src) {
    let content = fs.readFileSync(src) + "";
    myEditor.getModel().setValue(content);
    let ext = src.split(".").pop();
    if (ext == "js") {
        ext = "javascript"
    }
    myMonaco.editor.setModelLanguage(myEditor.getModel(), ext);
}
function closeTab(element) {
    $(element).parent().remove();
    let src = $($(".tab-container span")[0]).attr("id");
    if (src) {
        setData(src);
    }
}
function createChildnode(src) {
    let isDir = fs.lstatSync(src).isDirectory();
    if (!isDir) {
        return [];
    }
    let children = fs.readdirSync(src);
    let chArr = [];
    for (let i = 0; i < children.length; i++) {
        let cPath = path.join(src, children[i]);
        let chObj = {
            id: cPath,
            parent: src,
            text: children[i]
        }
        chArr.push(chObj);
    }
    return chArr;
}
function createEditor() {
    const path = require('path');
    const amdLoader = require('./node_modules/monaco-editor/min/vs/loader.js');
    const amdRequire = amdLoader.require;
    const amdDefine = amdLoader.require.define;
    function uriFromPath(_path) {
        var pathName = path.resolve(_path).replace(/\\/g, '/');
        if (pathName.length > 0 && pathName.charAt(0) !== '/') {
            pathName = '/' + pathName;
        }
        return encodeURI('file://' + pathName);
    }
    amdRequire.config({
        baseUrl: uriFromPath(path.join(__dirname, './node_modules/monaco-editor/min'))
    });

    // workaround monaco-css not understanding the environment
    self.module = undefined;

    return new Promise(function (resolve, reject) {
        amdRequire(['vs/editor/editor.main'], function () {
            var editor = monaco.editor.create(document.getElementById('code-editor'), {
                value: [
                    'function x() {',
                    '\tconsole.log("Hello world!");',
                    '}'
                ].join('\n'),
                language: 'javascript',
                theme: "vs-dark"
            });
            myMonaco = monaco;
            resolve(editor);
        });
    })
}
