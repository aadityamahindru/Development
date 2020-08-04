let $ = require("jquery")
const path = require("path")
let fs = require("fs")
let myEditor, myMonaco;
let os = require('os');
let pty = require('node-pty');
let Terminal = require('xterm').Terminal;
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
                "icons": false
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
xterm.open(document.getElementById('terminal'));

// Setup communication between xterm.js and node-pty
xterm.onData(data => ptyProcess.write(data));
ptyProcess.on('data', function (data) {
    xterm.write(data);
});
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
    let tabs = $(".tab");
    let newTab = tabs.eq(0);
    let src = $(newTab).attr("id");
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
