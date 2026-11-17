(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to2, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to2, key) && key !== except)
          __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to2;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // node_modules/estraverse/estraverse.js
  var require_estraverse = __commonJS({
    "node_modules/estraverse/estraverse.js"(exports) {
      (function clone(exports2) {
        "use strict";
        var Syntax, VisitorOption, VisitorKeys, BREAK, SKIP, REMOVE;
        function deepCopy(obj) {
          var ret = {}, key, val;
          for (key in obj) {
            if (obj.hasOwnProperty(key)) {
              val = obj[key];
              if (typeof val === "object" && val !== null) {
                ret[key] = deepCopy(val);
              } else {
                ret[key] = val;
              }
            }
          }
          return ret;
        }
        function upperBound(array, func) {
          var diff, len, i, current2;
          len = array.length;
          i = 0;
          while (len) {
            diff = len >>> 1;
            current2 = i + diff;
            if (func(array[current2])) {
              len = diff;
            } else {
              i = current2 + 1;
              len -= diff + 1;
            }
          }
          return i;
        }
        Syntax = {
          AssignmentExpression: "AssignmentExpression",
          AssignmentPattern: "AssignmentPattern",
          ArrayExpression: "ArrayExpression",
          ArrayPattern: "ArrayPattern",
          ArrowFunctionExpression: "ArrowFunctionExpression",
          AwaitExpression: "AwaitExpression",
          // CAUTION: It's deferred to ES7.
          BlockStatement: "BlockStatement",
          BinaryExpression: "BinaryExpression",
          BreakStatement: "BreakStatement",
          CallExpression: "CallExpression",
          CatchClause: "CatchClause",
          ChainExpression: "ChainExpression",
          ClassBody: "ClassBody",
          ClassDeclaration: "ClassDeclaration",
          ClassExpression: "ClassExpression",
          ComprehensionBlock: "ComprehensionBlock",
          // CAUTION: It's deferred to ES7.
          ComprehensionExpression: "ComprehensionExpression",
          // CAUTION: It's deferred to ES7.
          ConditionalExpression: "ConditionalExpression",
          ContinueStatement: "ContinueStatement",
          DebuggerStatement: "DebuggerStatement",
          DirectiveStatement: "DirectiveStatement",
          DoWhileStatement: "DoWhileStatement",
          EmptyStatement: "EmptyStatement",
          ExportAllDeclaration: "ExportAllDeclaration",
          ExportDefaultDeclaration: "ExportDefaultDeclaration",
          ExportNamedDeclaration: "ExportNamedDeclaration",
          ExportSpecifier: "ExportSpecifier",
          ExpressionStatement: "ExpressionStatement",
          ForStatement: "ForStatement",
          ForInStatement: "ForInStatement",
          ForOfStatement: "ForOfStatement",
          FunctionDeclaration: "FunctionDeclaration",
          FunctionExpression: "FunctionExpression",
          GeneratorExpression: "GeneratorExpression",
          // CAUTION: It's deferred to ES7.
          Identifier: "Identifier",
          IfStatement: "IfStatement",
          ImportExpression: "ImportExpression",
          ImportDeclaration: "ImportDeclaration",
          ImportDefaultSpecifier: "ImportDefaultSpecifier",
          ImportNamespaceSpecifier: "ImportNamespaceSpecifier",
          ImportSpecifier: "ImportSpecifier",
          Literal: "Literal",
          LabeledStatement: "LabeledStatement",
          LogicalExpression: "LogicalExpression",
          MemberExpression: "MemberExpression",
          MetaProperty: "MetaProperty",
          MethodDefinition: "MethodDefinition",
          ModuleSpecifier: "ModuleSpecifier",
          NewExpression: "NewExpression",
          ObjectExpression: "ObjectExpression",
          ObjectPattern: "ObjectPattern",
          PrivateIdentifier: "PrivateIdentifier",
          Program: "Program",
          Property: "Property",
          PropertyDefinition: "PropertyDefinition",
          RestElement: "RestElement",
          ReturnStatement: "ReturnStatement",
          SequenceExpression: "SequenceExpression",
          SpreadElement: "SpreadElement",
          Super: "Super",
          SwitchStatement: "SwitchStatement",
          SwitchCase: "SwitchCase",
          TaggedTemplateExpression: "TaggedTemplateExpression",
          TemplateElement: "TemplateElement",
          TemplateLiteral: "TemplateLiteral",
          ThisExpression: "ThisExpression",
          ThrowStatement: "ThrowStatement",
          TryStatement: "TryStatement",
          UnaryExpression: "UnaryExpression",
          UpdateExpression: "UpdateExpression",
          VariableDeclaration: "VariableDeclaration",
          VariableDeclarator: "VariableDeclarator",
          WhileStatement: "WhileStatement",
          WithStatement: "WithStatement",
          YieldExpression: "YieldExpression"
        };
        VisitorKeys = {
          AssignmentExpression: ["left", "right"],
          AssignmentPattern: ["left", "right"],
          ArrayExpression: ["elements"],
          ArrayPattern: ["elements"],
          ArrowFunctionExpression: ["params", "body"],
          AwaitExpression: ["argument"],
          // CAUTION: It's deferred to ES7.
          BlockStatement: ["body"],
          BinaryExpression: ["left", "right"],
          BreakStatement: ["label"],
          CallExpression: ["callee", "arguments"],
          CatchClause: ["param", "body"],
          ChainExpression: ["expression"],
          ClassBody: ["body"],
          ClassDeclaration: ["id", "superClass", "body"],
          ClassExpression: ["id", "superClass", "body"],
          ComprehensionBlock: ["left", "right"],
          // CAUTION: It's deferred to ES7.
          ComprehensionExpression: ["blocks", "filter", "body"],
          // CAUTION: It's deferred to ES7.
          ConditionalExpression: ["test", "consequent", "alternate"],
          ContinueStatement: ["label"],
          DebuggerStatement: [],
          DirectiveStatement: [],
          DoWhileStatement: ["body", "test"],
          EmptyStatement: [],
          ExportAllDeclaration: ["source"],
          ExportDefaultDeclaration: ["declaration"],
          ExportNamedDeclaration: ["declaration", "specifiers", "source"],
          ExportSpecifier: ["exported", "local"],
          ExpressionStatement: ["expression"],
          ForStatement: ["init", "test", "update", "body"],
          ForInStatement: ["left", "right", "body"],
          ForOfStatement: ["left", "right", "body"],
          FunctionDeclaration: ["id", "params", "body"],
          FunctionExpression: ["id", "params", "body"],
          GeneratorExpression: ["blocks", "filter", "body"],
          // CAUTION: It's deferred to ES7.
          Identifier: [],
          IfStatement: ["test", "consequent", "alternate"],
          ImportExpression: ["source"],
          ImportDeclaration: ["specifiers", "source"],
          ImportDefaultSpecifier: ["local"],
          ImportNamespaceSpecifier: ["local"],
          ImportSpecifier: ["imported", "local"],
          Literal: [],
          LabeledStatement: ["label", "body"],
          LogicalExpression: ["left", "right"],
          MemberExpression: ["object", "property"],
          MetaProperty: ["meta", "property"],
          MethodDefinition: ["key", "value"],
          ModuleSpecifier: [],
          NewExpression: ["callee", "arguments"],
          ObjectExpression: ["properties"],
          ObjectPattern: ["properties"],
          PrivateIdentifier: [],
          Program: ["body"],
          Property: ["key", "value"],
          PropertyDefinition: ["key", "value"],
          RestElement: ["argument"],
          ReturnStatement: ["argument"],
          SequenceExpression: ["expressions"],
          SpreadElement: ["argument"],
          Super: [],
          SwitchStatement: ["discriminant", "cases"],
          SwitchCase: ["test", "consequent"],
          TaggedTemplateExpression: ["tag", "quasi"],
          TemplateElement: [],
          TemplateLiteral: ["quasis", "expressions"],
          ThisExpression: [],
          ThrowStatement: ["argument"],
          TryStatement: ["block", "handler", "finalizer"],
          UnaryExpression: ["argument"],
          UpdateExpression: ["argument"],
          VariableDeclaration: ["declarations"],
          VariableDeclarator: ["id", "init"],
          WhileStatement: ["test", "body"],
          WithStatement: ["object", "body"],
          YieldExpression: ["argument"]
        };
        BREAK = {};
        SKIP = {};
        REMOVE = {};
        VisitorOption = {
          Break: BREAK,
          Skip: SKIP,
          Remove: REMOVE
        };
        function Reference(parent, key) {
          this.parent = parent;
          this.key = key;
        }
        Reference.prototype.replace = function replace2(node) {
          this.parent[this.key] = node;
        };
        Reference.prototype.remove = function remove() {
          if (Array.isArray(this.parent)) {
            this.parent.splice(this.key, 1);
            return true;
          } else {
            this.replace(null);
            return false;
          }
        };
        function Element(node, path, wrap, ref2) {
          this.node = node;
          this.path = path;
          this.wrap = wrap;
          this.ref = ref2;
        }
        function Controller() {
        }
        Controller.prototype.path = function path() {
          var i, iz, j4, jz, result, element;
          function addToPath(result2, path2) {
            if (Array.isArray(path2)) {
              for (j4 = 0, jz = path2.length; j4 < jz; ++j4) {
                result2.push(path2[j4]);
              }
            } else {
              result2.push(path2);
            }
          }
          if (!this.__current.path) {
            return null;
          }
          result = [];
          for (i = 2, iz = this.__leavelist.length; i < iz; ++i) {
            element = this.__leavelist[i];
            addToPath(result, element.path);
          }
          addToPath(result, this.__current.path);
          return result;
        };
        Controller.prototype.type = function() {
          var node = this.current();
          return node.type || this.__current.wrap;
        };
        Controller.prototype.parents = function parents() {
          var i, iz, result;
          result = [];
          for (i = 1, iz = this.__leavelist.length; i < iz; ++i) {
            result.push(this.__leavelist[i].node);
          }
          return result;
        };
        Controller.prototype.current = function current2() {
          return this.__current.node;
        };
        Controller.prototype.__execute = function __execute(callback, element) {
          var previous, result;
          result = void 0;
          previous = this.__current;
          this.__current = element;
          this.__state = null;
          if (callback) {
            result = callback.call(this, element.node, this.__leavelist[this.__leavelist.length - 1].node);
          }
          this.__current = previous;
          return result;
        };
        Controller.prototype.notify = function notify(flag) {
          this.__state = flag;
        };
        Controller.prototype.skip = function() {
          this.notify(SKIP);
        };
        Controller.prototype["break"] = function() {
          this.notify(BREAK);
        };
        Controller.prototype.remove = function() {
          this.notify(REMOVE);
        };
        Controller.prototype.__initialize = function(root, visitor) {
          this.visitor = visitor;
          this.root = root;
          this.__worklist = [];
          this.__leavelist = [];
          this.__current = null;
          this.__state = null;
          this.__fallback = null;
          if (visitor.fallback === "iteration") {
            this.__fallback = Object.keys;
          } else if (typeof visitor.fallback === "function") {
            this.__fallback = visitor.fallback;
          }
          this.__keys = VisitorKeys;
          if (visitor.keys) {
            this.__keys = Object.assign(Object.create(this.__keys), visitor.keys);
          }
        };
        function isNode2(node) {
          if (node == null) {
            return false;
          }
          return typeof node === "object" && typeof node.type === "string";
        }
        function isProperty(nodeType, key) {
          return (nodeType === Syntax.ObjectExpression || nodeType === Syntax.ObjectPattern) && "properties" === key;
        }
        function candidateExistsInLeaveList(leavelist, candidate) {
          for (var i = leavelist.length - 1; i >= 0; --i) {
            if (leavelist[i].node === candidate) {
              return true;
            }
          }
          return false;
        }
        Controller.prototype.traverse = function traverse2(root, visitor) {
          var worklist, leavelist, element, node, nodeType, ret, key, current2, current22, candidates, candidate, sentinel;
          this.__initialize(root, visitor);
          sentinel = {};
          worklist = this.__worklist;
          leavelist = this.__leavelist;
          worklist.push(new Element(root, null, null, null));
          leavelist.push(new Element(null, null, null, null));
          while (worklist.length) {
            element = worklist.pop();
            if (element === sentinel) {
              element = leavelist.pop();
              ret = this.__execute(visitor.leave, element);
              if (this.__state === BREAK || ret === BREAK) {
                return;
              }
              continue;
            }
            if (element.node) {
              ret = this.__execute(visitor.enter, element);
              if (this.__state === BREAK || ret === BREAK) {
                return;
              }
              worklist.push(sentinel);
              leavelist.push(element);
              if (this.__state === SKIP || ret === SKIP) {
                continue;
              }
              node = element.node;
              nodeType = node.type || element.wrap;
              candidates = this.__keys[nodeType];
              if (!candidates) {
                if (this.__fallback) {
                  candidates = this.__fallback(node);
                } else {
                  throw new Error("Unknown node type " + nodeType + ".");
                }
              }
              current2 = candidates.length;
              while ((current2 -= 1) >= 0) {
                key = candidates[current2];
                candidate = node[key];
                if (!candidate) {
                  continue;
                }
                if (Array.isArray(candidate)) {
                  current22 = candidate.length;
                  while ((current22 -= 1) >= 0) {
                    if (!candidate[current22]) {
                      continue;
                    }
                    if (candidateExistsInLeaveList(leavelist, candidate[current22])) {
                      continue;
                    }
                    if (isProperty(nodeType, candidates[current2])) {
                      element = new Element(candidate[current22], [key, current22], "Property", null);
                    } else if (isNode2(candidate[current22])) {
                      element = new Element(candidate[current22], [key, current22], null, null);
                    } else {
                      continue;
                    }
                    worklist.push(element);
                  }
                } else if (isNode2(candidate)) {
                  if (candidateExistsInLeaveList(leavelist, candidate)) {
                    continue;
                  }
                  worklist.push(new Element(candidate, key, null, null));
                }
              }
            }
          }
        };
        Controller.prototype.replace = function replace2(root, visitor) {
          var worklist, leavelist, node, nodeType, target, element, current2, current22, candidates, candidate, sentinel, outer, key;
          function removeElem(element2) {
            var i, key2, nextElem, parent;
            if (element2.ref.remove()) {
              key2 = element2.ref.key;
              parent = element2.ref.parent;
              i = worklist.length;
              while (i--) {
                nextElem = worklist[i];
                if (nextElem.ref && nextElem.ref.parent === parent) {
                  if (nextElem.ref.key < key2) {
                    break;
                  }
                  --nextElem.ref.key;
                }
              }
            }
          }
          this.__initialize(root, visitor);
          sentinel = {};
          worklist = this.__worklist;
          leavelist = this.__leavelist;
          outer = {
            root
          };
          element = new Element(root, null, null, new Reference(outer, "root"));
          worklist.push(element);
          leavelist.push(element);
          while (worklist.length) {
            element = worklist.pop();
            if (element === sentinel) {
              element = leavelist.pop();
              target = this.__execute(visitor.leave, element);
              if (target !== void 0 && target !== BREAK && target !== SKIP && target !== REMOVE) {
                element.ref.replace(target);
              }
              if (this.__state === REMOVE || target === REMOVE) {
                removeElem(element);
              }
              if (this.__state === BREAK || target === BREAK) {
                return outer.root;
              }
              continue;
            }
            target = this.__execute(visitor.enter, element);
            if (target !== void 0 && target !== BREAK && target !== SKIP && target !== REMOVE) {
              element.ref.replace(target);
              element.node = target;
            }
            if (this.__state === REMOVE || target === REMOVE) {
              removeElem(element);
              element.node = null;
            }
            if (this.__state === BREAK || target === BREAK) {
              return outer.root;
            }
            node = element.node;
            if (!node) {
              continue;
            }
            worklist.push(sentinel);
            leavelist.push(element);
            if (this.__state === SKIP || target === SKIP) {
              continue;
            }
            nodeType = node.type || element.wrap;
            candidates = this.__keys[nodeType];
            if (!candidates) {
              if (this.__fallback) {
                candidates = this.__fallback(node);
              } else {
                throw new Error("Unknown node type " + nodeType + ".");
              }
            }
            current2 = candidates.length;
            while ((current2 -= 1) >= 0) {
              key = candidates[current2];
              candidate = node[key];
              if (!candidate) {
                continue;
              }
              if (Array.isArray(candidate)) {
                current22 = candidate.length;
                while ((current22 -= 1) >= 0) {
                  if (!candidate[current22]) {
                    continue;
                  }
                  if (isProperty(nodeType, candidates[current2])) {
                    element = new Element(candidate[current22], [key, current22], "Property", new Reference(candidate, current22));
                  } else if (isNode2(candidate[current22])) {
                    element = new Element(candidate[current22], [key, current22], null, new Reference(candidate, current22));
                  } else {
                    continue;
                  }
                  worklist.push(element);
                }
              } else if (isNode2(candidate)) {
                worklist.push(new Element(candidate, key, null, new Reference(node, key)));
              }
            }
          }
          return outer.root;
        };
        function traverse(root, visitor) {
          var controller = new Controller();
          return controller.traverse(root, visitor);
        }
        function replace(root, visitor) {
          var controller = new Controller();
          return controller.replace(root, visitor);
        }
        function extendCommentRange(comment, tokens) {
          var target;
          target = upperBound(tokens, function search(token) {
            return token.range[0] > comment.range[0];
          });
          comment.extendedRange = [comment.range[0], comment.range[1]];
          if (target !== tokens.length) {
            comment.extendedRange[1] = tokens[target].range[0];
          }
          target -= 1;
          if (target >= 0) {
            comment.extendedRange[0] = tokens[target].range[1];
          }
          return comment;
        }
        function attachComments(tree, providedComments, tokens) {
          var comments = [], comment, len, i, cursor;
          if (!tree.range) {
            throw new Error("attachComments needs range information");
          }
          if (!tokens.length) {
            if (providedComments.length) {
              for (i = 0, len = providedComments.length; i < len; i += 1) {
                comment = deepCopy(providedComments[i]);
                comment.extendedRange = [0, tree.range[0]];
                comments.push(comment);
              }
              tree.leadingComments = comments;
            }
            return tree;
          }
          for (i = 0, len = providedComments.length; i < len; i += 1) {
            comments.push(extendCommentRange(deepCopy(providedComments[i]), tokens));
          }
          cursor = 0;
          traverse(tree, {
            enter: function(node) {
              var comment2;
              while (cursor < comments.length) {
                comment2 = comments[cursor];
                if (comment2.extendedRange[1] > node.range[0]) {
                  break;
                }
                if (comment2.extendedRange[1] === node.range[0]) {
                  if (!node.leadingComments) {
                    node.leadingComments = [];
                  }
                  node.leadingComments.push(comment2);
                  comments.splice(cursor, 1);
                } else {
                  cursor += 1;
                }
              }
              if (cursor === comments.length) {
                return VisitorOption.Break;
              }
              if (comments[cursor].extendedRange[0] > node.range[1]) {
                return VisitorOption.Skip;
              }
            }
          });
          cursor = 0;
          traverse(tree, {
            leave: function(node) {
              var comment2;
              while (cursor < comments.length) {
                comment2 = comments[cursor];
                if (node.range[1] < comment2.extendedRange[0]) {
                  break;
                }
                if (node.range[1] === comment2.extendedRange[0]) {
                  if (!node.trailingComments) {
                    node.trailingComments = [];
                  }
                  node.trailingComments.push(comment2);
                  comments.splice(cursor, 1);
                } else {
                  cursor += 1;
                }
              }
              if (cursor === comments.length) {
                return VisitorOption.Break;
              }
              if (comments[cursor].extendedRange[0] > node.range[1]) {
                return VisitorOption.Skip;
              }
            }
          });
          return tree;
        }
        exports2.Syntax = Syntax;
        exports2.traverse = traverse;
        exports2.replace = replace;
        exports2.attachComments = attachComments;
        exports2.VisitorKeys = VisitorKeys;
        exports2.VisitorOption = VisitorOption;
        exports2.Controller = Controller;
        exports2.cloneEnvironment = function() {
          return clone({});
        };
        return exports2;
      })(exports);
    }
  });

  // node_modules/esutils/lib/ast.js
  var require_ast = __commonJS({
    "node_modules/esutils/lib/ast.js"(exports, module) {
      (function() {
        "use strict";
        function isExpression(node) {
          if (node == null) {
            return false;
          }
          switch (node.type) {
            case "ArrayExpression":
            case "AssignmentExpression":
            case "BinaryExpression":
            case "CallExpression":
            case "ConditionalExpression":
            case "FunctionExpression":
            case "Identifier":
            case "Literal":
            case "LogicalExpression":
            case "MemberExpression":
            case "NewExpression":
            case "ObjectExpression":
            case "SequenceExpression":
            case "ThisExpression":
            case "UnaryExpression":
            case "UpdateExpression":
              return true;
          }
          return false;
        }
        function isIterationStatement(node) {
          if (node == null) {
            return false;
          }
          switch (node.type) {
            case "DoWhileStatement":
            case "ForInStatement":
            case "ForStatement":
            case "WhileStatement":
              return true;
          }
          return false;
        }
        function isStatement(node) {
          if (node == null) {
            return false;
          }
          switch (node.type) {
            case "BlockStatement":
            case "BreakStatement":
            case "ContinueStatement":
            case "DebuggerStatement":
            case "DoWhileStatement":
            case "EmptyStatement":
            case "ExpressionStatement":
            case "ForInStatement":
            case "ForStatement":
            case "IfStatement":
            case "LabeledStatement":
            case "ReturnStatement":
            case "SwitchStatement":
            case "ThrowStatement":
            case "TryStatement":
            case "VariableDeclaration":
            case "WhileStatement":
            case "WithStatement":
              return true;
          }
          return false;
        }
        function isSourceElement(node) {
          return isStatement(node) || node != null && node.type === "FunctionDeclaration";
        }
        function trailingStatement(node) {
          switch (node.type) {
            case "IfStatement":
              if (node.alternate != null) {
                return node.alternate;
              }
              return node.consequent;
            case "LabeledStatement":
            case "ForStatement":
            case "ForInStatement":
            case "WhileStatement":
            case "WithStatement":
              return node.body;
          }
          return null;
        }
        function isProblematicIfStatement(node) {
          var current2;
          if (node.type !== "IfStatement") {
            return false;
          }
          if (node.alternate == null) {
            return false;
          }
          current2 = node.consequent;
          do {
            if (current2.type === "IfStatement") {
              if (current2.alternate == null) {
                return true;
              }
            }
            current2 = trailingStatement(current2);
          } while (current2);
          return false;
        }
        module.exports = {
          isExpression,
          isStatement,
          isIterationStatement,
          isSourceElement,
          isProblematicIfStatement,
          trailingStatement
        };
      })();
    }
  });

  // node_modules/esutils/lib/code.js
  var require_code = __commonJS({
    "node_modules/esutils/lib/code.js"(exports, module) {
      (function() {
        "use strict";
        var ES6Regex, ES5Regex, NON_ASCII_WHITESPACES, IDENTIFIER_START, IDENTIFIER_PART, ch2;
        ES5Regex = {
          // ECMAScript 5.1/Unicode v9.0.0 NonAsciiIdentifierStart:
          NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
          // ECMAScript 5.1/Unicode v9.0.0 NonAsciiIdentifierPart:
          NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/
        };
        ES6Regex = {
          // ECMAScript 6/Unicode v9.0.0 NonAsciiIdentifierStart:
          NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
          // ECMAScript 6/Unicode v9.0.0 NonAsciiIdentifierPart:
          NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
        };
        function isDecimalDigit2(ch3) {
          return 48 <= ch3 && ch3 <= 57;
        }
        function isHexDigit2(ch3) {
          return 48 <= ch3 && ch3 <= 57 || // 0..9
          97 <= ch3 && ch3 <= 102 || // a..f
          65 <= ch3 && ch3 <= 70;
        }
        function isOctalDigit2(ch3) {
          return ch3 >= 48 && ch3 <= 55;
        }
        NON_ASCII_WHITESPACES = [
          5760,
          8192,
          8193,
          8194,
          8195,
          8196,
          8197,
          8198,
          8199,
          8200,
          8201,
          8202,
          8239,
          8287,
          12288,
          65279
        ];
        function isWhiteSpace(ch3) {
          return ch3 === 32 || ch3 === 9 || ch3 === 11 || ch3 === 12 || ch3 === 160 || ch3 >= 5760 && NON_ASCII_WHITESPACES.indexOf(ch3) >= 0;
        }
        function isLineTerminator(ch3) {
          return ch3 === 10 || ch3 === 13 || ch3 === 8232 || ch3 === 8233;
        }
        function fromCodePoint(cp2) {
          if (cp2 <= 65535) {
            return String.fromCharCode(cp2);
          }
          var cu1 = String.fromCharCode(Math.floor((cp2 - 65536) / 1024) + 55296);
          var cu22 = String.fromCharCode((cp2 - 65536) % 1024 + 56320);
          return cu1 + cu22;
        }
        IDENTIFIER_START = new Array(128);
        for (ch2 = 0; ch2 < 128; ++ch2) {
          IDENTIFIER_START[ch2] = ch2 >= 97 && ch2 <= 122 || // a..z
          ch2 >= 65 && ch2 <= 90 || // A..Z
          ch2 === 36 || ch2 === 95;
        }
        IDENTIFIER_PART = new Array(128);
        for (ch2 = 0; ch2 < 128; ++ch2) {
          IDENTIFIER_PART[ch2] = ch2 >= 97 && ch2 <= 122 || // a..z
          ch2 >= 65 && ch2 <= 90 || // A..Z
          ch2 >= 48 && ch2 <= 57 || // 0..9
          ch2 === 36 || ch2 === 95;
        }
        function isIdentifierStartES5(ch3) {
          return ch3 < 128 ? IDENTIFIER_START[ch3] : ES5Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch3));
        }
        function isIdentifierPartES5(ch3) {
          return ch3 < 128 ? IDENTIFIER_PART[ch3] : ES5Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch3));
        }
        function isIdentifierStartES6(ch3) {
          return ch3 < 128 ? IDENTIFIER_START[ch3] : ES6Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch3));
        }
        function isIdentifierPartES6(ch3) {
          return ch3 < 128 ? IDENTIFIER_PART[ch3] : ES6Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch3));
        }
        module.exports = {
          isDecimalDigit: isDecimalDigit2,
          isHexDigit: isHexDigit2,
          isOctalDigit: isOctalDigit2,
          isWhiteSpace,
          isLineTerminator,
          isIdentifierStartES5,
          isIdentifierPartES5,
          isIdentifierStartES6,
          isIdentifierPartES6
        };
      })();
    }
  });

  // node_modules/esutils/lib/keyword.js
  var require_keyword = __commonJS({
    "node_modules/esutils/lib/keyword.js"(exports, module) {
      (function() {
        "use strict";
        var code = require_code();
        function isStrictModeReservedWordES6(id2) {
          switch (id2) {
            case "implements":
            case "interface":
            case "package":
            case "private":
            case "protected":
            case "public":
            case "static":
            case "let":
              return true;
            default:
              return false;
          }
        }
        function isKeywordES5(id2, strict) {
          if (!strict && id2 === "yield") {
            return false;
          }
          return isKeywordES6(id2, strict);
        }
        function isKeywordES6(id2, strict) {
          if (strict && isStrictModeReservedWordES6(id2)) {
            return true;
          }
          switch (id2.length) {
            case 2:
              return id2 === "if" || id2 === "in" || id2 === "do";
            case 3:
              return id2 === "var" || id2 === "for" || id2 === "new" || id2 === "try";
            case 4:
              return id2 === "this" || id2 === "else" || id2 === "case" || id2 === "void" || id2 === "with" || id2 === "enum";
            case 5:
              return id2 === "while" || id2 === "break" || id2 === "catch" || id2 === "throw" || id2 === "const" || id2 === "yield" || id2 === "class" || id2 === "super";
            case 6:
              return id2 === "return" || id2 === "typeof" || id2 === "delete" || id2 === "switch" || id2 === "export" || id2 === "import";
            case 7:
              return id2 === "default" || id2 === "finally" || id2 === "extends";
            case 8:
              return id2 === "function" || id2 === "continue" || id2 === "debugger";
            case 10:
              return id2 === "instanceof";
            default:
              return false;
          }
        }
        function isReservedWordES5(id2, strict) {
          return id2 === "null" || id2 === "true" || id2 === "false" || isKeywordES5(id2, strict);
        }
        function isReservedWordES6(id2, strict) {
          return id2 === "null" || id2 === "true" || id2 === "false" || isKeywordES6(id2, strict);
        }
        function isRestrictedWord(id2) {
          return id2 === "eval" || id2 === "arguments";
        }
        function isIdentifierNameES5(id2) {
          var i, iz, ch2;
          if (id2.length === 0) {
            return false;
          }
          ch2 = id2.charCodeAt(0);
          if (!code.isIdentifierStartES5(ch2)) {
            return false;
          }
          for (i = 1, iz = id2.length; i < iz; ++i) {
            ch2 = id2.charCodeAt(i);
            if (!code.isIdentifierPartES5(ch2)) {
              return false;
            }
          }
          return true;
        }
        function decodeUtf16(lead, trail) {
          return (lead - 55296) * 1024 + (trail - 56320) + 65536;
        }
        function isIdentifierNameES6(id2) {
          var i, iz, ch2, lowCh, check;
          if (id2.length === 0) {
            return false;
          }
          check = code.isIdentifierStartES6;
          for (i = 0, iz = id2.length; i < iz; ++i) {
            ch2 = id2.charCodeAt(i);
            if (55296 <= ch2 && ch2 <= 56319) {
              ++i;
              if (i >= iz) {
                return false;
              }
              lowCh = id2.charCodeAt(i);
              if (!(56320 <= lowCh && lowCh <= 57343)) {
                return false;
              }
              ch2 = decodeUtf16(ch2, lowCh);
            }
            if (!check(ch2)) {
              return false;
            }
            check = code.isIdentifierPartES6;
          }
          return true;
        }
        function isIdentifierES5(id2, strict) {
          return isIdentifierNameES5(id2) && !isReservedWordES5(id2, strict);
        }
        function isIdentifierES6(id2, strict) {
          return isIdentifierNameES6(id2) && !isReservedWordES6(id2, strict);
        }
        module.exports = {
          isKeywordES5,
          isKeywordES6,
          isReservedWordES5,
          isReservedWordES6,
          isRestrictedWord,
          isIdentifierNameES5,
          isIdentifierNameES6,
          isIdentifierES5,
          isIdentifierES6
        };
      })();
    }
  });

  // node_modules/esutils/lib/utils.js
  var require_utils = __commonJS({
    "node_modules/esutils/lib/utils.js"(exports) {
      (function() {
        "use strict";
        exports.ast = require_ast();
        exports.code = require_code();
        exports.keyword = require_keyword();
      })();
    }
  });

  // node_modules/source-map/lib/base64.js
  var require_base64 = __commonJS({
    "node_modules/source-map/lib/base64.js"(exports) {
      var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
      exports.encode = function(number) {
        if (0 <= number && number < intToCharMap.length) {
          return intToCharMap[number];
        }
        throw new TypeError("Must be between 0 and 63: " + number);
      };
      exports.decode = function(charCode) {
        var bigA = 65;
        var bigZ = 90;
        var littleA = 97;
        var littleZ = 122;
        var zero = 48;
        var nine = 57;
        var plus = 43;
        var slash = 47;
        var littleOffset = 26;
        var numberOffset = 52;
        if (bigA <= charCode && charCode <= bigZ) {
          return charCode - bigA;
        }
        if (littleA <= charCode && charCode <= littleZ) {
          return charCode - littleA + littleOffset;
        }
        if (zero <= charCode && charCode <= nine) {
          return charCode - zero + numberOffset;
        }
        if (charCode == plus) {
          return 62;
        }
        if (charCode == slash) {
          return 63;
        }
        return -1;
      };
    }
  });

  // node_modules/source-map/lib/base64-vlq.js
  var require_base64_vlq = __commonJS({
    "node_modules/source-map/lib/base64-vlq.js"(exports) {
      var base64 = require_base64();
      var VLQ_BASE_SHIFT = 5;
      var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
      var VLQ_BASE_MASK = VLQ_BASE - 1;
      var VLQ_CONTINUATION_BIT = VLQ_BASE;
      function toVLQSigned(aValue) {
        return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
      }
      function fromVLQSigned(aValue) {
        var isNegative = (aValue & 1) === 1;
        var shifted = aValue >> 1;
        return isNegative ? -shifted : shifted;
      }
      exports.encode = function base64VLQ_encode(aValue) {
        var encoded = "";
        var digit;
        var vlq = toVLQSigned(aValue);
        do {
          digit = vlq & VLQ_BASE_MASK;
          vlq >>>= VLQ_BASE_SHIFT;
          if (vlq > 0) {
            digit |= VLQ_CONTINUATION_BIT;
          }
          encoded += base64.encode(digit);
        } while (vlq > 0);
        return encoded;
      };
      exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
        var strLen = aStr.length;
        var result = 0;
        var shift = 0;
        var continuation, digit;
        do {
          if (aIndex >= strLen) {
            throw new Error("Expected more digits in base 64 VLQ value.");
          }
          digit = base64.decode(aStr.charCodeAt(aIndex++));
          if (digit === -1) {
            throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
          }
          continuation = !!(digit & VLQ_CONTINUATION_BIT);
          digit &= VLQ_BASE_MASK;
          result = result + (digit << shift);
          shift += VLQ_BASE_SHIFT;
        } while (continuation);
        aOutParam.value = fromVLQSigned(result);
        aOutParam.rest = aIndex;
      };
    }
  });

  // node_modules/source-map/lib/util.js
  var require_util = __commonJS({
    "node_modules/source-map/lib/util.js"(exports) {
      function getArg(aArgs, aName, aDefaultValue) {
        if (aName in aArgs) {
          return aArgs[aName];
        } else if (arguments.length === 3) {
          return aDefaultValue;
        } else {
          throw new Error('"' + aName + '" is a required argument.');
        }
      }
      exports.getArg = getArg;
      var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
      var dataUrlRegexp = /^data:.+\,.+$/;
      function urlParse(aUrl) {
        var match = aUrl.match(urlRegexp);
        if (!match) {
          return null;
        }
        return {
          scheme: match[1],
          auth: match[2],
          host: match[3],
          port: match[4],
          path: match[5]
        };
      }
      exports.urlParse = urlParse;
      function urlGenerate(aParsedUrl) {
        var url = "";
        if (aParsedUrl.scheme) {
          url += aParsedUrl.scheme + ":";
        }
        url += "//";
        if (aParsedUrl.auth) {
          url += aParsedUrl.auth + "@";
        }
        if (aParsedUrl.host) {
          url += aParsedUrl.host;
        }
        if (aParsedUrl.port) {
          url += ":" + aParsedUrl.port;
        }
        if (aParsedUrl.path) {
          url += aParsedUrl.path;
        }
        return url;
      }
      exports.urlGenerate = urlGenerate;
      function normalize(aPath) {
        var path = aPath;
        var url = urlParse(aPath);
        if (url) {
          if (!url.path) {
            return aPath;
          }
          path = url.path;
        }
        var isAbsolute = exports.isAbsolute(path);
        var parts = path.split(/\/+/);
        for (var part, up2 = 0, i = parts.length - 1; i >= 0; i--) {
          part = parts[i];
          if (part === ".") {
            parts.splice(i, 1);
          } else if (part === "..") {
            up2++;
          } else if (up2 > 0) {
            if (part === "") {
              parts.splice(i + 1, up2);
              up2 = 0;
            } else {
              parts.splice(i, 2);
              up2--;
            }
          }
        }
        path = parts.join("/");
        if (path === "") {
          path = isAbsolute ? "/" : ".";
        }
        if (url) {
          url.path = path;
          return urlGenerate(url);
        }
        return path;
      }
      exports.normalize = normalize;
      function join(aRoot, aPath) {
        if (aRoot === "") {
          aRoot = ".";
        }
        if (aPath === "") {
          aPath = ".";
        }
        var aPathUrl = urlParse(aPath);
        var aRootUrl = urlParse(aRoot);
        if (aRootUrl) {
          aRoot = aRootUrl.path || "/";
        }
        if (aPathUrl && !aPathUrl.scheme) {
          if (aRootUrl) {
            aPathUrl.scheme = aRootUrl.scheme;
          }
          return urlGenerate(aPathUrl);
        }
        if (aPathUrl || aPath.match(dataUrlRegexp)) {
          return aPath;
        }
        if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
          aRootUrl.host = aPath;
          return urlGenerate(aRootUrl);
        }
        var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
        if (aRootUrl) {
          aRootUrl.path = joined;
          return urlGenerate(aRootUrl);
        }
        return joined;
      }
      exports.join = join;
      exports.isAbsolute = function(aPath) {
        return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
      };
      function relative(aRoot, aPath) {
        if (aRoot === "") {
          aRoot = ".";
        }
        aRoot = aRoot.replace(/\/$/, "");
        var level = 0;
        while (aPath.indexOf(aRoot + "/") !== 0) {
          var index = aRoot.lastIndexOf("/");
          if (index < 0) {
            return aPath;
          }
          aRoot = aRoot.slice(0, index);
          if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
            return aPath;
          }
          ++level;
        }
        return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
      }
      exports.relative = relative;
      var supportsNullProto = (function() {
        var obj = /* @__PURE__ */ Object.create(null);
        return !("__proto__" in obj);
      })();
      function identity(s2) {
        return s2;
      }
      function toSetString(aStr) {
        if (isProtoString(aStr)) {
          return "$" + aStr;
        }
        return aStr;
      }
      exports.toSetString = supportsNullProto ? identity : toSetString;
      function fromSetString(aStr) {
        if (isProtoString(aStr)) {
          return aStr.slice(1);
        }
        return aStr;
      }
      exports.fromSetString = supportsNullProto ? identity : fromSetString;
      function isProtoString(s2) {
        if (!s2) {
          return false;
        }
        var length = s2.length;
        if (length < 9) {
          return false;
        }
        if (s2.charCodeAt(length - 1) !== 95 || s2.charCodeAt(length - 2) !== 95 || s2.charCodeAt(length - 3) !== 111 || s2.charCodeAt(length - 4) !== 116 || s2.charCodeAt(length - 5) !== 111 || s2.charCodeAt(length - 6) !== 114 || s2.charCodeAt(length - 7) !== 112 || s2.charCodeAt(length - 8) !== 95 || s2.charCodeAt(length - 9) !== 95) {
          return false;
        }
        for (var i = length - 10; i >= 0; i--) {
          if (s2.charCodeAt(i) !== 36) {
            return false;
          }
        }
        return true;
      }
      function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
        var cmp = strcmp(mappingA.source, mappingB.source);
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0 || onlyCompareOriginal) {
          return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
          return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
      }
      exports.compareByOriginalPositions = compareByOriginalPositions;
      function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
        var cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0 || onlyCompareGenerated) {
          return cmp;
        }
        cmp = strcmp(mappingA.source, mappingB.source);
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0) {
          return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
      }
      exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
      function strcmp(aStr1, aStr2) {
        if (aStr1 === aStr2) {
          return 0;
        }
        if (aStr1 === null) {
          return 1;
        }
        if (aStr2 === null) {
          return -1;
        }
        if (aStr1 > aStr2) {
          return 1;
        }
        return -1;
      }
      function compareByGeneratedPositionsInflated(mappingA, mappingB) {
        var cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = strcmp(mappingA.source, mappingB.source);
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0) {
          return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
      }
      exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
      function parseSourceMapInput(str) {
        return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
      }
      exports.parseSourceMapInput = parseSourceMapInput;
      function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
        sourceURL = sourceURL || "";
        if (sourceRoot) {
          if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") {
            sourceRoot += "/";
          }
          sourceURL = sourceRoot + sourceURL;
        }
        if (sourceMapURL) {
          var parsed = urlParse(sourceMapURL);
          if (!parsed) {
            throw new Error("sourceMapURL could not be parsed");
          }
          if (parsed.path) {
            var index = parsed.path.lastIndexOf("/");
            if (index >= 0) {
              parsed.path = parsed.path.substring(0, index + 1);
            }
          }
          sourceURL = join(urlGenerate(parsed), sourceURL);
        }
        return normalize(sourceURL);
      }
      exports.computeSourceURL = computeSourceURL;
    }
  });

  // node_modules/source-map/lib/array-set.js
  var require_array_set = __commonJS({
    "node_modules/source-map/lib/array-set.js"(exports) {
      var util = require_util();
      var has = Object.prototype.hasOwnProperty;
      var hasNativeMap = typeof Map !== "undefined";
      function ArraySet() {
        this._array = [];
        this._set = hasNativeMap ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
      }
      ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
        var set = new ArraySet();
        for (var i = 0, len = aArray.length; i < len; i++) {
          set.add(aArray[i], aAllowDuplicates);
        }
        return set;
      };
      ArraySet.prototype.size = function ArraySet_size() {
        return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
      };
      ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
        var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
        var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
        var idx = this._array.length;
        if (!isDuplicate || aAllowDuplicates) {
          this._array.push(aStr);
        }
        if (!isDuplicate) {
          if (hasNativeMap) {
            this._set.set(aStr, idx);
          } else {
            this._set[sStr] = idx;
          }
        }
      };
      ArraySet.prototype.has = function ArraySet_has(aStr) {
        if (hasNativeMap) {
          return this._set.has(aStr);
        } else {
          var sStr = util.toSetString(aStr);
          return has.call(this._set, sStr);
        }
      };
      ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
        if (hasNativeMap) {
          var idx = this._set.get(aStr);
          if (idx >= 0) {
            return idx;
          }
        } else {
          var sStr = util.toSetString(aStr);
          if (has.call(this._set, sStr)) {
            return this._set[sStr];
          }
        }
        throw new Error('"' + aStr + '" is not in the set.');
      };
      ArraySet.prototype.at = function ArraySet_at(aIdx) {
        if (aIdx >= 0 && aIdx < this._array.length) {
          return this._array[aIdx];
        }
        throw new Error("No element indexed by " + aIdx);
      };
      ArraySet.prototype.toArray = function ArraySet_toArray() {
        return this._array.slice();
      };
      exports.ArraySet = ArraySet;
    }
  });

  // node_modules/source-map/lib/mapping-list.js
  var require_mapping_list = __commonJS({
    "node_modules/source-map/lib/mapping-list.js"(exports) {
      var util = require_util();
      function generatedPositionAfter(mappingA, mappingB) {
        var lineA = mappingA.generatedLine;
        var lineB = mappingB.generatedLine;
        var columnA = mappingA.generatedColumn;
        var columnB = mappingB.generatedColumn;
        return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
      }
      function MappingList() {
        this._array = [];
        this._sorted = true;
        this._last = { generatedLine: -1, generatedColumn: 0 };
      }
      MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
        this._array.forEach(aCallback, aThisArg);
      };
      MappingList.prototype.add = function MappingList_add(aMapping) {
        if (generatedPositionAfter(this._last, aMapping)) {
          this._last = aMapping;
          this._array.push(aMapping);
        } else {
          this._sorted = false;
          this._array.push(aMapping);
        }
      };
      MappingList.prototype.toArray = function MappingList_toArray() {
        if (!this._sorted) {
          this._array.sort(util.compareByGeneratedPositionsInflated);
          this._sorted = true;
        }
        return this._array;
      };
      exports.MappingList = MappingList;
    }
  });

  // node_modules/source-map/lib/source-map-generator.js
  var require_source_map_generator = __commonJS({
    "node_modules/source-map/lib/source-map-generator.js"(exports) {
      var base64VLQ = require_base64_vlq();
      var util = require_util();
      var ArraySet = require_array_set().ArraySet;
      var MappingList = require_mapping_list().MappingList;
      function SourceMapGenerator(aArgs) {
        if (!aArgs) {
          aArgs = {};
        }
        this._file = util.getArg(aArgs, "file", null);
        this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
        this._skipValidation = util.getArg(aArgs, "skipValidation", false);
        this._sources = new ArraySet();
        this._names = new ArraySet();
        this._mappings = new MappingList();
        this._sourcesContents = null;
      }
      SourceMapGenerator.prototype._version = 3;
      SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
        var sourceRoot = aSourceMapConsumer.sourceRoot;
        var generator = new SourceMapGenerator({
          file: aSourceMapConsumer.file,
          sourceRoot
        });
        aSourceMapConsumer.eachMapping(function(mapping) {
          var newMapping = {
            generated: {
              line: mapping.generatedLine,
              column: mapping.generatedColumn
            }
          };
          if (mapping.source != null) {
            newMapping.source = mapping.source;
            if (sourceRoot != null) {
              newMapping.source = util.relative(sourceRoot, newMapping.source);
            }
            newMapping.original = {
              line: mapping.originalLine,
              column: mapping.originalColumn
            };
            if (mapping.name != null) {
              newMapping.name = mapping.name;
            }
          }
          generator.addMapping(newMapping);
        });
        aSourceMapConsumer.sources.forEach(function(sourceFile) {
          var sourceRelative = sourceFile;
          if (sourceRoot !== null) {
            sourceRelative = util.relative(sourceRoot, sourceFile);
          }
          if (!generator._sources.has(sourceRelative)) {
            generator._sources.add(sourceRelative);
          }
          var content = aSourceMapConsumer.sourceContentFor(sourceFile);
          if (content != null) {
            generator.setSourceContent(sourceFile, content);
          }
        });
        return generator;
      };
      SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
        var generated = util.getArg(aArgs, "generated");
        var original = util.getArg(aArgs, "original", null);
        var source = util.getArg(aArgs, "source", null);
        var name = util.getArg(aArgs, "name", null);
        if (!this._skipValidation) {
          this._validateMapping(generated, original, source, name);
        }
        if (source != null) {
          source = String(source);
          if (!this._sources.has(source)) {
            this._sources.add(source);
          }
        }
        if (name != null) {
          name = String(name);
          if (!this._names.has(name)) {
            this._names.add(name);
          }
        }
        this._mappings.add({
          generatedLine: generated.line,
          generatedColumn: generated.column,
          originalLine: original != null && original.line,
          originalColumn: original != null && original.column,
          source,
          name
        });
      };
      SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
        var source = aSourceFile;
        if (this._sourceRoot != null) {
          source = util.relative(this._sourceRoot, source);
        }
        if (aSourceContent != null) {
          if (!this._sourcesContents) {
            this._sourcesContents = /* @__PURE__ */ Object.create(null);
          }
          this._sourcesContents[util.toSetString(source)] = aSourceContent;
        } else if (this._sourcesContents) {
          delete this._sourcesContents[util.toSetString(source)];
          if (Object.keys(this._sourcesContents).length === 0) {
            this._sourcesContents = null;
          }
        }
      };
      SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
        var sourceFile = aSourceFile;
        if (aSourceFile == null) {
          if (aSourceMapConsumer.file == null) {
            throw new Error(
              `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
            );
          }
          sourceFile = aSourceMapConsumer.file;
        }
        var sourceRoot = this._sourceRoot;
        if (sourceRoot != null) {
          sourceFile = util.relative(sourceRoot, sourceFile);
        }
        var newSources = new ArraySet();
        var newNames = new ArraySet();
        this._mappings.unsortedForEach(function(mapping) {
          if (mapping.source === sourceFile && mapping.originalLine != null) {
            var original = aSourceMapConsumer.originalPositionFor({
              line: mapping.originalLine,
              column: mapping.originalColumn
            });
            if (original.source != null) {
              mapping.source = original.source;
              if (aSourceMapPath != null) {
                mapping.source = util.join(aSourceMapPath, mapping.source);
              }
              if (sourceRoot != null) {
                mapping.source = util.relative(sourceRoot, mapping.source);
              }
              mapping.originalLine = original.line;
              mapping.originalColumn = original.column;
              if (original.name != null) {
                mapping.name = original.name;
              }
            }
          }
          var source = mapping.source;
          if (source != null && !newSources.has(source)) {
            newSources.add(source);
          }
          var name = mapping.name;
          if (name != null && !newNames.has(name)) {
            newNames.add(name);
          }
        }, this);
        this._sources = newSources;
        this._names = newNames;
        aSourceMapConsumer.sources.forEach(function(sourceFile2) {
          var content = aSourceMapConsumer.sourceContentFor(sourceFile2);
          if (content != null) {
            if (aSourceMapPath != null) {
              sourceFile2 = util.join(aSourceMapPath, sourceFile2);
            }
            if (sourceRoot != null) {
              sourceFile2 = util.relative(sourceRoot, sourceFile2);
            }
            this.setSourceContent(sourceFile2, content);
          }
        }, this);
      };
      SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
        if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
          throw new Error(
            "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
          );
        }
        if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
          return;
        } else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
          return;
        } else {
          throw new Error("Invalid mapping: " + JSON.stringify({
            generated: aGenerated,
            source: aSource,
            original: aOriginal,
            name: aName
          }));
        }
      };
      SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
        var previousGeneratedColumn = 0;
        var previousGeneratedLine = 1;
        var previousOriginalColumn = 0;
        var previousOriginalLine = 0;
        var previousName = 0;
        var previousSource = 0;
        var result = "";
        var next;
        var mapping;
        var nameIdx;
        var sourceIdx;
        var mappings = this._mappings.toArray();
        for (var i = 0, len = mappings.length; i < len; i++) {
          mapping = mappings[i];
          next = "";
          if (mapping.generatedLine !== previousGeneratedLine) {
            previousGeneratedColumn = 0;
            while (mapping.generatedLine !== previousGeneratedLine) {
              next += ";";
              previousGeneratedLine++;
            }
          } else {
            if (i > 0) {
              if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
                continue;
              }
              next += ",";
            }
          }
          next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
          previousGeneratedColumn = mapping.generatedColumn;
          if (mapping.source != null) {
            sourceIdx = this._sources.indexOf(mapping.source);
            next += base64VLQ.encode(sourceIdx - previousSource);
            previousSource = sourceIdx;
            next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
            previousOriginalLine = mapping.originalLine - 1;
            next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
            previousOriginalColumn = mapping.originalColumn;
            if (mapping.name != null) {
              nameIdx = this._names.indexOf(mapping.name);
              next += base64VLQ.encode(nameIdx - previousName);
              previousName = nameIdx;
            }
          }
          result += next;
        }
        return result;
      };
      SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
        return aSources.map(function(source) {
          if (!this._sourcesContents) {
            return null;
          }
          if (aSourceRoot != null) {
            source = util.relative(aSourceRoot, source);
          }
          var key = util.toSetString(source);
          return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
        }, this);
      };
      SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
        var map = {
          version: this._version,
          sources: this._sources.toArray(),
          names: this._names.toArray(),
          mappings: this._serializeMappings()
        };
        if (this._file != null) {
          map.file = this._file;
        }
        if (this._sourceRoot != null) {
          map.sourceRoot = this._sourceRoot;
        }
        if (this._sourcesContents) {
          map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
        }
        return map;
      };
      SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
        return JSON.stringify(this.toJSON());
      };
      exports.SourceMapGenerator = SourceMapGenerator;
    }
  });

  // node_modules/source-map/lib/binary-search.js
  var require_binary_search = __commonJS({
    "node_modules/source-map/lib/binary-search.js"(exports) {
      exports.GREATEST_LOWER_BOUND = 1;
      exports.LEAST_UPPER_BOUND = 2;
      function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
        var mid = Math.floor((aHigh - aLow) / 2) + aLow;
        var cmp = aCompare(aNeedle, aHaystack[mid], true);
        if (cmp === 0) {
          return mid;
        } else if (cmp > 0) {
          if (aHigh - mid > 1) {
            return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
          }
          if (aBias == exports.LEAST_UPPER_BOUND) {
            return aHigh < aHaystack.length ? aHigh : -1;
          } else {
            return mid;
          }
        } else {
          if (mid - aLow > 1) {
            return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
          }
          if (aBias == exports.LEAST_UPPER_BOUND) {
            return mid;
          } else {
            return aLow < 0 ? -1 : aLow;
          }
        }
      }
      exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
        if (aHaystack.length === 0) {
          return -1;
        }
        var index = recursiveSearch(
          -1,
          aHaystack.length,
          aNeedle,
          aHaystack,
          aCompare,
          aBias || exports.GREATEST_LOWER_BOUND
        );
        if (index < 0) {
          return -1;
        }
        while (index - 1 >= 0) {
          if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
            break;
          }
          --index;
        }
        return index;
      };
    }
  });

  // node_modules/source-map/lib/quick-sort.js
  var require_quick_sort = __commonJS({
    "node_modules/source-map/lib/quick-sort.js"(exports) {
      function swap(ary, x2, y2) {
        var temp = ary[x2];
        ary[x2] = ary[y2];
        ary[y2] = temp;
      }
      function randomIntInRange(low, high) {
        return Math.round(low + Math.random() * (high - low));
      }
      function doQuickSort(ary, comparator, p, r) {
        if (p < r) {
          var pivotIndex = randomIntInRange(p, r);
          var i = p - 1;
          swap(ary, pivotIndex, r);
          var pivot = ary[r];
          for (var j4 = p; j4 < r; j4++) {
            if (comparator(ary[j4], pivot) <= 0) {
              i += 1;
              swap(ary, i, j4);
            }
          }
          swap(ary, i + 1, j4);
          var q4 = i + 1;
          doQuickSort(ary, comparator, p, q4 - 1);
          doQuickSort(ary, comparator, q4 + 1, r);
        }
      }
      exports.quickSort = function(ary, comparator) {
        doQuickSort(ary, comparator, 0, ary.length - 1);
      };
    }
  });

  // node_modules/source-map/lib/source-map-consumer.js
  var require_source_map_consumer = __commonJS({
    "node_modules/source-map/lib/source-map-consumer.js"(exports) {
      var util = require_util();
      var binarySearch = require_binary_search();
      var ArraySet = require_array_set().ArraySet;
      var base64VLQ = require_base64_vlq();
      var quickSort = require_quick_sort().quickSort;
      function SourceMapConsumer(aSourceMap, aSourceMapURL) {
        var sourceMap = aSourceMap;
        if (typeof aSourceMap === "string") {
          sourceMap = util.parseSourceMapInput(aSourceMap);
        }
        return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
      }
      SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
        return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
      };
      SourceMapConsumer.prototype._version = 3;
      SourceMapConsumer.prototype.__generatedMappings = null;
      Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
        configurable: true,
        enumerable: true,
        get: function() {
          if (!this.__generatedMappings) {
            this._parseMappings(this._mappings, this.sourceRoot);
          }
          return this.__generatedMappings;
        }
      });
      SourceMapConsumer.prototype.__originalMappings = null;
      Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
        configurable: true,
        enumerable: true,
        get: function() {
          if (!this.__originalMappings) {
            this._parseMappings(this._mappings, this.sourceRoot);
          }
          return this.__originalMappings;
        }
      });
      SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
        var c3 = aStr.charAt(index);
        return c3 === ";" || c3 === ",";
      };
      SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        throw new Error("Subclasses must implement _parseMappings");
      };
      SourceMapConsumer.GENERATED_ORDER = 1;
      SourceMapConsumer.ORIGINAL_ORDER = 2;
      SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
      SourceMapConsumer.LEAST_UPPER_BOUND = 2;
      SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
        var context = aContext || null;
        var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
        var mappings;
        switch (order) {
          case SourceMapConsumer.GENERATED_ORDER:
            mappings = this._generatedMappings;
            break;
          case SourceMapConsumer.ORIGINAL_ORDER:
            mappings = this._originalMappings;
            break;
          default:
            throw new Error("Unknown order of iteration.");
        }
        var sourceRoot = this.sourceRoot;
        mappings.map(function(mapping) {
          var source = mapping.source === null ? null : this._sources.at(mapping.source);
          source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
          return {
            source,
            generatedLine: mapping.generatedLine,
            generatedColumn: mapping.generatedColumn,
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name: mapping.name === null ? null : this._names.at(mapping.name)
          };
        }, this).forEach(aCallback, context);
      };
      SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
        var line = util.getArg(aArgs, "line");
        var needle = {
          source: util.getArg(aArgs, "source"),
          originalLine: line,
          originalColumn: util.getArg(aArgs, "column", 0)
        };
        needle.source = this._findSourceIndex(needle.source);
        if (needle.source < 0) {
          return [];
        }
        var mappings = [];
        var index = this._findMapping(
          needle,
          this._originalMappings,
          "originalLine",
          "originalColumn",
          util.compareByOriginalPositions,
          binarySearch.LEAST_UPPER_BOUND
        );
        if (index >= 0) {
          var mapping = this._originalMappings[index];
          if (aArgs.column === void 0) {
            var originalLine = mapping.originalLine;
            while (mapping && mapping.originalLine === originalLine) {
              mappings.push({
                line: util.getArg(mapping, "generatedLine", null),
                column: util.getArg(mapping, "generatedColumn", null),
                lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
              });
              mapping = this._originalMappings[++index];
            }
          } else {
            var originalColumn = mapping.originalColumn;
            while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
              mappings.push({
                line: util.getArg(mapping, "generatedLine", null),
                column: util.getArg(mapping, "generatedColumn", null),
                lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
              });
              mapping = this._originalMappings[++index];
            }
          }
        }
        return mappings;
      };
      exports.SourceMapConsumer = SourceMapConsumer;
      function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
        var sourceMap = aSourceMap;
        if (typeof aSourceMap === "string") {
          sourceMap = util.parseSourceMapInput(aSourceMap);
        }
        var version2 = util.getArg(sourceMap, "version");
        var sources = util.getArg(sourceMap, "sources");
        var names = util.getArg(sourceMap, "names", []);
        var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
        var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
        var mappings = util.getArg(sourceMap, "mappings");
        var file = util.getArg(sourceMap, "file", null);
        if (version2 != this._version) {
          throw new Error("Unsupported version: " + version2);
        }
        if (sourceRoot) {
          sourceRoot = util.normalize(sourceRoot);
        }
        sources = sources.map(String).map(util.normalize).map(function(source) {
          return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
        });
        this._names = ArraySet.fromArray(names.map(String), true);
        this._sources = ArraySet.fromArray(sources, true);
        this._absoluteSources = this._sources.toArray().map(function(s2) {
          return util.computeSourceURL(sourceRoot, s2, aSourceMapURL);
        });
        this.sourceRoot = sourceRoot;
        this.sourcesContent = sourcesContent;
        this._mappings = mappings;
        this._sourceMapURL = aSourceMapURL;
        this.file = file;
      }
      BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
      BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
      BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
        var relativeSource = aSource;
        if (this.sourceRoot != null) {
          relativeSource = util.relative(this.sourceRoot, relativeSource);
        }
        if (this._sources.has(relativeSource)) {
          return this._sources.indexOf(relativeSource);
        }
        var i;
        for (i = 0; i < this._absoluteSources.length; ++i) {
          if (this._absoluteSources[i] == aSource) {
            return i;
          }
        }
        return -1;
      };
      BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
        var smc = Object.create(BasicSourceMapConsumer.prototype);
        var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
        var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
        smc.sourceRoot = aSourceMap._sourceRoot;
        smc.sourcesContent = aSourceMap._generateSourcesContent(
          smc._sources.toArray(),
          smc.sourceRoot
        );
        smc.file = aSourceMap._file;
        smc._sourceMapURL = aSourceMapURL;
        smc._absoluteSources = smc._sources.toArray().map(function(s2) {
          return util.computeSourceURL(smc.sourceRoot, s2, aSourceMapURL);
        });
        var generatedMappings = aSourceMap._mappings.toArray().slice();
        var destGeneratedMappings = smc.__generatedMappings = [];
        var destOriginalMappings = smc.__originalMappings = [];
        for (var i = 0, length = generatedMappings.length; i < length; i++) {
          var srcMapping = generatedMappings[i];
          var destMapping = new Mapping();
          destMapping.generatedLine = srcMapping.generatedLine;
          destMapping.generatedColumn = srcMapping.generatedColumn;
          if (srcMapping.source) {
            destMapping.source = sources.indexOf(srcMapping.source);
            destMapping.originalLine = srcMapping.originalLine;
            destMapping.originalColumn = srcMapping.originalColumn;
            if (srcMapping.name) {
              destMapping.name = names.indexOf(srcMapping.name);
            }
            destOriginalMappings.push(destMapping);
          }
          destGeneratedMappings.push(destMapping);
        }
        quickSort(smc.__originalMappings, util.compareByOriginalPositions);
        return smc;
      };
      BasicSourceMapConsumer.prototype._version = 3;
      Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
        get: function() {
          return this._absoluteSources.slice();
        }
      });
      function Mapping() {
        this.generatedLine = 0;
        this.generatedColumn = 0;
        this.source = null;
        this.originalLine = null;
        this.originalColumn = null;
        this.name = null;
      }
      BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        var generatedLine = 1;
        var previousGeneratedColumn = 0;
        var previousOriginalLine = 0;
        var previousOriginalColumn = 0;
        var previousSource = 0;
        var previousName = 0;
        var length = aStr.length;
        var index = 0;
        var cachedSegments = {};
        var temp = {};
        var originalMappings = [];
        var generatedMappings = [];
        var mapping, str, segment, end, value;
        while (index < length) {
          if (aStr.charAt(index) === ";") {
            generatedLine++;
            index++;
            previousGeneratedColumn = 0;
          } else if (aStr.charAt(index) === ",") {
            index++;
          } else {
            mapping = new Mapping();
            mapping.generatedLine = generatedLine;
            for (end = index; end < length; end++) {
              if (this._charIsMappingSeparator(aStr, end)) {
                break;
              }
            }
            str = aStr.slice(index, end);
            segment = cachedSegments[str];
            if (segment) {
              index += str.length;
            } else {
              segment = [];
              while (index < end) {
                base64VLQ.decode(aStr, index, temp);
                value = temp.value;
                index = temp.rest;
                segment.push(value);
              }
              if (segment.length === 2) {
                throw new Error("Found a source, but no line and column");
              }
              if (segment.length === 3) {
                throw new Error("Found a source and line, but no column");
              }
              cachedSegments[str] = segment;
            }
            mapping.generatedColumn = previousGeneratedColumn + segment[0];
            previousGeneratedColumn = mapping.generatedColumn;
            if (segment.length > 1) {
              mapping.source = previousSource + segment[1];
              previousSource += segment[1];
              mapping.originalLine = previousOriginalLine + segment[2];
              previousOriginalLine = mapping.originalLine;
              mapping.originalLine += 1;
              mapping.originalColumn = previousOriginalColumn + segment[3];
              previousOriginalColumn = mapping.originalColumn;
              if (segment.length > 4) {
                mapping.name = previousName + segment[4];
                previousName += segment[4];
              }
            }
            generatedMappings.push(mapping);
            if (typeof mapping.originalLine === "number") {
              originalMappings.push(mapping);
            }
          }
        }
        quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
        this.__generatedMappings = generatedMappings;
        quickSort(originalMappings, util.compareByOriginalPositions);
        this.__originalMappings = originalMappings;
      };
      BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
        if (aNeedle[aLineName] <= 0) {
          throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
        }
        if (aNeedle[aColumnName] < 0) {
          throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
        }
        return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
      };
      BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
        for (var index = 0; index < this._generatedMappings.length; ++index) {
          var mapping = this._generatedMappings[index];
          if (index + 1 < this._generatedMappings.length) {
            var nextMapping = this._generatedMappings[index + 1];
            if (mapping.generatedLine === nextMapping.generatedLine) {
              mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
              continue;
            }
          }
          mapping.lastGeneratedColumn = Infinity;
        }
      };
      BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
        var needle = {
          generatedLine: util.getArg(aArgs, "line"),
          generatedColumn: util.getArg(aArgs, "column")
        };
        var index = this._findMapping(
          needle,
          this._generatedMappings,
          "generatedLine",
          "generatedColumn",
          util.compareByGeneratedPositionsDeflated,
          util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND)
        );
        if (index >= 0) {
          var mapping = this._generatedMappings[index];
          if (mapping.generatedLine === needle.generatedLine) {
            var source = util.getArg(mapping, "source", null);
            if (source !== null) {
              source = this._sources.at(source);
              source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
            }
            var name = util.getArg(mapping, "name", null);
            if (name !== null) {
              name = this._names.at(name);
            }
            return {
              source,
              line: util.getArg(mapping, "originalLine", null),
              column: util.getArg(mapping, "originalColumn", null),
              name
            };
          }
        }
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      };
      BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
        if (!this.sourcesContent) {
          return false;
        }
        return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc2) {
          return sc2 == null;
        });
      };
      BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
        if (!this.sourcesContent) {
          return null;
        }
        var index = this._findSourceIndex(aSource);
        if (index >= 0) {
          return this.sourcesContent[index];
        }
        var relativeSource = aSource;
        if (this.sourceRoot != null) {
          relativeSource = util.relative(this.sourceRoot, relativeSource);
        }
        var url;
        if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
          var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
          if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
            return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
          }
          if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) {
            return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
          }
        }
        if (nullOnMissing) {
          return null;
        } else {
          throw new Error('"' + relativeSource + '" is not in the SourceMap.');
        }
      };
      BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
        var source = util.getArg(aArgs, "source");
        source = this._findSourceIndex(source);
        if (source < 0) {
          return {
            line: null,
            column: null,
            lastColumn: null
          };
        }
        var needle = {
          source,
          originalLine: util.getArg(aArgs, "line"),
          originalColumn: util.getArg(aArgs, "column")
        };
        var index = this._findMapping(
          needle,
          this._originalMappings,
          "originalLine",
          "originalColumn",
          util.compareByOriginalPositions,
          util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND)
        );
        if (index >= 0) {
          var mapping = this._originalMappings[index];
          if (mapping.source === needle.source) {
            return {
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            };
          }
        }
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      };
      exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
      function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
        var sourceMap = aSourceMap;
        if (typeof aSourceMap === "string") {
          sourceMap = util.parseSourceMapInput(aSourceMap);
        }
        var version2 = util.getArg(sourceMap, "version");
        var sections = util.getArg(sourceMap, "sections");
        if (version2 != this._version) {
          throw new Error("Unsupported version: " + version2);
        }
        this._sources = new ArraySet();
        this._names = new ArraySet();
        var lastOffset = {
          line: -1,
          column: 0
        };
        this._sections = sections.map(function(s2) {
          if (s2.url) {
            throw new Error("Support for url field in sections not implemented.");
          }
          var offset2 = util.getArg(s2, "offset");
          var offsetLine = util.getArg(offset2, "line");
          var offsetColumn = util.getArg(offset2, "column");
          if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
            throw new Error("Section offsets must be ordered and non-overlapping.");
          }
          lastOffset = offset2;
          return {
            generatedOffset: {
              // The offset fields are 0-based, but we use 1-based indices when
              // encoding/decoding from VLQ.
              generatedLine: offsetLine + 1,
              generatedColumn: offsetColumn + 1
            },
            consumer: new SourceMapConsumer(util.getArg(s2, "map"), aSourceMapURL)
          };
        });
      }
      IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
      IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
      IndexedSourceMapConsumer.prototype._version = 3;
      Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
        get: function() {
          var sources = [];
          for (var i = 0; i < this._sections.length; i++) {
            for (var j4 = 0; j4 < this._sections[i].consumer.sources.length; j4++) {
              sources.push(this._sections[i].consumer.sources[j4]);
            }
          }
          return sources;
        }
      });
      IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
        var needle = {
          generatedLine: util.getArg(aArgs, "line"),
          generatedColumn: util.getArg(aArgs, "column")
        };
        var sectionIndex = binarySearch.search(
          needle,
          this._sections,
          function(needle2, section2) {
            var cmp = needle2.generatedLine - section2.generatedOffset.generatedLine;
            if (cmp) {
              return cmp;
            }
            return needle2.generatedColumn - section2.generatedOffset.generatedColumn;
          }
        );
        var section = this._sections[sectionIndex];
        if (!section) {
          return {
            source: null,
            line: null,
            column: null,
            name: null
          };
        }
        return section.consumer.originalPositionFor({
          line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
          column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
          bias: aArgs.bias
        });
      };
      IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
        return this._sections.every(function(s2) {
          return s2.consumer.hasContentsOfAllSources();
        });
      };
      IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
        for (var i = 0; i < this._sections.length; i++) {
          var section = this._sections[i];
          var content = section.consumer.sourceContentFor(aSource, true);
          if (content) {
            return content;
          }
        }
        if (nullOnMissing) {
          return null;
        } else {
          throw new Error('"' + aSource + '" is not in the SourceMap.');
        }
      };
      IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
        for (var i = 0; i < this._sections.length; i++) {
          var section = this._sections[i];
          if (section.consumer._findSourceIndex(util.getArg(aArgs, "source")) === -1) {
            continue;
          }
          var generatedPosition = section.consumer.generatedPositionFor(aArgs);
          if (generatedPosition) {
            var ret = {
              line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
              column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
            };
            return ret;
          }
        }
        return {
          line: null,
          column: null
        };
      };
      IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        this.__generatedMappings = [];
        this.__originalMappings = [];
        for (var i = 0; i < this._sections.length; i++) {
          var section = this._sections[i];
          var sectionMappings = section.consumer._generatedMappings;
          for (var j4 = 0; j4 < sectionMappings.length; j4++) {
            var mapping = sectionMappings[j4];
            var source = section.consumer._sources.at(mapping.source);
            source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
            this._sources.add(source);
            source = this._sources.indexOf(source);
            var name = null;
            if (mapping.name) {
              name = section.consumer._names.at(mapping.name);
              this._names.add(name);
              name = this._names.indexOf(name);
            }
            var adjustedMapping = {
              source,
              generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
              generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
              originalLine: mapping.originalLine,
              originalColumn: mapping.originalColumn,
              name
            };
            this.__generatedMappings.push(adjustedMapping);
            if (typeof adjustedMapping.originalLine === "number") {
              this.__originalMappings.push(adjustedMapping);
            }
          }
        }
        quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
        quickSort(this.__originalMappings, util.compareByOriginalPositions);
      };
      exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
    }
  });

  // node_modules/source-map/lib/source-node.js
  var require_source_node = __commonJS({
    "node_modules/source-map/lib/source-node.js"(exports) {
      var SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
      var util = require_util();
      var REGEX_NEWLINE = /(\r?\n)/;
      var NEWLINE_CODE = 10;
      var isSourceNode = "$$$isSourceNode$$$";
      function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
        this.children = [];
        this.sourceContents = {};
        this.line = aLine == null ? null : aLine;
        this.column = aColumn == null ? null : aColumn;
        this.source = aSource == null ? null : aSource;
        this.name = aName == null ? null : aName;
        this[isSourceNode] = true;
        if (aChunks != null) this.add(aChunks);
      }
      SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
        var node = new SourceNode();
        var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
        var remainingLinesIndex = 0;
        var shiftNextLine = function() {
          var lineContents = getNextLine();
          var newLine = getNextLine() || "";
          return lineContents + newLine;
          function getNextLine() {
            return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
          }
        };
        var lastGeneratedLine = 1, lastGeneratedColumn = 0;
        var lastMapping = null;
        aSourceMapConsumer.eachMapping(function(mapping) {
          if (lastMapping !== null) {
            if (lastGeneratedLine < mapping.generatedLine) {
              addMappingWithCode(lastMapping, shiftNextLine());
              lastGeneratedLine++;
              lastGeneratedColumn = 0;
            } else {
              var nextLine = remainingLines[remainingLinesIndex] || "";
              var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
              remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
              lastGeneratedColumn = mapping.generatedColumn;
              addMappingWithCode(lastMapping, code);
              lastMapping = mapping;
              return;
            }
          }
          while (lastGeneratedLine < mapping.generatedLine) {
            node.add(shiftNextLine());
            lastGeneratedLine++;
          }
          if (lastGeneratedColumn < mapping.generatedColumn) {
            var nextLine = remainingLines[remainingLinesIndex] || "";
            node.add(nextLine.substr(0, mapping.generatedColumn));
            remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
          }
          lastMapping = mapping;
        }, this);
        if (remainingLinesIndex < remainingLines.length) {
          if (lastMapping) {
            addMappingWithCode(lastMapping, shiftNextLine());
          }
          node.add(remainingLines.splice(remainingLinesIndex).join(""));
        }
        aSourceMapConsumer.sources.forEach(function(sourceFile) {
          var content = aSourceMapConsumer.sourceContentFor(sourceFile);
          if (content != null) {
            if (aRelativePath != null) {
              sourceFile = util.join(aRelativePath, sourceFile);
            }
            node.setSourceContent(sourceFile, content);
          }
        });
        return node;
        function addMappingWithCode(mapping, code) {
          if (mapping === null || mapping.source === void 0) {
            node.add(code);
          } else {
            var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
            node.add(new SourceNode(
              mapping.originalLine,
              mapping.originalColumn,
              source,
              code,
              mapping.name
            ));
          }
        }
      };
      SourceNode.prototype.add = function SourceNode_add(aChunk) {
        if (Array.isArray(aChunk)) {
          aChunk.forEach(function(chunk) {
            this.add(chunk);
          }, this);
        } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
          if (aChunk) {
            this.children.push(aChunk);
          }
        } else {
          throw new TypeError(
            "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
          );
        }
        return this;
      };
      SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
        if (Array.isArray(aChunk)) {
          for (var i = aChunk.length - 1; i >= 0; i--) {
            this.prepend(aChunk[i]);
          }
        } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
          this.children.unshift(aChunk);
        } else {
          throw new TypeError(
            "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
          );
        }
        return this;
      };
      SourceNode.prototype.walk = function SourceNode_walk(aFn) {
        var chunk;
        for (var i = 0, len = this.children.length; i < len; i++) {
          chunk = this.children[i];
          if (chunk[isSourceNode]) {
            chunk.walk(aFn);
          } else {
            if (chunk !== "") {
              aFn(chunk, {
                source: this.source,
                line: this.line,
                column: this.column,
                name: this.name
              });
            }
          }
        }
      };
      SourceNode.prototype.join = function SourceNode_join(aSep) {
        var newChildren;
        var i;
        var len = this.children.length;
        if (len > 0) {
          newChildren = [];
          for (i = 0; i < len - 1; i++) {
            newChildren.push(this.children[i]);
            newChildren.push(aSep);
          }
          newChildren.push(this.children[i]);
          this.children = newChildren;
        }
        return this;
      };
      SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
        var lastChild = this.children[this.children.length - 1];
        if (lastChild[isSourceNode]) {
          lastChild.replaceRight(aPattern, aReplacement);
        } else if (typeof lastChild === "string") {
          this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
        } else {
          this.children.push("".replace(aPattern, aReplacement));
        }
        return this;
      };
      SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
        this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
      };
      SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
        for (var i = 0, len = this.children.length; i < len; i++) {
          if (this.children[i][isSourceNode]) {
            this.children[i].walkSourceContents(aFn);
          }
        }
        var sources = Object.keys(this.sourceContents);
        for (var i = 0, len = sources.length; i < len; i++) {
          aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
        }
      };
      SourceNode.prototype.toString = function SourceNode_toString() {
        var str = "";
        this.walk(function(chunk) {
          str += chunk;
        });
        return str;
      };
      SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
        var generated = {
          code: "",
          line: 1,
          column: 0
        };
        var map = new SourceMapGenerator(aArgs);
        var sourceMappingActive = false;
        var lastOriginalSource = null;
        var lastOriginalLine = null;
        var lastOriginalColumn = null;
        var lastOriginalName = null;
        this.walk(function(chunk, original) {
          generated.code += chunk;
          if (original.source !== null && original.line !== null && original.column !== null) {
            if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
              map.addMapping({
                source: original.source,
                original: {
                  line: original.line,
                  column: original.column
                },
                generated: {
                  line: generated.line,
                  column: generated.column
                },
                name: original.name
              });
            }
            lastOriginalSource = original.source;
            lastOriginalLine = original.line;
            lastOriginalColumn = original.column;
            lastOriginalName = original.name;
            sourceMappingActive = true;
          } else if (sourceMappingActive) {
            map.addMapping({
              generated: {
                line: generated.line,
                column: generated.column
              }
            });
            lastOriginalSource = null;
            sourceMappingActive = false;
          }
          for (var idx = 0, length = chunk.length; idx < length; idx++) {
            if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
              generated.line++;
              generated.column = 0;
              if (idx + 1 === length) {
                lastOriginalSource = null;
                sourceMappingActive = false;
              } else if (sourceMappingActive) {
                map.addMapping({
                  source: original.source,
                  original: {
                    line: original.line,
                    column: original.column
                  },
                  generated: {
                    line: generated.line,
                    column: generated.column
                  },
                  name: original.name
                });
              }
            } else {
              generated.column++;
            }
          }
        });
        this.walkSourceContents(function(sourceFile, sourceContent) {
          map.setSourceContent(sourceFile, sourceContent);
        });
        return { code: generated.code, map };
      };
      exports.SourceNode = SourceNode;
    }
  });

  // node_modules/source-map/source-map.js
  var require_source_map = __commonJS({
    "node_modules/source-map/source-map.js"(exports) {
      exports.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
      exports.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
      exports.SourceNode = require_source_node().SourceNode;
    }
  });

  // node_modules/escodegen/package.json
  var require_package = __commonJS({
    "node_modules/escodegen/package.json"(exports, module) {
      module.exports = {
        name: "escodegen",
        description: "ECMAScript code generator",
        homepage: "http://github.com/estools/escodegen",
        main: "escodegen.js",
        bin: {
          esgenerate: "./bin/esgenerate.js",
          escodegen: "./bin/escodegen.js"
        },
        files: [
          "LICENSE.BSD",
          "README.md",
          "bin",
          "escodegen.js",
          "package.json"
        ],
        version: "2.1.0",
        engines: {
          node: ">=6.0"
        },
        maintainers: [
          {
            name: "Yusuke Suzuki",
            email: "utatane.tea@gmail.com",
            web: "http://github.com/Constellation"
          }
        ],
        repository: {
          type: "git",
          url: "http://github.com/estools/escodegen.git"
        },
        dependencies: {
          estraverse: "^5.2.0",
          esutils: "^2.0.2",
          esprima: "^4.0.1"
        },
        optionalDependencies: {
          "source-map": "~0.6.1"
        },
        devDependencies: {
          acorn: "^8.0.4",
          bluebird: "^3.4.7",
          "bower-registry-client": "^1.0.0",
          chai: "^4.2.0",
          "chai-exclude": "^2.0.2",
          "commonjs-everywhere": "^0.9.7",
          gulp: "^4.0.2",
          "gulp-eslint": "^6.0.0",
          "gulp-mocha": "^7.0.2",
          minimist: "^1.2.5",
          optionator: "^0.9.1",
          semver: "^7.3.4"
        },
        license: "BSD-2-Clause",
        scripts: {
          test: "gulp travis",
          "unit-test": "gulp test",
          lint: "gulp lint",
          release: "node tools/release.js",
          "build-min": "./node_modules/.bin/cjsify -ma path: tools/entry-point.js > escodegen.browser.min.js",
          build: "./node_modules/.bin/cjsify -a path: tools/entry-point.js > escodegen.browser.js"
        }
      };
    }
  });

  // node_modules/escodegen/escodegen.js
  var require_escodegen = __commonJS({
    "node_modules/escodegen/escodegen.js"(exports) {
      (function() {
        "use strict";
        var Syntax, Precedence, BinaryPrecedence, SourceNode, estraverse, esutils, base, indent, json, renumber, hexadecimal, quotes, escapeless, newline, space, parentheses, semicolons, safeConcatenation, directive, extra, parse5, sourceMap, sourceCode, preserveBlankLines, FORMAT_MINIFY, FORMAT_DEFAULTS;
        estraverse = require_estraverse();
        esutils = require_utils();
        Syntax = estraverse.Syntax;
        function isExpression(node) {
          return CodeGenerator.Expression.hasOwnProperty(node.type);
        }
        function isStatement(node) {
          return CodeGenerator.Statement.hasOwnProperty(node.type);
        }
        Precedence = {
          Sequence: 0,
          Yield: 1,
          Assignment: 1,
          Conditional: 2,
          ArrowFunction: 2,
          Coalesce: 3,
          LogicalOR: 4,
          LogicalAND: 5,
          BitwiseOR: 6,
          BitwiseXOR: 7,
          BitwiseAND: 8,
          Equality: 9,
          Relational: 10,
          BitwiseSHIFT: 11,
          Additive: 12,
          Multiplicative: 13,
          Exponentiation: 14,
          Await: 15,
          Unary: 15,
          Postfix: 16,
          OptionalChaining: 17,
          Call: 18,
          New: 19,
          TaggedTemplate: 20,
          Member: 21,
          Primary: 22
        };
        BinaryPrecedence = {
          "??": Precedence.Coalesce,
          "||": Precedence.LogicalOR,
          "&&": Precedence.LogicalAND,
          "|": Precedence.BitwiseOR,
          "^": Precedence.BitwiseXOR,
          "&": Precedence.BitwiseAND,
          "==": Precedence.Equality,
          "!=": Precedence.Equality,
          "===": Precedence.Equality,
          "!==": Precedence.Equality,
          "is": Precedence.Equality,
          "isnt": Precedence.Equality,
          "<": Precedence.Relational,
          ">": Precedence.Relational,
          "<=": Precedence.Relational,
          ">=": Precedence.Relational,
          "in": Precedence.Relational,
          "instanceof": Precedence.Relational,
          "<<": Precedence.BitwiseSHIFT,
          ">>": Precedence.BitwiseSHIFT,
          ">>>": Precedence.BitwiseSHIFT,
          "+": Precedence.Additive,
          "-": Precedence.Additive,
          "*": Precedence.Multiplicative,
          "%": Precedence.Multiplicative,
          "/": Precedence.Multiplicative,
          "**": Precedence.Exponentiation
        };
        var F_ALLOW_IN = 1, F_ALLOW_CALL = 1 << 1, F_ALLOW_UNPARATH_NEW = 1 << 2, F_FUNC_BODY = 1 << 3, F_DIRECTIVE_CTX = 1 << 4, F_SEMICOLON_OPT = 1 << 5, F_FOUND_COALESCE = 1 << 6;
        var E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW, E_TTF = F_ALLOW_IN | F_ALLOW_CALL, E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW, E_TFF = F_ALLOW_IN, E_FFT = F_ALLOW_UNPARATH_NEW, E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW;
        var S_TFFF = F_ALLOW_IN, S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT, S_FFFF = 0, S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX, S_TTFF = F_ALLOW_IN | F_FUNC_BODY;
        function getDefaultOptions() {
          return {
            indent: null,
            base: null,
            parse: null,
            comment: false,
            format: {
              indent: {
                style: "    ",
                base: 0,
                adjustMultilineComment: false
              },
              newline: "\n",
              space: " ",
              json: false,
              renumber: false,
              hexadecimal: false,
              quotes: "single",
              escapeless: false,
              compact: false,
              parentheses: true,
              semicolons: true,
              safeConcatenation: false,
              preserveBlankLines: false
            },
            moz: {
              comprehensionExpressionStartsWithAssignment: false,
              starlessGenerator: false
            },
            sourceMap: null,
            sourceMapRoot: null,
            sourceMapWithCode: false,
            directive: false,
            raw: true,
            verbatim: null,
            sourceCode: null
          };
        }
        function stringRepeat(str, num) {
          var result = "";
          for (num |= 0; num > 0; num >>>= 1, str += str) {
            if (num & 1) {
              result += str;
            }
          }
          return result;
        }
        function hasLineTerminator(str) {
          return /[\r\n]/g.test(str);
        }
        function endsWithLineTerminator(str) {
          var len = str.length;
          return len && esutils.code.isLineTerminator(str.charCodeAt(len - 1));
        }
        function merge(target, override) {
          var key;
          for (key in override) {
            if (override.hasOwnProperty(key)) {
              target[key] = override[key];
            }
          }
          return target;
        }
        function updateDeeply(target, override) {
          var key, val;
          function isHashObject(target2) {
            return typeof target2 === "object" && target2 instanceof Object && !(target2 instanceof RegExp);
          }
          for (key in override) {
            if (override.hasOwnProperty(key)) {
              val = override[key];
              if (isHashObject(val)) {
                if (isHashObject(target[key])) {
                  updateDeeply(target[key], val);
                } else {
                  target[key] = updateDeeply({}, val);
                }
              } else {
                target[key] = val;
              }
            }
          }
          return target;
        }
        function generateNumber(value) {
          var result, point, temp, exponent, pos;
          if (value !== value) {
            throw new Error("Numeric literal whose value is NaN");
          }
          if (value < 0 || value === 0 && 1 / value < 0) {
            throw new Error("Numeric literal whose value is negative");
          }
          if (value === 1 / 0) {
            return json ? "null" : renumber ? "1e400" : "1e+400";
          }
          result = "" + value;
          if (!renumber || result.length < 3) {
            return result;
          }
          point = result.indexOf(".");
          if (!json && result.charCodeAt(0) === 48 && point === 1) {
            point = 0;
            result = result.slice(1);
          }
          temp = result;
          result = result.replace("e+", "e");
          exponent = 0;
          if ((pos = temp.indexOf("e")) > 0) {
            exponent = +temp.slice(pos + 1);
            temp = temp.slice(0, pos);
          }
          if (point >= 0) {
            exponent -= temp.length - point - 1;
            temp = +(temp.slice(0, point) + temp.slice(point + 1)) + "";
          }
          pos = 0;
          while (temp.charCodeAt(temp.length + pos - 1) === 48) {
            --pos;
          }
          if (pos !== 0) {
            exponent -= pos;
            temp = temp.slice(0, pos);
          }
          if (exponent !== 0) {
            temp += "e" + exponent;
          }
          if ((temp.length < result.length || hexadecimal && value > 1e12 && Math.floor(value) === value && (temp = "0x" + value.toString(16)).length < result.length) && +temp === value) {
            result = temp;
          }
          return result;
        }
        function escapeRegExpCharacter(ch2, previousIsBackslash) {
          if ((ch2 & ~1) === 8232) {
            return (previousIsBackslash ? "u" : "\\u") + (ch2 === 8232 ? "2028" : "2029");
          } else if (ch2 === 10 || ch2 === 13) {
            return (previousIsBackslash ? "" : "\\") + (ch2 === 10 ? "n" : "r");
          }
          return String.fromCharCode(ch2);
        }
        function generateRegExp(reg) {
          var match, result, flags, i, iz, ch2, characterInBrack, previousIsBackslash;
          result = reg.toString();
          if (reg.source) {
            match = result.match(/\/([^/]*)$/);
            if (!match) {
              return result;
            }
            flags = match[1];
            result = "";
            characterInBrack = false;
            previousIsBackslash = false;
            for (i = 0, iz = reg.source.length; i < iz; ++i) {
              ch2 = reg.source.charCodeAt(i);
              if (!previousIsBackslash) {
                if (characterInBrack) {
                  if (ch2 === 93) {
                    characterInBrack = false;
                  }
                } else {
                  if (ch2 === 47) {
                    result += "\\";
                  } else if (ch2 === 91) {
                    characterInBrack = true;
                  }
                }
                result += escapeRegExpCharacter(ch2, previousIsBackslash);
                previousIsBackslash = ch2 === 92;
              } else {
                result += escapeRegExpCharacter(ch2, previousIsBackslash);
                previousIsBackslash = false;
              }
            }
            return "/" + result + "/" + flags;
          }
          return result;
        }
        function escapeAllowedCharacter(code, next) {
          var hex;
          if (code === 8) {
            return "\\b";
          }
          if (code === 12) {
            return "\\f";
          }
          if (code === 9) {
            return "\\t";
          }
          hex = code.toString(16).toUpperCase();
          if (json || code > 255) {
            return "\\u" + "0000".slice(hex.length) + hex;
          } else if (code === 0 && !esutils.code.isDecimalDigit(next)) {
            return "\\0";
          } else if (code === 11) {
            return "\\x0B";
          } else {
            return "\\x" + "00".slice(hex.length) + hex;
          }
        }
        function escapeDisallowedCharacter(code) {
          if (code === 92) {
            return "\\\\";
          }
          if (code === 10) {
            return "\\n";
          }
          if (code === 13) {
            return "\\r";
          }
          if (code === 8232) {
            return "\\u2028";
          }
          if (code === 8233) {
            return "\\u2029";
          }
          throw new Error("Incorrectly classified character");
        }
        function escapeDirective(str) {
          var i, iz, code, quote;
          quote = quotes === "double" ? '"' : "'";
          for (i = 0, iz = str.length; i < iz; ++i) {
            code = str.charCodeAt(i);
            if (code === 39) {
              quote = '"';
              break;
            } else if (code === 34) {
              quote = "'";
              break;
            } else if (code === 92) {
              ++i;
            }
          }
          return quote + str + quote;
        }
        function escapeString(str) {
          var result = "", i, len, code, singleQuotes = 0, doubleQuotes = 0, single, quote;
          for (i = 0, len = str.length; i < len; ++i) {
            code = str.charCodeAt(i);
            if (code === 39) {
              ++singleQuotes;
            } else if (code === 34) {
              ++doubleQuotes;
            } else if (code === 47 && json) {
              result += "\\";
            } else if (esutils.code.isLineTerminator(code) || code === 92) {
              result += escapeDisallowedCharacter(code);
              continue;
            } else if (!esutils.code.isIdentifierPartES5(code) && (json && code < 32 || !json && !escapeless && (code < 32 || code > 126))) {
              result += escapeAllowedCharacter(code, str.charCodeAt(i + 1));
              continue;
            }
            result += String.fromCharCode(code);
          }
          single = !(quotes === "double" || quotes === "auto" && doubleQuotes < singleQuotes);
          quote = single ? "'" : '"';
          if (!(single ? singleQuotes : doubleQuotes)) {
            return quote + result + quote;
          }
          str = result;
          result = quote;
          for (i = 0, len = str.length; i < len; ++i) {
            code = str.charCodeAt(i);
            if (code === 39 && single || code === 34 && !single) {
              result += "\\";
            }
            result += String.fromCharCode(code);
          }
          return result + quote;
        }
        function flattenToString(arr) {
          var i, iz, elem, result = "";
          for (i = 0, iz = arr.length; i < iz; ++i) {
            elem = arr[i];
            result += Array.isArray(elem) ? flattenToString(elem) : elem;
          }
          return result;
        }
        function toSourceNodeWhenNeeded(generated, node) {
          if (!sourceMap) {
            if (Array.isArray(generated)) {
              return flattenToString(generated);
            } else {
              return generated;
            }
          }
          if (node == null) {
            if (generated instanceof SourceNode) {
              return generated;
            } else {
              node = {};
            }
          }
          if (node.loc == null) {
            return new SourceNode(null, null, sourceMap, generated, node.name || null);
          }
          return new SourceNode(node.loc.start.line, node.loc.start.column, sourceMap === true ? node.loc.source || null : sourceMap, generated, node.name || null);
        }
        function noEmptySpace() {
          return space ? space : " ";
        }
        function join(left, right) {
          var leftSource, rightSource, leftCharCode, rightCharCode;
          leftSource = toSourceNodeWhenNeeded(left).toString();
          if (leftSource.length === 0) {
            return [right];
          }
          rightSource = toSourceNodeWhenNeeded(right).toString();
          if (rightSource.length === 0) {
            return [left];
          }
          leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
          rightCharCode = rightSource.charCodeAt(0);
          if ((leftCharCode === 43 || leftCharCode === 45) && leftCharCode === rightCharCode || esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode) || leftCharCode === 47 && rightCharCode === 105) {
            return [left, noEmptySpace(), right];
          } else if (esutils.code.isWhiteSpace(leftCharCode) || esutils.code.isLineTerminator(leftCharCode) || esutils.code.isWhiteSpace(rightCharCode) || esutils.code.isLineTerminator(rightCharCode)) {
            return [left, right];
          }
          return [left, space, right];
        }
        function addIndent(stmt) {
          return [base, stmt];
        }
        function withIndent(fn2) {
          var previousBase;
          previousBase = base;
          base += indent;
          fn2(base);
          base = previousBase;
        }
        function calculateSpaces(str) {
          var i;
          for (i = str.length - 1; i >= 0; --i) {
            if (esutils.code.isLineTerminator(str.charCodeAt(i))) {
              break;
            }
          }
          return str.length - 1 - i;
        }
        function adjustMultilineComment(value, specialBase) {
          var array, i, len, line, j4, spaces, previousBase, sn2;
          array = value.split(/\r\n|[\r\n]/);
          spaces = Number.MAX_VALUE;
          for (i = 1, len = array.length; i < len; ++i) {
            line = array[i];
            j4 = 0;
            while (j4 < line.length && esutils.code.isWhiteSpace(line.charCodeAt(j4))) {
              ++j4;
            }
            if (spaces > j4) {
              spaces = j4;
            }
          }
          if (typeof specialBase !== "undefined") {
            previousBase = base;
            if (array[1][spaces] === "*") {
              specialBase += " ";
            }
            base = specialBase;
          } else {
            if (spaces & 1) {
              --spaces;
            }
            previousBase = base;
          }
          for (i = 1, len = array.length; i < len; ++i) {
            sn2 = toSourceNodeWhenNeeded(addIndent(array[i].slice(spaces)));
            array[i] = sourceMap ? sn2.join("") : sn2;
          }
          base = previousBase;
          return array.join("\n");
        }
        function generateComment(comment, specialBase) {
          if (comment.type === "Line") {
            if (endsWithLineTerminator(comment.value)) {
              return "//" + comment.value;
            } else {
              var result = "//" + comment.value;
              if (!preserveBlankLines) {
                result += "\n";
              }
              return result;
            }
          }
          if (extra.format.indent.adjustMultilineComment && /[\n\r]/.test(comment.value)) {
            return adjustMultilineComment("/*" + comment.value + "*/", specialBase);
          }
          return "/*" + comment.value + "*/";
        }
        function addComments(stmt, result) {
          var i, len, comment, save, tailingToStatement, specialBase, fragment, extRange, range, prevRange, prefix, infix, suffix, count;
          if (stmt.leadingComments && stmt.leadingComments.length > 0) {
            save = result;
            if (preserveBlankLines) {
              comment = stmt.leadingComments[0];
              result = [];
              extRange = comment.extendedRange;
              range = comment.range;
              prefix = sourceCode.substring(extRange[0], range[0]);
              count = (prefix.match(/\n/g) || []).length;
              if (count > 0) {
                result.push(stringRepeat("\n", count));
                result.push(addIndent(generateComment(comment)));
              } else {
                result.push(prefix);
                result.push(generateComment(comment));
              }
              prevRange = range;
              for (i = 1, len = stmt.leadingComments.length; i < len; i++) {
                comment = stmt.leadingComments[i];
                range = comment.range;
                infix = sourceCode.substring(prevRange[1], range[0]);
                count = (infix.match(/\n/g) || []).length;
                result.push(stringRepeat("\n", count));
                result.push(addIndent(generateComment(comment)));
                prevRange = range;
              }
              suffix = sourceCode.substring(range[1], extRange[1]);
              count = (suffix.match(/\n/g) || []).length;
              result.push(stringRepeat("\n", count));
            } else {
              comment = stmt.leadingComments[0];
              result = [];
              if (safeConcatenation && stmt.type === Syntax.Program && stmt.body.length === 0) {
                result.push("\n");
              }
              result.push(generateComment(comment));
              if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push("\n");
              }
              for (i = 1, len = stmt.leadingComments.length; i < len; ++i) {
                comment = stmt.leadingComments[i];
                fragment = [generateComment(comment)];
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                  fragment.push("\n");
                }
                result.push(addIndent(fragment));
              }
            }
            result.push(addIndent(save));
          }
          if (stmt.trailingComments) {
            if (preserveBlankLines) {
              comment = stmt.trailingComments[0];
              extRange = comment.extendedRange;
              range = comment.range;
              prefix = sourceCode.substring(extRange[0], range[0]);
              count = (prefix.match(/\n/g) || []).length;
              if (count > 0) {
                result.push(stringRepeat("\n", count));
                result.push(addIndent(generateComment(comment)));
              } else {
                result.push(prefix);
                result.push(generateComment(comment));
              }
            } else {
              tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
              specialBase = stringRepeat(" ", calculateSpaces(toSourceNodeWhenNeeded([base, result, indent]).toString()));
              for (i = 0, len = stmt.trailingComments.length; i < len; ++i) {
                comment = stmt.trailingComments[i];
                if (tailingToStatement) {
                  if (i === 0) {
                    result = [result, indent];
                  } else {
                    result = [result, specialBase];
                  }
                  result.push(generateComment(comment, specialBase));
                } else {
                  result = [result, addIndent(generateComment(comment))];
                }
                if (i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                  result = [result, "\n"];
                }
              }
            }
          }
          return result;
        }
        function generateBlankLines(start, end, result) {
          var j4, newlineCount = 0;
          for (j4 = start; j4 < end; j4++) {
            if (sourceCode[j4] === "\n") {
              newlineCount++;
            }
          }
          for (j4 = 1; j4 < newlineCount; j4++) {
            result.push(newline);
          }
        }
        function parenthesize(text, current2, should) {
          if (current2 < should) {
            return ["(", text, ")"];
          }
          return text;
        }
        function generateVerbatimString(string) {
          var i, iz, result;
          result = string.split(/\r\n|\n/);
          for (i = 1, iz = result.length; i < iz; i++) {
            result[i] = newline + base + result[i];
          }
          return result;
        }
        function generateVerbatim(expr, precedence) {
          var verbatim, result, prec;
          verbatim = expr[extra.verbatim];
          if (typeof verbatim === "string") {
            result = parenthesize(generateVerbatimString(verbatim), Precedence.Sequence, precedence);
          } else {
            result = generateVerbatimString(verbatim.content);
            prec = verbatim.precedence != null ? verbatim.precedence : Precedence.Sequence;
            result = parenthesize(result, prec, precedence);
          }
          return toSourceNodeWhenNeeded(result, expr);
        }
        function CodeGenerator() {
        }
        CodeGenerator.prototype.maybeBlock = function(stmt, flags) {
          var result, noLeadingComment, that = this;
          noLeadingComment = !extra.comment || !stmt.leadingComments;
          if (stmt.type === Syntax.BlockStatement && noLeadingComment) {
            return [space, this.generateStatement(stmt, flags)];
          }
          if (stmt.type === Syntax.EmptyStatement && noLeadingComment) {
            return ";";
          }
          withIndent(function() {
            result = [
              newline,
              addIndent(that.generateStatement(stmt, flags))
            ];
          });
          return result;
        };
        CodeGenerator.prototype.maybeBlockSuffix = function(stmt, result) {
          var ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
          if (stmt.type === Syntax.BlockStatement && (!extra.comment || !stmt.leadingComments) && !ends) {
            return [result, space];
          }
          if (ends) {
            return [result, base];
          }
          return [result, newline, base];
        };
        function generateIdentifier(node) {
          return toSourceNodeWhenNeeded(node.name, node);
        }
        function generateAsyncPrefix(node, spaceRequired) {
          return node.async ? "async" + (spaceRequired ? noEmptySpace() : space) : "";
        }
        function generateStarSuffix(node) {
          var isGenerator = node.generator && !extra.moz.starlessGenerator;
          return isGenerator ? "*" + space : "";
        }
        function generateMethodPrefix(prop) {
          var func = prop.value, prefix = "";
          if (func.async) {
            prefix += generateAsyncPrefix(func, !prop.computed);
          }
          if (func.generator) {
            prefix += generateStarSuffix(func) ? "*" : "";
          }
          return prefix;
        }
        CodeGenerator.prototype.generatePattern = function(node, precedence, flags) {
          if (node.type === Syntax.Identifier) {
            return generateIdentifier(node);
          }
          return this.generateExpression(node, precedence, flags);
        };
        CodeGenerator.prototype.generateFunctionParams = function(node) {
          var i, iz, result, hasDefault;
          hasDefault = false;
          if (node.type === Syntax.ArrowFunctionExpression && !node.rest && (!node.defaults || node.defaults.length === 0) && node.params.length === 1 && node.params[0].type === Syntax.Identifier) {
            result = [generateAsyncPrefix(node, true), generateIdentifier(node.params[0])];
          } else {
            result = node.type === Syntax.ArrowFunctionExpression ? [generateAsyncPrefix(node, false)] : [];
            result.push("(");
            if (node.defaults) {
              hasDefault = true;
            }
            for (i = 0, iz = node.params.length; i < iz; ++i) {
              if (hasDefault && node.defaults[i]) {
                result.push(this.generateAssignment(node.params[i], node.defaults[i], "=", Precedence.Assignment, E_TTT));
              } else {
                result.push(this.generatePattern(node.params[i], Precedence.Assignment, E_TTT));
              }
              if (i + 1 < iz) {
                result.push("," + space);
              }
            }
            if (node.rest) {
              if (node.params.length) {
                result.push("," + space);
              }
              result.push("...");
              result.push(generateIdentifier(node.rest));
            }
            result.push(")");
          }
          return result;
        };
        CodeGenerator.prototype.generateFunctionBody = function(node) {
          var result, expr;
          result = this.generateFunctionParams(node);
          if (node.type === Syntax.ArrowFunctionExpression) {
            result.push(space);
            result.push("=>");
          }
          if (node.expression) {
            result.push(space);
            expr = this.generateExpression(node.body, Precedence.Assignment, E_TTT);
            if (expr.toString().charAt(0) === "{") {
              expr = ["(", expr, ")"];
            }
            result.push(expr);
          } else {
            result.push(this.maybeBlock(node.body, S_TTFF));
          }
          return result;
        };
        CodeGenerator.prototype.generateIterationForStatement = function(operator, stmt, flags) {
          var result = ["for" + (stmt.await ? noEmptySpace() + "await" : "") + space + "("], that = this;
          withIndent(function() {
            if (stmt.left.type === Syntax.VariableDeclaration) {
              withIndent(function() {
                result.push(stmt.left.kind + noEmptySpace());
                result.push(that.generateStatement(stmt.left.declarations[0], S_FFFF));
              });
            } else {
              result.push(that.generateExpression(stmt.left, Precedence.Call, E_TTT));
            }
            result = join(result, operator);
            result = [join(
              result,
              that.generateExpression(stmt.right, Precedence.Assignment, E_TTT)
            ), ")"];
          });
          result.push(this.maybeBlock(stmt.body, flags));
          return result;
        };
        CodeGenerator.prototype.generatePropertyKey = function(expr, computed) {
          var result = [];
          if (computed) {
            result.push("[");
          }
          result.push(this.generateExpression(expr, Precedence.Assignment, E_TTT));
          if (computed) {
            result.push("]");
          }
          return result;
        };
        CodeGenerator.prototype.generateAssignment = function(left, right, operator, precedence, flags) {
          if (Precedence.Assignment < precedence) {
            flags |= F_ALLOW_IN;
          }
          return parenthesize(
            [
              this.generateExpression(left, Precedence.Call, flags),
              space + operator + space,
              this.generateExpression(right, Precedence.Assignment, flags)
            ],
            Precedence.Assignment,
            precedence
          );
        };
        CodeGenerator.prototype.semicolon = function(flags) {
          if (!semicolons && flags & F_SEMICOLON_OPT) {
            return "";
          }
          return ";";
        };
        CodeGenerator.Statement = {
          BlockStatement: function(stmt, flags) {
            var range, content, result = ["{", newline], that = this;
            withIndent(function() {
              if (stmt.body.length === 0 && preserveBlankLines) {
                range = stmt.range;
                if (range[1] - range[0] > 2) {
                  content = sourceCode.substring(range[0] + 1, range[1] - 1);
                  if (content[0] === "\n") {
                    result = ["{"];
                  }
                  result.push(content);
                }
              }
              var i, iz, fragment, bodyFlags;
              bodyFlags = S_TFFF;
              if (flags & F_FUNC_BODY) {
                bodyFlags |= F_DIRECTIVE_CTX;
              }
              for (i = 0, iz = stmt.body.length; i < iz; ++i) {
                if (preserveBlankLines) {
                  if (i === 0) {
                    if (stmt.body[0].leadingComments) {
                      range = stmt.body[0].leadingComments[0].extendedRange;
                      content = sourceCode.substring(range[0], range[1]);
                      if (content[0] === "\n") {
                        result = ["{"];
                      }
                    }
                    if (!stmt.body[0].leadingComments) {
                      generateBlankLines(stmt.range[0], stmt.body[0].range[0], result);
                    }
                  }
                  if (i > 0) {
                    if (!stmt.body[i - 1].trailingComments && !stmt.body[i].leadingComments) {
                      generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
                    }
                  }
                }
                if (i === iz - 1) {
                  bodyFlags |= F_SEMICOLON_OPT;
                }
                if (stmt.body[i].leadingComments && preserveBlankLines) {
                  fragment = that.generateStatement(stmt.body[i], bodyFlags);
                } else {
                  fragment = addIndent(that.generateStatement(stmt.body[i], bodyFlags));
                }
                result.push(fragment);
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                  if (preserveBlankLines && i < iz - 1) {
                    if (!stmt.body[i + 1].leadingComments) {
                      result.push(newline);
                    }
                  } else {
                    result.push(newline);
                  }
                }
                if (preserveBlankLines) {
                  if (i === iz - 1) {
                    if (!stmt.body[i].trailingComments) {
                      generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
                    }
                  }
                }
              }
            });
            result.push(addIndent("}"));
            return result;
          },
          BreakStatement: function(stmt, flags) {
            if (stmt.label) {
              return "break " + stmt.label.name + this.semicolon(flags);
            }
            return "break" + this.semicolon(flags);
          },
          ContinueStatement: function(stmt, flags) {
            if (stmt.label) {
              return "continue " + stmt.label.name + this.semicolon(flags);
            }
            return "continue" + this.semicolon(flags);
          },
          ClassBody: function(stmt, flags) {
            var result = ["{", newline], that = this;
            withIndent(function(indent2) {
              var i, iz;
              for (i = 0, iz = stmt.body.length; i < iz; ++i) {
                result.push(indent2);
                result.push(that.generateExpression(stmt.body[i], Precedence.Sequence, E_TTT));
                if (i + 1 < iz) {
                  result.push(newline);
                }
              }
            });
            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
              result.push(newline);
            }
            result.push(base);
            result.push("}");
            return result;
          },
          ClassDeclaration: function(stmt, flags) {
            var result, fragment;
            result = ["class"];
            if (stmt.id) {
              result = join(result, this.generateExpression(stmt.id, Precedence.Sequence, E_TTT));
            }
            if (stmt.superClass) {
              fragment = join("extends", this.generateExpression(stmt.superClass, Precedence.Unary, E_TTT));
              result = join(result, fragment);
            }
            result.push(space);
            result.push(this.generateStatement(stmt.body, S_TFFT));
            return result;
          },
          DirectiveStatement: function(stmt, flags) {
            if (extra.raw && stmt.raw) {
              return stmt.raw + this.semicolon(flags);
            }
            return escapeDirective(stmt.directive) + this.semicolon(flags);
          },
          DoWhileStatement: function(stmt, flags) {
            var result = join("do", this.maybeBlock(stmt.body, S_TFFF));
            result = this.maybeBlockSuffix(stmt.body, result);
            return join(result, [
              "while" + space + "(",
              this.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
              ")" + this.semicolon(flags)
            ]);
          },
          CatchClause: function(stmt, flags) {
            var result, that = this;
            withIndent(function() {
              var guard;
              if (stmt.param) {
                result = [
                  "catch" + space + "(",
                  that.generateExpression(stmt.param, Precedence.Sequence, E_TTT),
                  ")"
                ];
                if (stmt.guard) {
                  guard = that.generateExpression(stmt.guard, Precedence.Sequence, E_TTT);
                  result.splice(2, 0, " if ", guard);
                }
              } else {
                result = ["catch"];
              }
            });
            result.push(this.maybeBlock(stmt.body, S_TFFF));
            return result;
          },
          DebuggerStatement: function(stmt, flags) {
            return "debugger" + this.semicolon(flags);
          },
          EmptyStatement: function(stmt, flags) {
            return ";";
          },
          ExportDefaultDeclaration: function(stmt, flags) {
            var result = ["export"], bodyFlags;
            bodyFlags = flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF;
            result = join(result, "default");
            if (isStatement(stmt.declaration)) {
              result = join(result, this.generateStatement(stmt.declaration, bodyFlags));
            } else {
              result = join(result, this.generateExpression(stmt.declaration, Precedence.Assignment, E_TTT) + this.semicolon(flags));
            }
            return result;
          },
          ExportNamedDeclaration: function(stmt, flags) {
            var result = ["export"], bodyFlags, that = this;
            bodyFlags = flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF;
            if (stmt.declaration) {
              return join(result, this.generateStatement(stmt.declaration, bodyFlags));
            }
            if (stmt.specifiers) {
              if (stmt.specifiers.length === 0) {
                result = join(result, "{" + space + "}");
              } else if (stmt.specifiers[0].type === Syntax.ExportBatchSpecifier) {
                result = join(result, this.generateExpression(stmt.specifiers[0], Precedence.Sequence, E_TTT));
              } else {
                result = join(result, "{");
                withIndent(function(indent2) {
                  var i, iz;
                  result.push(newline);
                  for (i = 0, iz = stmt.specifiers.length; i < iz; ++i) {
                    result.push(indent2);
                    result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                    if (i + 1 < iz) {
                      result.push("," + newline);
                    }
                  }
                });
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                  result.push(newline);
                }
                result.push(base + "}");
              }
              if (stmt.source) {
                result = join(result, [
                  "from" + space,
                  // ModuleSpecifier
                  this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                  this.semicolon(flags)
                ]);
              } else {
                result.push(this.semicolon(flags));
              }
            }
            return result;
          },
          ExportAllDeclaration: function(stmt, flags) {
            return [
              "export" + space,
              "*" + space,
              "from" + space,
              // ModuleSpecifier
              this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
              this.semicolon(flags)
            ];
          },
          ExpressionStatement: function(stmt, flags) {
            var result, fragment;
            function isClassPrefixed(fragment2) {
              var code;
              if (fragment2.slice(0, 5) !== "class") {
                return false;
              }
              code = fragment2.charCodeAt(5);
              return code === 123 || esutils.code.isWhiteSpace(code) || esutils.code.isLineTerminator(code);
            }
            function isFunctionPrefixed(fragment2) {
              var code;
              if (fragment2.slice(0, 8) !== "function") {
                return false;
              }
              code = fragment2.charCodeAt(8);
              return code === 40 || esutils.code.isWhiteSpace(code) || code === 42 || esutils.code.isLineTerminator(code);
            }
            function isAsyncPrefixed(fragment2) {
              var code, i, iz;
              if (fragment2.slice(0, 5) !== "async") {
                return false;
              }
              if (!esutils.code.isWhiteSpace(fragment2.charCodeAt(5))) {
                return false;
              }
              for (i = 6, iz = fragment2.length; i < iz; ++i) {
                if (!esutils.code.isWhiteSpace(fragment2.charCodeAt(i))) {
                  break;
                }
              }
              if (i === iz) {
                return false;
              }
              if (fragment2.slice(i, i + 8) !== "function") {
                return false;
              }
              code = fragment2.charCodeAt(i + 8);
              return code === 40 || esutils.code.isWhiteSpace(code) || code === 42 || esutils.code.isLineTerminator(code);
            }
            result = [this.generateExpression(stmt.expression, Precedence.Sequence, E_TTT)];
            fragment = toSourceNodeWhenNeeded(result).toString();
            if (fragment.charCodeAt(0) === 123 || // ObjectExpression
            isClassPrefixed(fragment) || isFunctionPrefixed(fragment) || isAsyncPrefixed(fragment) || directive && flags & F_DIRECTIVE_CTX && stmt.expression.type === Syntax.Literal && typeof stmt.expression.value === "string") {
              result = ["(", result, ")" + this.semicolon(flags)];
            } else {
              result.push(this.semicolon(flags));
            }
            return result;
          },
          ImportDeclaration: function(stmt, flags) {
            var result, cursor, that = this;
            if (stmt.specifiers.length === 0) {
              return [
                "import",
                space,
                // ModuleSpecifier
                this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                this.semicolon(flags)
              ];
            }
            result = [
              "import"
            ];
            cursor = 0;
            if (stmt.specifiers[cursor].type === Syntax.ImportDefaultSpecifier) {
              result = join(result, [
                this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
              ]);
              ++cursor;
            }
            if (stmt.specifiers[cursor]) {
              if (cursor !== 0) {
                result.push(",");
              }
              if (stmt.specifiers[cursor].type === Syntax.ImportNamespaceSpecifier) {
                result = join(result, [
                  space,
                  this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
                ]);
              } else {
                result.push(space + "{");
                if (stmt.specifiers.length - cursor === 1) {
                  result.push(space);
                  result.push(this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT));
                  result.push(space + "}" + space);
                } else {
                  withIndent(function(indent2) {
                    var i, iz;
                    result.push(newline);
                    for (i = cursor, iz = stmt.specifiers.length; i < iz; ++i) {
                      result.push(indent2);
                      result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                      if (i + 1 < iz) {
                        result.push("," + newline);
                      }
                    }
                  });
                  if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result.push(newline);
                  }
                  result.push(base + "}" + space);
                }
              }
            }
            result = join(result, [
              "from" + space,
              // ModuleSpecifier
              this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
              this.semicolon(flags)
            ]);
            return result;
          },
          VariableDeclarator: function(stmt, flags) {
            var itemFlags = flags & F_ALLOW_IN ? E_TTT : E_FTT;
            if (stmt.init) {
              return [
                this.generateExpression(stmt.id, Precedence.Assignment, itemFlags),
                space,
                "=",
                space,
                this.generateExpression(stmt.init, Precedence.Assignment, itemFlags)
              ];
            }
            return this.generatePattern(stmt.id, Precedence.Assignment, itemFlags);
          },
          VariableDeclaration: function(stmt, flags) {
            var result, i, iz, node, bodyFlags, that = this;
            result = [stmt.kind];
            bodyFlags = flags & F_ALLOW_IN ? S_TFFF : S_FFFF;
            function block() {
              node = stmt.declarations[0];
              if (extra.comment && node.leadingComments) {
                result.push("\n");
                result.push(addIndent(that.generateStatement(node, bodyFlags)));
              } else {
                result.push(noEmptySpace());
                result.push(that.generateStatement(node, bodyFlags));
              }
              for (i = 1, iz = stmt.declarations.length; i < iz; ++i) {
                node = stmt.declarations[i];
                if (extra.comment && node.leadingComments) {
                  result.push("," + newline);
                  result.push(addIndent(that.generateStatement(node, bodyFlags)));
                } else {
                  result.push("," + space);
                  result.push(that.generateStatement(node, bodyFlags));
                }
              }
            }
            if (stmt.declarations.length > 1) {
              withIndent(block);
            } else {
              block();
            }
            result.push(this.semicolon(flags));
            return result;
          },
          ThrowStatement: function(stmt, flags) {
            return [join(
              "throw",
              this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
            ), this.semicolon(flags)];
          },
          TryStatement: function(stmt, flags) {
            var result, i, iz, guardedHandlers;
            result = ["try", this.maybeBlock(stmt.block, S_TFFF)];
            result = this.maybeBlockSuffix(stmt.block, result);
            if (stmt.handlers) {
              for (i = 0, iz = stmt.handlers.length; i < iz; ++i) {
                result = join(result, this.generateStatement(stmt.handlers[i], S_TFFF));
                if (stmt.finalizer || i + 1 !== iz) {
                  result = this.maybeBlockSuffix(stmt.handlers[i].body, result);
                }
              }
            } else {
              guardedHandlers = stmt.guardedHandlers || [];
              for (i = 0, iz = guardedHandlers.length; i < iz; ++i) {
                result = join(result, this.generateStatement(guardedHandlers[i], S_TFFF));
                if (stmt.finalizer || i + 1 !== iz) {
                  result = this.maybeBlockSuffix(guardedHandlers[i].body, result);
                }
              }
              if (stmt.handler) {
                if (Array.isArray(stmt.handler)) {
                  for (i = 0, iz = stmt.handler.length; i < iz; ++i) {
                    result = join(result, this.generateStatement(stmt.handler[i], S_TFFF));
                    if (stmt.finalizer || i + 1 !== iz) {
                      result = this.maybeBlockSuffix(stmt.handler[i].body, result);
                    }
                  }
                } else {
                  result = join(result, this.generateStatement(stmt.handler, S_TFFF));
                  if (stmt.finalizer) {
                    result = this.maybeBlockSuffix(stmt.handler.body, result);
                  }
                }
              }
            }
            if (stmt.finalizer) {
              result = join(result, ["finally", this.maybeBlock(stmt.finalizer, S_TFFF)]);
            }
            return result;
          },
          SwitchStatement: function(stmt, flags) {
            var result, fragment, i, iz, bodyFlags, that = this;
            withIndent(function() {
              result = [
                "switch" + space + "(",
                that.generateExpression(stmt.discriminant, Precedence.Sequence, E_TTT),
                ")" + space + "{" + newline
              ];
            });
            if (stmt.cases) {
              bodyFlags = S_TFFF;
              for (i = 0, iz = stmt.cases.length; i < iz; ++i) {
                if (i === iz - 1) {
                  bodyFlags |= F_SEMICOLON_OPT;
                }
                fragment = addIndent(this.generateStatement(stmt.cases[i], bodyFlags));
                result.push(fragment);
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                  result.push(newline);
                }
              }
            }
            result.push(addIndent("}"));
            return result;
          },
          SwitchCase: function(stmt, flags) {
            var result, fragment, i, iz, bodyFlags, that = this;
            withIndent(function() {
              if (stmt.test) {
                result = [
                  join("case", that.generateExpression(stmt.test, Precedence.Sequence, E_TTT)),
                  ":"
                ];
              } else {
                result = ["default:"];
              }
              i = 0;
              iz = stmt.consequent.length;
              if (iz && stmt.consequent[0].type === Syntax.BlockStatement) {
                fragment = that.maybeBlock(stmt.consequent[0], S_TFFF);
                result.push(fragment);
                i = 1;
              }
              if (i !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
              }
              bodyFlags = S_TFFF;
              for (; i < iz; ++i) {
                if (i === iz - 1 && flags & F_SEMICOLON_OPT) {
                  bodyFlags |= F_SEMICOLON_OPT;
                }
                fragment = addIndent(that.generateStatement(stmt.consequent[i], bodyFlags));
                result.push(fragment);
                if (i + 1 !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                  result.push(newline);
                }
              }
            });
            return result;
          },
          IfStatement: function(stmt, flags) {
            var result, bodyFlags, semicolonOptional, that = this;
            withIndent(function() {
              result = [
                "if" + space + "(",
                that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                ")"
              ];
            });
            semicolonOptional = flags & F_SEMICOLON_OPT;
            bodyFlags = S_TFFF;
            if (semicolonOptional) {
              bodyFlags |= F_SEMICOLON_OPT;
            }
            if (stmt.alternate) {
              result.push(this.maybeBlock(stmt.consequent, S_TFFF));
              result = this.maybeBlockSuffix(stmt.consequent, result);
              if (stmt.alternate.type === Syntax.IfStatement) {
                result = join(result, ["else ", this.generateStatement(stmt.alternate, bodyFlags)]);
              } else {
                result = join(result, join("else", this.maybeBlock(stmt.alternate, bodyFlags)));
              }
            } else {
              result.push(this.maybeBlock(stmt.consequent, bodyFlags));
            }
            return result;
          },
          ForStatement: function(stmt, flags) {
            var result, that = this;
            withIndent(function() {
              result = ["for" + space + "("];
              if (stmt.init) {
                if (stmt.init.type === Syntax.VariableDeclaration) {
                  result.push(that.generateStatement(stmt.init, S_FFFF));
                } else {
                  result.push(that.generateExpression(stmt.init, Precedence.Sequence, E_FTT));
                  result.push(";");
                }
              } else {
                result.push(";");
              }
              if (stmt.test) {
                result.push(space);
                result.push(that.generateExpression(stmt.test, Precedence.Sequence, E_TTT));
                result.push(";");
              } else {
                result.push(";");
              }
              if (stmt.update) {
                result.push(space);
                result.push(that.generateExpression(stmt.update, Precedence.Sequence, E_TTT));
                result.push(")");
              } else {
                result.push(")");
              }
            });
            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result;
          },
          ForInStatement: function(stmt, flags) {
            return this.generateIterationForStatement("in", stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
          },
          ForOfStatement: function(stmt, flags) {
            return this.generateIterationForStatement("of", stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
          },
          LabeledStatement: function(stmt, flags) {
            return [stmt.label.name + ":", this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)];
          },
          Program: function(stmt, flags) {
            var result, fragment, i, iz, bodyFlags;
            iz = stmt.body.length;
            result = [safeConcatenation && iz > 0 ? "\n" : ""];
            bodyFlags = S_TFTF;
            for (i = 0; i < iz; ++i) {
              if (!safeConcatenation && i === iz - 1) {
                bodyFlags |= F_SEMICOLON_OPT;
              }
              if (preserveBlankLines) {
                if (i === 0) {
                  if (!stmt.body[0].leadingComments) {
                    generateBlankLines(stmt.range[0], stmt.body[i].range[0], result);
                  }
                }
                if (i > 0) {
                  if (!stmt.body[i - 1].trailingComments && !stmt.body[i].leadingComments) {
                    generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
                  }
                }
              }
              fragment = addIndent(this.generateStatement(stmt.body[i], bodyFlags));
              result.push(fragment);
              if (i + 1 < iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                if (preserveBlankLines) {
                  if (!stmt.body[i + 1].leadingComments) {
                    result.push(newline);
                  }
                } else {
                  result.push(newline);
                }
              }
              if (preserveBlankLines) {
                if (i === iz - 1) {
                  if (!stmt.body[i].trailingComments) {
                    generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
                  }
                }
              }
            }
            return result;
          },
          FunctionDeclaration: function(stmt, flags) {
            return [
              generateAsyncPrefix(stmt, true),
              "function",
              generateStarSuffix(stmt) || noEmptySpace(),
              stmt.id ? generateIdentifier(stmt.id) : "",
              this.generateFunctionBody(stmt)
            ];
          },
          ReturnStatement: function(stmt, flags) {
            if (stmt.argument) {
              return [join(
                "return",
                this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
              ), this.semicolon(flags)];
            }
            return ["return" + this.semicolon(flags)];
          },
          WhileStatement: function(stmt, flags) {
            var result, that = this;
            withIndent(function() {
              result = [
                "while" + space + "(",
                that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                ")"
              ];
            });
            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result;
          },
          WithStatement: function(stmt, flags) {
            var result, that = this;
            withIndent(function() {
              result = [
                "with" + space + "(",
                that.generateExpression(stmt.object, Precedence.Sequence, E_TTT),
                ")"
              ];
            });
            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result;
          }
        };
        merge(CodeGenerator.prototype, CodeGenerator.Statement);
        CodeGenerator.Expression = {
          SequenceExpression: function(expr, precedence, flags) {
            var result, i, iz;
            if (Precedence.Sequence < precedence) {
              flags |= F_ALLOW_IN;
            }
            result = [];
            for (i = 0, iz = expr.expressions.length; i < iz; ++i) {
              result.push(this.generateExpression(expr.expressions[i], Precedence.Assignment, flags));
              if (i + 1 < iz) {
                result.push("," + space);
              }
            }
            return parenthesize(result, Precedence.Sequence, precedence);
          },
          AssignmentExpression: function(expr, precedence, flags) {
            return this.generateAssignment(expr.left, expr.right, expr.operator, precedence, flags);
          },
          ArrowFunctionExpression: function(expr, precedence, flags) {
            return parenthesize(this.generateFunctionBody(expr), Precedence.ArrowFunction, precedence);
          },
          ConditionalExpression: function(expr, precedence, flags) {
            if (Precedence.Conditional < precedence) {
              flags |= F_ALLOW_IN;
            }
            return parenthesize(
              [
                this.generateExpression(expr.test, Precedence.Coalesce, flags),
                space + "?" + space,
                this.generateExpression(expr.consequent, Precedence.Assignment, flags),
                space + ":" + space,
                this.generateExpression(expr.alternate, Precedence.Assignment, flags)
              ],
              Precedence.Conditional,
              precedence
            );
          },
          LogicalExpression: function(expr, precedence, flags) {
            if (expr.operator === "??") {
              flags |= F_FOUND_COALESCE;
            }
            return this.BinaryExpression(expr, precedence, flags);
          },
          BinaryExpression: function(expr, precedence, flags) {
            var result, leftPrecedence, rightPrecedence, currentPrecedence, fragment, leftSource;
            currentPrecedence = BinaryPrecedence[expr.operator];
            leftPrecedence = expr.operator === "**" ? Precedence.Postfix : currentPrecedence;
            rightPrecedence = expr.operator === "**" ? currentPrecedence : currentPrecedence + 1;
            if (currentPrecedence < precedence) {
              flags |= F_ALLOW_IN;
            }
            fragment = this.generateExpression(expr.left, leftPrecedence, flags);
            leftSource = fragment.toString();
            if (leftSource.charCodeAt(leftSource.length - 1) === 47 && esutils.code.isIdentifierPartES5(expr.operator.charCodeAt(0))) {
              result = [fragment, noEmptySpace(), expr.operator];
            } else {
              result = join(fragment, expr.operator);
            }
            fragment = this.generateExpression(expr.right, rightPrecedence, flags);
            if (expr.operator === "/" && fragment.toString().charAt(0) === "/" || expr.operator.slice(-1) === "<" && fragment.toString().slice(0, 3) === "!--") {
              result.push(noEmptySpace());
              result.push(fragment);
            } else {
              result = join(result, fragment);
            }
            if (expr.operator === "in" && !(flags & F_ALLOW_IN)) {
              return ["(", result, ")"];
            }
            if ((expr.operator === "||" || expr.operator === "&&") && flags & F_FOUND_COALESCE) {
              return ["(", result, ")"];
            }
            return parenthesize(result, currentPrecedence, precedence);
          },
          CallExpression: function(expr, precedence, flags) {
            var result, i, iz;
            result = [this.generateExpression(expr.callee, Precedence.Call, E_TTF)];
            if (expr.optional) {
              result.push("?.");
            }
            result.push("(");
            for (i = 0, iz = expr["arguments"].length; i < iz; ++i) {
              result.push(this.generateExpression(expr["arguments"][i], Precedence.Assignment, E_TTT));
              if (i + 1 < iz) {
                result.push("," + space);
              }
            }
            result.push(")");
            if (!(flags & F_ALLOW_CALL)) {
              return ["(", result, ")"];
            }
            return parenthesize(result, Precedence.Call, precedence);
          },
          ChainExpression: function(expr, precedence, flags) {
            if (Precedence.OptionalChaining < precedence) {
              flags |= F_ALLOW_CALL;
            }
            var result = this.generateExpression(expr.expression, Precedence.OptionalChaining, flags);
            return parenthesize(result, Precedence.OptionalChaining, precedence);
          },
          NewExpression: function(expr, precedence, flags) {
            var result, length, i, iz, itemFlags;
            length = expr["arguments"].length;
            itemFlags = flags & F_ALLOW_UNPARATH_NEW && !parentheses && length === 0 ? E_TFT : E_TFF;
            result = join(
              "new",
              this.generateExpression(expr.callee, Precedence.New, itemFlags)
            );
            if (!(flags & F_ALLOW_UNPARATH_NEW) || parentheses || length > 0) {
              result.push("(");
              for (i = 0, iz = length; i < iz; ++i) {
                result.push(this.generateExpression(expr["arguments"][i], Precedence.Assignment, E_TTT));
                if (i + 1 < iz) {
                  result.push("," + space);
                }
              }
              result.push(")");
            }
            return parenthesize(result, Precedence.New, precedence);
          },
          MemberExpression: function(expr, precedence, flags) {
            var result, fragment;
            result = [this.generateExpression(expr.object, Precedence.Call, flags & F_ALLOW_CALL ? E_TTF : E_TFF)];
            if (expr.computed) {
              if (expr.optional) {
                result.push("?.");
              }
              result.push("[");
              result.push(this.generateExpression(expr.property, Precedence.Sequence, flags & F_ALLOW_CALL ? E_TTT : E_TFT));
              result.push("]");
            } else {
              if (!expr.optional && expr.object.type === Syntax.Literal && typeof expr.object.value === "number") {
                fragment = toSourceNodeWhenNeeded(result).toString();
                if (fragment.indexOf(".") < 0 && !/[eExX]/.test(fragment) && esutils.code.isDecimalDigit(fragment.charCodeAt(fragment.length - 1)) && !(fragment.length >= 2 && fragment.charCodeAt(0) === 48)) {
                  result.push(" ");
                }
              }
              result.push(expr.optional ? "?." : ".");
              result.push(generateIdentifier(expr.property));
            }
            return parenthesize(result, Precedence.Member, precedence);
          },
          MetaProperty: function(expr, precedence, flags) {
            var result;
            result = [];
            result.push(typeof expr.meta === "string" ? expr.meta : generateIdentifier(expr.meta));
            result.push(".");
            result.push(typeof expr.property === "string" ? expr.property : generateIdentifier(expr.property));
            return parenthesize(result, Precedence.Member, precedence);
          },
          UnaryExpression: function(expr, precedence, flags) {
            var result, fragment, rightCharCode, leftSource, leftCharCode;
            fragment = this.generateExpression(expr.argument, Precedence.Unary, E_TTT);
            if (space === "") {
              result = join(expr.operator, fragment);
            } else {
              result = [expr.operator];
              if (expr.operator.length > 2) {
                result = join(result, fragment);
              } else {
                leftSource = toSourceNodeWhenNeeded(result).toString();
                leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
                rightCharCode = fragment.toString().charCodeAt(0);
                if ((leftCharCode === 43 || leftCharCode === 45) && leftCharCode === rightCharCode || esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode)) {
                  result.push(noEmptySpace());
                  result.push(fragment);
                } else {
                  result.push(fragment);
                }
              }
            }
            return parenthesize(result, Precedence.Unary, precedence);
          },
          YieldExpression: function(expr, precedence, flags) {
            var result;
            if (expr.delegate) {
              result = "yield*";
            } else {
              result = "yield";
            }
            if (expr.argument) {
              result = join(
                result,
                this.generateExpression(expr.argument, Precedence.Yield, E_TTT)
              );
            }
            return parenthesize(result, Precedence.Yield, precedence);
          },
          AwaitExpression: function(expr, precedence, flags) {
            var result = join(
              expr.all ? "await*" : "await",
              this.generateExpression(expr.argument, Precedence.Await, E_TTT)
            );
            return parenthesize(result, Precedence.Await, precedence);
          },
          UpdateExpression: function(expr, precedence, flags) {
            if (expr.prefix) {
              return parenthesize(
                [
                  expr.operator,
                  this.generateExpression(expr.argument, Precedence.Unary, E_TTT)
                ],
                Precedence.Unary,
                precedence
              );
            }
            return parenthesize(
              [
                this.generateExpression(expr.argument, Precedence.Postfix, E_TTT),
                expr.operator
              ],
              Precedence.Postfix,
              precedence
            );
          },
          FunctionExpression: function(expr, precedence, flags) {
            var result = [
              generateAsyncPrefix(expr, true),
              "function"
            ];
            if (expr.id) {
              result.push(generateStarSuffix(expr) || noEmptySpace());
              result.push(generateIdentifier(expr.id));
            } else {
              result.push(generateStarSuffix(expr) || space);
            }
            result.push(this.generateFunctionBody(expr));
            return result;
          },
          ArrayPattern: function(expr, precedence, flags) {
            return this.ArrayExpression(expr, precedence, flags, true);
          },
          ArrayExpression: function(expr, precedence, flags, isPattern) {
            var result, multiline, that = this;
            if (!expr.elements.length) {
              return "[]";
            }
            multiline = isPattern ? false : expr.elements.length > 1;
            result = ["[", multiline ? newline : ""];
            withIndent(function(indent2) {
              var i, iz;
              for (i = 0, iz = expr.elements.length; i < iz; ++i) {
                if (!expr.elements[i]) {
                  if (multiline) {
                    result.push(indent2);
                  }
                  if (i + 1 === iz) {
                    result.push(",");
                  }
                } else {
                  result.push(multiline ? indent2 : "");
                  result.push(that.generateExpression(expr.elements[i], Precedence.Assignment, E_TTT));
                }
                if (i + 1 < iz) {
                  result.push("," + (multiline ? newline : space));
                }
              }
            });
            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
              result.push(newline);
            }
            result.push(multiline ? base : "");
            result.push("]");
            return result;
          },
          RestElement: function(expr, precedence, flags) {
            return "..." + this.generatePattern(expr.argument);
          },
          ClassExpression: function(expr, precedence, flags) {
            var result, fragment;
            result = ["class"];
            if (expr.id) {
              result = join(result, this.generateExpression(expr.id, Precedence.Sequence, E_TTT));
            }
            if (expr.superClass) {
              fragment = join("extends", this.generateExpression(expr.superClass, Precedence.Unary, E_TTT));
              result = join(result, fragment);
            }
            result.push(space);
            result.push(this.generateStatement(expr.body, S_TFFT));
            return result;
          },
          MethodDefinition: function(expr, precedence, flags) {
            var result, fragment;
            if (expr["static"]) {
              result = ["static" + space];
            } else {
              result = [];
            }
            if (expr.kind === "get" || expr.kind === "set") {
              fragment = [
                join(expr.kind, this.generatePropertyKey(expr.key, expr.computed)),
                this.generateFunctionBody(expr.value)
              ];
            } else {
              fragment = [
                generateMethodPrefix(expr),
                this.generatePropertyKey(expr.key, expr.computed),
                this.generateFunctionBody(expr.value)
              ];
            }
            return join(result, fragment);
          },
          Property: function(expr, precedence, flags) {
            if (expr.kind === "get" || expr.kind === "set") {
              return [
                expr.kind,
                noEmptySpace(),
                this.generatePropertyKey(expr.key, expr.computed),
                this.generateFunctionBody(expr.value)
              ];
            }
            if (expr.shorthand) {
              if (expr.value.type === "AssignmentPattern") {
                return this.AssignmentPattern(expr.value, Precedence.Sequence, E_TTT);
              }
              return this.generatePropertyKey(expr.key, expr.computed);
            }
            if (expr.method) {
              return [
                generateMethodPrefix(expr),
                this.generatePropertyKey(expr.key, expr.computed),
                this.generateFunctionBody(expr.value)
              ];
            }
            return [
              this.generatePropertyKey(expr.key, expr.computed),
              ":" + space,
              this.generateExpression(expr.value, Precedence.Assignment, E_TTT)
            ];
          },
          ObjectExpression: function(expr, precedence, flags) {
            var multiline, result, fragment, that = this;
            if (!expr.properties.length) {
              return "{}";
            }
            multiline = expr.properties.length > 1;
            withIndent(function() {
              fragment = that.generateExpression(expr.properties[0], Precedence.Sequence, E_TTT);
            });
            if (!multiline) {
              if (!hasLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                return ["{", space, fragment, space, "}"];
              }
            }
            withIndent(function(indent2) {
              var i, iz;
              result = ["{", newline, indent2, fragment];
              if (multiline) {
                result.push("," + newline);
                for (i = 1, iz = expr.properties.length; i < iz; ++i) {
                  result.push(indent2);
                  result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
                  if (i + 1 < iz) {
                    result.push("," + newline);
                  }
                }
              }
            });
            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
              result.push(newline);
            }
            result.push(base);
            result.push("}");
            return result;
          },
          AssignmentPattern: function(expr, precedence, flags) {
            return this.generateAssignment(expr.left, expr.right, "=", precedence, flags);
          },
          ObjectPattern: function(expr, precedence, flags) {
            var result, i, iz, multiline, property, that = this;
            if (!expr.properties.length) {
              return "{}";
            }
            multiline = false;
            if (expr.properties.length === 1) {
              property = expr.properties[0];
              if (property.type === Syntax.Property && property.value.type !== Syntax.Identifier) {
                multiline = true;
              }
            } else {
              for (i = 0, iz = expr.properties.length; i < iz; ++i) {
                property = expr.properties[i];
                if (property.type === Syntax.Property && !property.shorthand) {
                  multiline = true;
                  break;
                }
              }
            }
            result = ["{", multiline ? newline : ""];
            withIndent(function(indent2) {
              var i2, iz2;
              for (i2 = 0, iz2 = expr.properties.length; i2 < iz2; ++i2) {
                result.push(multiline ? indent2 : "");
                result.push(that.generateExpression(expr.properties[i2], Precedence.Sequence, E_TTT));
                if (i2 + 1 < iz2) {
                  result.push("," + (multiline ? newline : space));
                }
              }
            });
            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
              result.push(newline);
            }
            result.push(multiline ? base : "");
            result.push("}");
            return result;
          },
          ThisExpression: function(expr, precedence, flags) {
            return "this";
          },
          Super: function(expr, precedence, flags) {
            return "super";
          },
          Identifier: function(expr, precedence, flags) {
            return generateIdentifier(expr);
          },
          ImportDefaultSpecifier: function(expr, precedence, flags) {
            return generateIdentifier(expr.id || expr.local);
          },
          ImportNamespaceSpecifier: function(expr, precedence, flags) {
            var result = ["*"];
            var id2 = expr.id || expr.local;
            if (id2) {
              result.push(space + "as" + noEmptySpace() + generateIdentifier(id2));
            }
            return result;
          },
          ImportSpecifier: function(expr, precedence, flags) {
            var imported = expr.imported;
            var result = [imported.name];
            var local = expr.local;
            if (local && local.name !== imported.name) {
              result.push(noEmptySpace() + "as" + noEmptySpace() + generateIdentifier(local));
            }
            return result;
          },
          ExportSpecifier: function(expr, precedence, flags) {
            var local = expr.local;
            var result = [local.name];
            var exported = expr.exported;
            if (exported && exported.name !== local.name) {
              result.push(noEmptySpace() + "as" + noEmptySpace() + generateIdentifier(exported));
            }
            return result;
          },
          Literal: function(expr, precedence, flags) {
            var raw;
            if (expr.hasOwnProperty("raw") && parse5 && extra.raw) {
              try {
                raw = parse5(expr.raw).body[0].expression;
                if (raw.type === Syntax.Literal) {
                  if (raw.value === expr.value) {
                    return expr.raw;
                  }
                }
              } catch (e) {
              }
            }
            if (expr.regex) {
              return "/" + expr.regex.pattern + "/" + expr.regex.flags;
            }
            if (typeof expr.value === "bigint") {
              return expr.value.toString() + "n";
            }
            if (expr.bigint) {
              return expr.bigint + "n";
            }
            if (expr.value === null) {
              return "null";
            }
            if (typeof expr.value === "string") {
              return escapeString(expr.value);
            }
            if (typeof expr.value === "number") {
              return generateNumber(expr.value);
            }
            if (typeof expr.value === "boolean") {
              return expr.value ? "true" : "false";
            }
            return generateRegExp(expr.value);
          },
          GeneratorExpression: function(expr, precedence, flags) {
            return this.ComprehensionExpression(expr, precedence, flags);
          },
          ComprehensionExpression: function(expr, precedence, flags) {
            var result, i, iz, fragment, that = this;
            result = expr.type === Syntax.GeneratorExpression ? ["("] : ["["];
            if (extra.moz.comprehensionExpressionStartsWithAssignment) {
              fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);
              result.push(fragment);
            }
            if (expr.blocks) {
              withIndent(function() {
                for (i = 0, iz = expr.blocks.length; i < iz; ++i) {
                  fragment = that.generateExpression(expr.blocks[i], Precedence.Sequence, E_TTT);
                  if (i > 0 || extra.moz.comprehensionExpressionStartsWithAssignment) {
                    result = join(result, fragment);
                  } else {
                    result.push(fragment);
                  }
                }
              });
            }
            if (expr.filter) {
              result = join(result, "if" + space);
              fragment = this.generateExpression(expr.filter, Precedence.Sequence, E_TTT);
              result = join(result, ["(", fragment, ")"]);
            }
            if (!extra.moz.comprehensionExpressionStartsWithAssignment) {
              fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);
              result = join(result, fragment);
            }
            result.push(expr.type === Syntax.GeneratorExpression ? ")" : "]");
            return result;
          },
          ComprehensionBlock: function(expr, precedence, flags) {
            var fragment;
            if (expr.left.type === Syntax.VariableDeclaration) {
              fragment = [
                expr.left.kind,
                noEmptySpace(),
                this.generateStatement(expr.left.declarations[0], S_FFFF)
              ];
            } else {
              fragment = this.generateExpression(expr.left, Precedence.Call, E_TTT);
            }
            fragment = join(fragment, expr.of ? "of" : "in");
            fragment = join(fragment, this.generateExpression(expr.right, Precedence.Sequence, E_TTT));
            return ["for" + space + "(", fragment, ")"];
          },
          SpreadElement: function(expr, precedence, flags) {
            return [
              "...",
              this.generateExpression(expr.argument, Precedence.Assignment, E_TTT)
            ];
          },
          TaggedTemplateExpression: function(expr, precedence, flags) {
            var itemFlags = E_TTF;
            if (!(flags & F_ALLOW_CALL)) {
              itemFlags = E_TFF;
            }
            var result = [
              this.generateExpression(expr.tag, Precedence.Call, itemFlags),
              this.generateExpression(expr.quasi, Precedence.Primary, E_FFT)
            ];
            return parenthesize(result, Precedence.TaggedTemplate, precedence);
          },
          TemplateElement: function(expr, precedence, flags) {
            return expr.value.raw;
          },
          TemplateLiteral: function(expr, precedence, flags) {
            var result, i, iz;
            result = ["`"];
            for (i = 0, iz = expr.quasis.length; i < iz; ++i) {
              result.push(this.generateExpression(expr.quasis[i], Precedence.Primary, E_TTT));
              if (i + 1 < iz) {
                result.push("${" + space);
                result.push(this.generateExpression(expr.expressions[i], Precedence.Sequence, E_TTT));
                result.push(space + "}");
              }
            }
            result.push("`");
            return result;
          },
          ModuleSpecifier: function(expr, precedence, flags) {
            return this.Literal(expr, precedence, flags);
          },
          ImportExpression: function(expr, precedence, flag) {
            return parenthesize([
              "import(",
              this.generateExpression(expr.source, Precedence.Assignment, E_TTT),
              ")"
            ], Precedence.Call, precedence);
          }
        };
        merge(CodeGenerator.prototype, CodeGenerator.Expression);
        CodeGenerator.prototype.generateExpression = function(expr, precedence, flags) {
          var result, type;
          type = expr.type || Syntax.Property;
          if (extra.verbatim && expr.hasOwnProperty(extra.verbatim)) {
            return generateVerbatim(expr, precedence);
          }
          result = this[type](expr, precedence, flags);
          if (extra.comment) {
            result = addComments(expr, result);
          }
          return toSourceNodeWhenNeeded(result, expr);
        };
        CodeGenerator.prototype.generateStatement = function(stmt, flags) {
          var result, fragment;
          result = this[stmt.type](stmt, flags);
          if (extra.comment) {
            result = addComments(stmt, result);
          }
          fragment = toSourceNodeWhenNeeded(result).toString();
          if (stmt.type === Syntax.Program && !safeConcatenation && newline === "" && fragment.charAt(fragment.length - 1) === "\n") {
            result = sourceMap ? toSourceNodeWhenNeeded(result).replaceRight(/\s+$/, "") : fragment.replace(/\s+$/, "");
          }
          return toSourceNodeWhenNeeded(result, stmt);
        };
        function generateInternal(node) {
          var codegen;
          codegen = new CodeGenerator();
          if (isStatement(node)) {
            return codegen.generateStatement(node, S_TFFF);
          }
          if (isExpression(node)) {
            return codegen.generateExpression(node, Precedence.Sequence, E_TTT);
          }
          throw new Error("Unknown node type: " + node.type);
        }
        function generate(node, options) {
          var defaultOptions2 = getDefaultOptions(), result, pair;
          if (options != null) {
            if (typeof options.indent === "string") {
              defaultOptions2.format.indent.style = options.indent;
            }
            if (typeof options.base === "number") {
              defaultOptions2.format.indent.base = options.base;
            }
            options = updateDeeply(defaultOptions2, options);
            indent = options.format.indent.style;
            if (typeof options.base === "string") {
              base = options.base;
            } else {
              base = stringRepeat(indent, options.format.indent.base);
            }
          } else {
            options = defaultOptions2;
            indent = options.format.indent.style;
            base = stringRepeat(indent, options.format.indent.base);
          }
          json = options.format.json;
          renumber = options.format.renumber;
          hexadecimal = json ? false : options.format.hexadecimal;
          quotes = json ? "double" : options.format.quotes;
          escapeless = options.format.escapeless;
          newline = options.format.newline;
          space = options.format.space;
          if (options.format.compact) {
            newline = space = indent = base = "";
          }
          parentheses = options.format.parentheses;
          semicolons = options.format.semicolons;
          safeConcatenation = options.format.safeConcatenation;
          directive = options.directive;
          parse5 = json ? null : options.parse;
          sourceMap = options.sourceMap;
          sourceCode = options.sourceCode;
          preserveBlankLines = options.format.preserveBlankLines && sourceCode !== null;
          extra = options;
          if (sourceMap) {
            if (!exports.browser) {
              SourceNode = require_source_map().SourceNode;
            } else {
              SourceNode = global.sourceMap.SourceNode;
            }
          }
          result = generateInternal(node);
          if (!sourceMap) {
            pair = { code: result.toString(), map: null };
            return options.sourceMapWithCode ? pair : pair.code;
          }
          pair = result.toStringWithSourceMap({
            file: options.file,
            sourceRoot: options.sourceMapRoot
          });
          if (options.sourceContent) {
            pair.map.setSourceContent(
              options.sourceMap,
              options.sourceContent
            );
          }
          if (options.sourceMapWithCode) {
            return pair;
          }
          return pair.map.toString();
        }
        FORMAT_MINIFY = {
          indent: {
            style: "",
            base: 0
          },
          renumber: true,
          hexadecimal: true,
          quotes: "auto",
          escapeless: true,
          compact: true,
          parentheses: false,
          semicolons: false
        };
        FORMAT_DEFAULTS = getDefaultOptions().format;
        exports.version = require_package().version;
        exports.generate = generate;
        exports.attachComments = estraverse.attachComments;
        exports.Precedence = updateDeeply({}, Precedence);
        exports.browser = false;
        exports.FORMAT_MINIFY = FORMAT_MINIFY;
        exports.FORMAT_DEFAULTS = FORMAT_DEFAULTS;
      })();
    }
  });

  // node_modules/fraction.js/fraction.js
  var MAX_CYCLE_LEN = 2e3;
  var P = {
    "s": 1,
    "n": 0,
    "d": 1
  };
  function assign(n, s2) {
    if (isNaN(n = parseInt(n, 10))) {
      throw InvalidParameter();
    }
    return n * s2;
  }
  function newFraction(n, d2) {
    if (d2 === 0) {
      throw DivisionByZero();
    }
    var f3 = Object.create(Fraction.prototype);
    f3["s"] = n < 0 ? -1 : 1;
    n = n < 0 ? -n : n;
    var a2 = gcd(n, d2);
    f3["n"] = n / a2;
    f3["d"] = d2 / a2;
    return f3;
  }
  function factorize(num) {
    var factors = {};
    var n = num;
    var i = 2;
    var s2 = 4;
    while (s2 <= n) {
      while (n % i === 0) {
        n /= i;
        factors[i] = (factors[i] || 0) + 1;
      }
      s2 += 1 + 2 * i++;
    }
    if (n !== num) {
      if (n > 1)
        factors[n] = (factors[n] || 0) + 1;
    } else {
      factors[num] = (factors[num] || 0) + 1;
    }
    return factors;
  }
  var parse = function(p1, p2) {
    var n = 0, d2 = 1, s2 = 1;
    var v = 0, w3 = 0, x2 = 0, y2 = 1, z4 = 1;
    var A4 = 0, B4 = 1;
    var C4 = 1, D3 = 1;
    var N4 = 1e7;
    var M2;
    if (p1 === void 0 || p1 === null) {
    } else if (p2 !== void 0) {
      n = p1;
      d2 = p2;
      s2 = n * d2;
      if (n % 1 !== 0 || d2 % 1 !== 0) {
        throw NonIntegerParameter();
      }
    } else
      switch (typeof p1) {
        case "object": {
          if ("d" in p1 && "n" in p1) {
            n = p1["n"];
            d2 = p1["d"];
            if ("s" in p1)
              n *= p1["s"];
          } else if (0 in p1) {
            n = p1[0];
            if (1 in p1)
              d2 = p1[1];
          } else {
            throw InvalidParameter();
          }
          s2 = n * d2;
          break;
        }
        case "number": {
          if (p1 < 0) {
            s2 = p1;
            p1 = -p1;
          }
          if (p1 % 1 === 0) {
            n = p1;
          } else if (p1 > 0) {
            if (p1 >= 1) {
              z4 = Math.pow(10, Math.floor(1 + Math.log(p1) / Math.LN10));
              p1 /= z4;
            }
            while (B4 <= N4 && D3 <= N4) {
              M2 = (A4 + C4) / (B4 + D3);
              if (p1 === M2) {
                if (B4 + D3 <= N4) {
                  n = A4 + C4;
                  d2 = B4 + D3;
                } else if (D3 > B4) {
                  n = C4;
                  d2 = D3;
                } else {
                  n = A4;
                  d2 = B4;
                }
                break;
              } else {
                if (p1 > M2) {
                  A4 += C4;
                  B4 += D3;
                } else {
                  C4 += A4;
                  D3 += B4;
                }
                if (B4 > N4) {
                  n = C4;
                  d2 = D3;
                } else {
                  n = A4;
                  d2 = B4;
                }
              }
            }
            n *= z4;
          } else if (isNaN(p1) || isNaN(p2)) {
            d2 = n = NaN;
          }
          break;
        }
        case "string": {
          B4 = p1.match(/\d+|./g);
          if (B4 === null)
            throw InvalidParameter();
          if (B4[A4] === "-") {
            s2 = -1;
            A4++;
          } else if (B4[A4] === "+") {
            A4++;
          }
          if (B4.length === A4 + 1) {
            w3 = assign(B4[A4++], s2);
          } else if (B4[A4 + 1] === "." || B4[A4] === ".") {
            if (B4[A4] !== ".") {
              v = assign(B4[A4++], s2);
            }
            A4++;
            if (A4 + 1 === B4.length || B4[A4 + 1] === "(" && B4[A4 + 3] === ")" || B4[A4 + 1] === "'" && B4[A4 + 3] === "'") {
              w3 = assign(B4[A4], s2);
              y2 = Math.pow(10, B4[A4].length);
              A4++;
            }
            if (B4[A4] === "(" && B4[A4 + 2] === ")" || B4[A4] === "'" && B4[A4 + 2] === "'") {
              x2 = assign(B4[A4 + 1], s2);
              z4 = Math.pow(10, B4[A4 + 1].length) - 1;
              A4 += 3;
            }
          } else if (B4[A4 + 1] === "/" || B4[A4 + 1] === ":") {
            w3 = assign(B4[A4], s2);
            y2 = assign(B4[A4 + 2], 1);
            A4 += 3;
          } else if (B4[A4 + 3] === "/" && B4[A4 + 1] === " ") {
            v = assign(B4[A4], s2);
            w3 = assign(B4[A4 + 2], s2);
            y2 = assign(B4[A4 + 4], 1);
            A4 += 5;
          }
          if (B4.length <= A4) {
            d2 = y2 * z4;
            s2 = /* void */
            n = x2 + d2 * v + z4 * w3;
            break;
          }
        }
        default:
          throw InvalidParameter();
      }
    if (d2 === 0) {
      throw DivisionByZero();
    }
    P["s"] = s2 < 0 ? -1 : 1;
    P["n"] = Math.abs(n);
    P["d"] = Math.abs(d2);
  };
  function modpow(b2, e, m3) {
    var r = 1;
    for (; e > 0; b2 = b2 * b2 % m3, e >>= 1) {
      if (e & 1) {
        r = r * b2 % m3;
      }
    }
    return r;
  }
  function cycleLen(n, d2) {
    for (; d2 % 2 === 0; d2 /= 2) {
    }
    for (; d2 % 5 === 0; d2 /= 5) {
    }
    if (d2 === 1)
      return 0;
    var rem = 10 % d2;
    var t = 1;
    for (; rem !== 1; t++) {
      rem = rem * 10 % d2;
      if (t > MAX_CYCLE_LEN)
        return 0;
    }
    return t;
  }
  function cycleStart(n, d2, len) {
    var rem1 = 1;
    var rem2 = modpow(10, len, d2);
    for (var t = 0; t < 300; t++) {
      if (rem1 === rem2)
        return t;
      rem1 = rem1 * 10 % d2;
      rem2 = rem2 * 10 % d2;
    }
    return 0;
  }
  function gcd(a2, b2) {
    if (!a2)
      return b2;
    if (!b2)
      return a2;
    while (1) {
      a2 %= b2;
      if (!a2)
        return b2;
      b2 %= a2;
      if (!b2)
        return a2;
    }
  }
  function Fraction(a2, b2) {
    parse(a2, b2);
    if (this instanceof Fraction) {
      a2 = gcd(P["d"], P["n"]);
      this["s"] = P["s"];
      this["n"] = P["n"] / a2;
      this["d"] = P["d"] / a2;
    } else {
      return newFraction(P["s"] * P["n"], P["d"]);
    }
  }
  var DivisionByZero = function() {
    return new Error("Division by Zero");
  };
  var InvalidParameter = function() {
    return new Error("Invalid argument");
  };
  var NonIntegerParameter = function() {
    return new Error("Parameters must be integer");
  };
  Fraction.prototype = {
    "s": 1,
    "n": 0,
    "d": 1,
    /**
     * Calculates the absolute value
     *
     * Ex: new Fraction(-4).abs() => 4
     **/
    "abs": function() {
      return newFraction(this["n"], this["d"]);
    },
    /**
     * Inverts the sign of the current fraction
     *
     * Ex: new Fraction(-4).neg() => 4
     **/
    "neg": function() {
      return newFraction(-this["s"] * this["n"], this["d"]);
    },
    /**
     * Adds two rational numbers
     *
     * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30
     **/
    "add": function(a2, b2) {
      parse(a2, b2);
      return newFraction(
        this["s"] * this["n"] * P["d"] + P["s"] * this["d"] * P["n"],
        this["d"] * P["d"]
      );
    },
    /**
     * Subtracts two rational numbers
     *
     * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
     **/
    "sub": function(a2, b2) {
      parse(a2, b2);
      return newFraction(
        this["s"] * this["n"] * P["d"] - P["s"] * this["d"] * P["n"],
        this["d"] * P["d"]
      );
    },
    /**
     * Multiplies two rational numbers
     *
     * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
     **/
    "mul": function(a2, b2) {
      parse(a2, b2);
      return newFraction(
        this["s"] * P["s"] * this["n"] * P["n"],
        this["d"] * P["d"]
      );
    },
    /**
     * Divides two rational numbers
     *
     * Ex: new Fraction("-17.(345)").inverse().div(3)
     **/
    "div": function(a2, b2) {
      parse(a2, b2);
      return newFraction(
        this["s"] * P["s"] * this["n"] * P["d"],
        this["d"] * P["n"]
      );
    },
    /**
     * Clones the actual object
     *
     * Ex: new Fraction("-17.(345)").clone()
     **/
    "clone": function() {
      return newFraction(this["s"] * this["n"], this["d"]);
    },
    /**
     * Calculates the modulo of two rational numbers - a more precise fmod
     *
     * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)
     **/
    "mod": function(a2, b2) {
      if (isNaN(this["n"]) || isNaN(this["d"])) {
        return new Fraction(NaN);
      }
      if (a2 === void 0) {
        return newFraction(this["s"] * this["n"] % this["d"], 1);
      }
      parse(a2, b2);
      if (0 === P["n"] && 0 === this["d"]) {
        throw DivisionByZero();
      }
      return newFraction(
        this["s"] * (P["d"] * this["n"]) % (P["n"] * this["d"]),
        P["d"] * this["d"]
      );
    },
    /**
     * Calculates the fractional gcd of two rational numbers
     *
     * Ex: new Fraction(5,8).gcd(3,7) => 1/56
     */
    "gcd": function(a2, b2) {
      parse(a2, b2);
      return newFraction(gcd(P["n"], this["n"]) * gcd(P["d"], this["d"]), P["d"] * this["d"]);
    },
    /**
     * Calculates the fractional lcm of two rational numbers
     *
     * Ex: new Fraction(5,8).lcm(3,7) => 15
     */
    "lcm": function(a2, b2) {
      parse(a2, b2);
      if (P["n"] === 0 && this["n"] === 0) {
        return newFraction(0, 1);
      }
      return newFraction(P["n"] * this["n"], gcd(P["n"], this["n"]) * gcd(P["d"], this["d"]));
    },
    /**
     * Calculates the ceil of a rational number
     *
     * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
     **/
    "ceil": function(places) {
      places = Math.pow(10, places || 0);
      if (isNaN(this["n"]) || isNaN(this["d"])) {
        return new Fraction(NaN);
      }
      return newFraction(Math.ceil(places * this["s"] * this["n"] / this["d"]), places);
    },
    /**
     * Calculates the floor of a rational number
     *
     * Ex: new Fraction('4.(3)').floor() => (4 / 1)
     **/
    "floor": function(places) {
      places = Math.pow(10, places || 0);
      if (isNaN(this["n"]) || isNaN(this["d"])) {
        return new Fraction(NaN);
      }
      return newFraction(Math.floor(places * this["s"] * this["n"] / this["d"]), places);
    },
    /**
     * Rounds a rational number
     *
     * Ex: new Fraction('4.(3)').round() => (4 / 1)
     **/
    "round": function(places) {
      places = Math.pow(10, places || 0);
      if (isNaN(this["n"]) || isNaN(this["d"])) {
        return new Fraction(NaN);
      }
      return newFraction(Math.round(places * this["s"] * this["n"] / this["d"]), places);
    },
    /**
     * Rounds a rational number to a multiple of another rational number
     *
     * Ex: new Fraction('0.9').roundTo("1/8") => 7 / 8
     **/
    "roundTo": function(a2, b2) {
      parse(a2, b2);
      return newFraction(this["s"] * Math.round(this["n"] * P["d"] / (this["d"] * P["n"])) * P["n"], P["d"]);
    },
    /**
     * Gets the inverse of the fraction, means numerator and denominator are exchanged
     *
     * Ex: new Fraction([-3, 4]).inverse() => -4 / 3
     **/
    "inverse": function() {
      return newFraction(this["s"] * this["d"], this["n"]);
    },
    /**
     * Calculates the fraction to some rational exponent, if possible
     *
     * Ex: new Fraction(-1,2).pow(-3) => -8
     */
    "pow": function(a2, b2) {
      parse(a2, b2);
      if (P["d"] === 1) {
        if (P["s"] < 0) {
          return newFraction(Math.pow(this["s"] * this["d"], P["n"]), Math.pow(this["n"], P["n"]));
        } else {
          return newFraction(Math.pow(this["s"] * this["n"], P["n"]), Math.pow(this["d"], P["n"]));
        }
      }
      if (this["s"] < 0) return null;
      var N4 = factorize(this["n"]);
      var D3 = factorize(this["d"]);
      var n = 1;
      var d2 = 1;
      for (var k3 in N4) {
        if (k3 === "1") continue;
        if (k3 === "0") {
          n = 0;
          break;
        }
        N4[k3] *= P["n"];
        if (N4[k3] % P["d"] === 0) {
          N4[k3] /= P["d"];
        } else return null;
        n *= Math.pow(k3, N4[k3]);
      }
      for (var k3 in D3) {
        if (k3 === "1") continue;
        D3[k3] *= P["n"];
        if (D3[k3] % P["d"] === 0) {
          D3[k3] /= P["d"];
        } else return null;
        d2 *= Math.pow(k3, D3[k3]);
      }
      if (P["s"] < 0) {
        return newFraction(d2, n);
      }
      return newFraction(n, d2);
    },
    /**
     * Check if two rational numbers are the same
     *
     * Ex: new Fraction(19.6).equals([98, 5]);
     **/
    "equals": function(a2, b2) {
      parse(a2, b2);
      return this["s"] * this["n"] * P["d"] === P["s"] * P["n"] * this["d"];
    },
    /**
     * Check if two rational numbers are the same
     *
     * Ex: new Fraction(19.6).equals([98, 5]);
     **/
    "compare": function(a2, b2) {
      parse(a2, b2);
      var t = this["s"] * this["n"] * P["d"] - P["s"] * P["n"] * this["d"];
      return (0 < t) - (t < 0);
    },
    "simplify": function(eps) {
      if (isNaN(this["n"]) || isNaN(this["d"])) {
        return this;
      }
      eps = eps || 1e-3;
      var thisABS = this["abs"]();
      var cont = thisABS["toContinued"]();
      for (var i = 1; i < cont.length; i++) {
        var s2 = newFraction(cont[i - 1], 1);
        for (var k3 = i - 2; k3 >= 0; k3--) {
          s2 = s2["inverse"]()["add"](cont[k3]);
        }
        if (Math.abs(s2["sub"](thisABS).valueOf()) < eps) {
          return s2["mul"](this["s"]);
        }
      }
      return this;
    },
    /**
     * Check if two rational numbers are divisible
     *
     * Ex: new Fraction(19.6).divisible(1.5);
     */
    "divisible": function(a2, b2) {
      parse(a2, b2);
      return !(!(P["n"] * this["d"]) || this["n"] * P["d"] % (P["n"] * this["d"]));
    },
    /**
     * Returns a decimal representation of the fraction
     *
     * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183
     **/
    "valueOf": function() {
      return this["s"] * this["n"] / this["d"];
    },
    /**
     * Returns a string-fraction representation of a Fraction object
     *
     * Ex: new Fraction("1.'3'").toFraction(true) => "4 1/3"
     **/
    "toFraction": function(excludeWhole) {
      var whole, str = "";
      var n = this["n"];
      var d2 = this["d"];
      if (this["s"] < 0) {
        str += "-";
      }
      if (d2 === 1) {
        str += n;
      } else {
        if (excludeWhole && (whole = Math.floor(n / d2)) > 0) {
          str += whole;
          str += " ";
          n %= d2;
        }
        str += n;
        str += "/";
        str += d2;
      }
      return str;
    },
    /**
     * Returns a latex representation of a Fraction object
     *
     * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
     **/
    "toLatex": function(excludeWhole) {
      var whole, str = "";
      var n = this["n"];
      var d2 = this["d"];
      if (this["s"] < 0) {
        str += "-";
      }
      if (d2 === 1) {
        str += n;
      } else {
        if (excludeWhole && (whole = Math.floor(n / d2)) > 0) {
          str += whole;
          n %= d2;
        }
        str += "\\frac{";
        str += n;
        str += "}{";
        str += d2;
        str += "}";
      }
      return str;
    },
    /**
     * Returns an array of continued fraction elements
     *
     * Ex: new Fraction("7/8").toContinued() => [0,1,7]
     */
    "toContinued": function() {
      var t;
      var a2 = this["n"];
      var b2 = this["d"];
      var res = [];
      if (isNaN(a2) || isNaN(b2)) {
        return res;
      }
      do {
        res.push(Math.floor(a2 / b2));
        t = a2 % b2;
        a2 = b2;
        b2 = t;
      } while (a2 !== 1);
      return res;
    },
    /**
     * Creates a string representation of a fraction with all digits
     *
     * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
     **/
    "toString": function(dec) {
      var N4 = this["n"];
      var D3 = this["d"];
      if (isNaN(N4) || isNaN(D3)) {
        return "NaN";
      }
      dec = dec || 15;
      var cycLen = cycleLen(N4, D3);
      var cycOff = cycleStart(N4, D3, cycLen);
      var str = this["s"] < 0 ? "-" : "";
      str += N4 / D3 | 0;
      N4 %= D3;
      N4 *= 10;
      if (N4)
        str += ".";
      if (cycLen) {
        for (var i = cycOff; i--; ) {
          str += N4 / D3 | 0;
          N4 %= D3;
          N4 *= 10;
        }
        str += "(";
        for (var i = cycLen; i--; ) {
          str += N4 / D3 | 0;
          N4 %= D3;
          N4 *= 10;
        }
        str += ")";
      } else {
        for (var i = dec; N4 && i--; ) {
          str += N4 / D3 | 0;
          N4 %= D3;
          N4 *= 10;
        }
      }
      return str;
    }
  };

  // node_modules/@strudel/core/dist/index.mjs
  var dist_exports = {};
  __export(dist_exports, {
    ClockCollator: () => _n,
    Cyclist: () => hf,
    FXr: () => uf,
    FXrel: () => cf,
    FXrelease: () => of,
    Fraction: () => m,
    Hap: () => S2,
    Pattern: () => f2,
    State: () => ut2,
    TimeSpan: () => B2,
    __chooseWith: () => Me2,
    _brandBy: () => Oe2,
    _fitslice: () => Fn,
    _irand: () => ze2,
    _keyDown: () => je2,
    _match: () => In,
    _mod: () => bt2,
    _morph: () => de2,
    _polymeterListSteps: () => Hn,
    _retime: () => Yt2,
    _slices: () => Zt2,
    accelerate: () => Ys,
    activeLabel: () => va,
    ad: () => Bp,
    add: () => $h,
    adsr: () => xp,
    almostAlways: () => Jw,
    almostNever: () => jw,
    always: () => Nw,
    amp: () => sr,
    analyze: () => gc,
    anchor: () => Ua,
    and: () => nd,
    apply: () => Pd,
    applyN: () => Wn,
    ar: () => zp,
    arp: () => wh,
    arpWith: () => yh,
    arrange: () => kh,
    as: () => Kp,
    asym: () => py,
    att: () => or,
    attack: () => rr,
    averageArray: () => nn,
    backgroundImage: () => Hw,
    band: () => Ih,
    bandf: () => Cc,
    bandq: () => Oc,
    bank: () => yc,
    base64ToUnicode: () => gn,
    bbexpr: () => ti2,
    bbst: () => ni2,
    beat: () => oy,
    begin: () => Mc,
    berlin: () => qw,
    bgain: () => ja,
    binary: () => iw,
    binaryL: () => uw,
    binaryN: () => Jf,
    binaryNL: () => $f,
    bind: () => xh,
    binshift: () => Zl,
    bite: () => Ld,
    bjork: () => _y,
    bjorklund: () => ge2,
    blshift: () => Dh,
    bmod: () => sf,
    bor: () => Vh,
    bp: () => Bc,
    bpa: () => ji2,
    bpattack: () => Ei2,
    bpd: () => Wi2,
    bpdc: () => yu,
    bpdecay: () => Ri2,
    bpdepth: () => fu,
    bpdepthfreq: () => du,
    bpdepthfrequency: () => hu,
    bpe: () => Bi2,
    bpenv: () => xi2,
    bpf: () => xc,
    bpq: () => zc,
    bpr: () => Zi2,
    bprate: () => lu,
    bprelease: () => Yi2,
    bps: () => Gi2,
    bpshape: () => mu,
    bpskew: () => wu,
    bpsustain: () => Di2,
    bpsync: () => pu,
    brak: () => Ud,
    brand: () => mw,
    brandBy: () => dw,
    brshift: () => Gh,
    bus: () => Pa,
    busgain: () => Ea,
    bxor: () => Hh,
    bypass: () => Tm,
    byteBeatExpression: () => Zc,
    byteBeatStartTime: () => ei2,
    calculateSteps: () => dh,
    cat: () => mt2,
    ccn: () => $p,
    ccv: () => Np,
    ceil: () => id,
    ch: () => ri2,
    channel: () => gi2,
    channels: () => si2,
    chebyshev: () => dy,
    choose: () => Rf,
    chooseCycles: () => Wf,
    chooseIn: () => ww,
    chooseInWith: () => Pe2,
    chooseOut: () => gw,
    chooseWith: () => It2,
    chop: () => Xm,
    chord: () => Da,
    chorus: () => wc,
    chunk: () => mm,
    chunkBack: () => gm,
    chunkBackInto: () => Am,
    chunkInto: () => qm,
    chunkback: () => bm,
    chunkbackinto: () => Sm,
    chunkinto: () => km,
    clamp: () => an,
    cleanupUi: () => Dw,
    clip: () => pp,
    coarse: () => Rc,
    code2hash: () => ph,
    color: () => Ap,
    colour: () => Tp,
    comb: () => Xl,
    compose: () => oh,
    compress: () => dd,
    compressSpan: () => md,
    compressor: () => bl,
    compressorAttack: () => kl,
    compressorKnee: () => _l,
    compressorRatio: () => vl,
    compressorRelease: () => ql,
    compressspan: () => yd,
    constant: () => ch,
    contract: () => Kn,
    control: () => Jp,
    controls: () => gy,
    cosine: () => Qy,
    cosine2: () => Uy,
    cpm: () => Ed,
    cps: () => lp,
    createClock: () => ff,
    createParam: () => Nt2,
    createParams: () => Cp,
    crush: () => Lc,
    ctf: () => vi2,
    ctlNum: () => Lp,
    ctranspose: () => Aa,
    cubic: () => ay,
    curry: () => w2,
    curve: () => yp,
    cut: () => bi2,
    cutoff: () => _i2,
    cycleToSeconds: () => Kt2,
    cyclesPer: () => Ww,
    dec: () => vc,
    decay: () => _c,
    degrade: () => Tw,
    degradeBy: () => Aw,
    degradeByWith: () => Sw,
    degree: () => qa,
    delay: () => Ru,
    delayfb: () => Fu,
    delayfeedback: () => Wu,
    delayspeed: () => Vu,
    delaysync: () => Qu,
    delayt: () => Du,
    delaytime: () => Hu,
    deltaSlide: () => wp,
    det: () => Ku,
    detune: () => Xu,
    dfb: () => Iu,
    dict: () => Qa,
    dictionary: () => Ga,
    diode: () => ly,
    dist: () => yl,
    distort: () => ml,
    distorttype: () => gl,
    distortvol: () => wl,
    div: () => Rh,
    djf: () => Lu,
    drawLine: () => Cn,
    drive: () => Qc,
    drop: () => Qn,
    dry: () => ta,
    ds: () => Op,
    dt: () => Gu,
    duck: () => Uc,
    duckattack: () => Yc,
    duckdepth: () => Xc,
    duckonset: () => Kc,
    dur: () => dp,
    duration: () => hp,
    early: () => jd,
    echo: () => im,
    echoWith: () => sm,
    echowith: () => rm,
    eish: () => Ty,
    end: () => Pc,
    enhance: () => Ul,
    env: () => nf,
    eq: () => Yh,
    eqt: () => Zh,
    errorLogger: () => zt2,
    euclid: () => by,
    euclidLegato: () => qy,
    euclidLegatoRot: () => Sy,
    euclidRot: () => ky,
    euclidish: () => Ay,
    euclidrot: () => vy,
    evalScope: () => xn,
    evaluate: () => On,
    every: () => Md,
    expand: () => Xn,
    expression: () => Ol,
    extend: () => Un,
    fadeInTime: () => sa,
    fadeOutTime: () => na,
    fadeTime: () => ea,
    fanchor: () => eu,
    fast: () => qd,
    fastChunk: () => vm,
    fastGap: () => wd,
    fastcat: () => N2,
    fastchunk: () => _m,
    fastgap: () => gd,
    fft: () => bc,
    filter: () => zm,
    filterWhen: () => Mm,
    firstOf: () => zd,
    fit: () => ey,
    flatten: () => G,
    floor: () => cd,
    fm: () => Sr,
    fm1: () => Ar,
    fm2: () => Tr,
    fm3: () => Cr,
    fm4: () => xr,
    fm5: () => Br,
    fm6: () => Or,
    fm7: () => zr,
    fm8: () => Mr,
    fmatt: () => Kr,
    fmatt1: () => Yr,
    fmatt2: () => Zr,
    fmatt3: () => to,
    fmatt4: () => eo,
    fmatt5: () => no,
    fmatt6: () => so,
    fmatt7: () => ro,
    fmatt8: () => oo,
    fmattack: () => Fr,
    fmattack1: () => Ir,
    fmattack2: () => Vr,
    fmattack3: () => Hr,
    fmattack4: () => Dr,
    fmattack5: () => Gr,
    fmattack6: () => Qr,
    fmattack7: () => Ur,
    fmattack8: () => Xr,
    fmdec: () => Ao,
    fmdec1: () => To,
    fmdec2: () => Co,
    fmdec3: () => xo,
    fmdec4: () => Bo,
    fmdec5: () => Oo,
    fmdec6: () => zo,
    fmdec7: () => Mo,
    fmdec8: () => Po,
    fmdecay: () => yo,
    fmdecay1: () => wo,
    fmdecay2: () => go,
    fmdecay3: () => bo,
    fmdecay4: () => _o,
    fmdecay5: () => vo,
    fmdecay6: () => ko,
    fmdecay7: () => qo,
    fmdecay8: () => So,
    fmenv: () => Pr,
    fmenv1: () => Er,
    fmenv2: () => jr,
    fmenv3: () => Jr,
    fmenv4: () => $r,
    fmenv5: () => Nr,
    fmenv6: () => Lr,
    fmenv7: () => Rr,
    fmenv8: () => Wr,
    fmh: () => cr,
    fmh1: () => ir,
    fmh2: () => ur,
    fmh3: () => ar,
    fmh4: () => lr,
    fmh5: () => pr,
    fmh6: () => fr,
    fmh7: () => hr,
    fmh8: () => dr,
    fmi: () => mr,
    fmi1: () => yr,
    fmi2: () => wr,
    fmi3: () => gr,
    fmi4: () => br,
    fmi5: () => _r,
    fmi6: () => vr,
    fmi7: () => kr,
    fmi8: () => qr,
    fmrel: () => ic,
    fmrel1: () => uc,
    fmrel2: () => ac,
    fmrel3: () => lc,
    fmrel4: () => pc,
    fmrel5: () => fc,
    fmrel6: () => hc,
    fmrel7: () => dc,
    fmrel8: () => mc,
    fmrelease: () => Yo,
    fmrelease1: () => Zo,
    fmrelease2: () => tc,
    fmrelease3: () => ec,
    fmrelease4: () => nc,
    fmrelease5: () => sc,
    fmrelease6: () => rc,
    fmrelease7: () => oc,
    fmrelease8: () => cc,
    fmsus: () => Io,
    fmsus1: () => Vo,
    fmsus2: () => Ho,
    fmsus3: () => Do,
    fmsus4: () => Go,
    fmsus5: () => Qo,
    fmsus6: () => Uo,
    fmsus7: () => Xo,
    fmsus8: () => Ko,
    fmsustain: () => Eo,
    fmsustain1: () => jo,
    fmsustain2: () => Jo,
    fmsustain3: () => $o,
    fmsustain4: () => No,
    fmsustain5: () => Lo,
    fmsustain6: () => Ro,
    fmsustain7: () => Wo,
    fmsustain8: () => Fo,
    fmwave: () => co,
    fmwave1: () => io,
    fmwave2: () => uo,
    fmwave3: () => ao,
    fmwave4: () => lo,
    fmwave5: () => po,
    fmwave6: () => fo,
    fmwave7: () => ho,
    fmwave8: () => mo,
    focus: () => bd,
    focusSpan: () => _d,
    focusspan: () => vd,
    fold: () => fy,
    fractionalArgs: () => ih,
    frameRate: () => np,
    frames: () => sp,
    freeze: () => Vl,
    freq: () => ra,
    freqToMidi: () => Ze2,
    fromBipolar: () => ad,
    fshift: () => Ml,
    fshiftnote: () => Pl,
    fshiftphase: () => El,
    ftype: () => tu,
    func: () => rd,
    fxr: () => af,
    gain: () => er,
    gap: () => pt2,
    gat: () => wa,
    gate: () => ya,
    getAccidentalsOffset: () => Ye2,
    getControlName: () => yt2,
    getCps: () => Fy,
    getCurrentKeyboardState: () => qn,
    getEventOffsetMs: () => th,
    getFreq: () => tn,
    getFrequency: () => rh,
    getIsStarted: () => Hy,
    getPattern: () => Iy,
    getPerformanceTimeSeconds: () => hh,
    getPlayableNoteValue: () => sh,
    getRandsAtTime: () => K2,
    getSoundIndex: () => nh,
    getTime: () => Wy,
    getTrigger: () => Sf,
    getTriggerFunc: () => Vy,
    grow: () => jm,
    gt: () => Uh,
    gte: () => Kh,
    hard: () => uy,
    harmonic: () => Ta,
    hash2code: () => fh,
    hbrick: () => tp,
    hcutoff: () => Mu,
    hold: () => Tc,
    hours: () => rp,
    hp: () => Eu,
    hpa: () => Pi2,
    hpattack: () => Mi2,
    hpd: () => Li2,
    hpdc: () => Su,
    hpdecay: () => Ni2,
    hpdepth: () => _u,
    hpdepthfreq: () => ku,
    hpdepthfrequency: () => vu,
    hpe: () => Ci2,
    hpenv: () => Ti2,
    hpf: () => Pu,
    hpq: () => Ju,
    hpr: () => Ki2,
    hprate: () => gu,
    hprelease: () => Xi2,
    hps: () => Hi2,
    hpshape: () => qu,
    hpskew: () => Au,
    hpsustain: () => Vi2,
    hpsync: () => bu,
    hresonance: () => ju,
    hsl: () => Om,
    hsla: () => Bm,
    hurry: () => Ad,
    id: () => ot2,
    imag: () => Ql,
    inhabit: () => Jy,
    inhabitmod: () => Ny,
    innerBind: () => Bh,
    inside: () => xd,
    inv: () => Dd,
    invert: () => Hd,
    ir: () => cl,
    irand: () => yw,
    irbegin: () => al,
    iresponse: () => il,
    irspeed: () => ul,
    isControlName: () => is,
    isNote: () => Mt2,
    isNoteWithOctave: () => Yf,
    isPattern: () => pe2,
    isaw: () => Rt2,
    isaw2: () => Ae2,
    iter: () => pm,
    iterBack: () => fm,
    iterback: () => hm,
    itri: () => Zy,
    itri2: () => tw,
    jux: () => nm,
    juxBy: () => tm,
    juxby: () => em,
    kcutoff: () => $l,
    keep: () => jh,
    keepif: () => Jh,
    keyAlias: () => kn,
    keyDown: () => Rw,
    krush: () => Jl,
    label: () => ka,
    lastOf: () => Od,
    late: () => Ln,
    lbrick: () => ep,
    legato: () => fp,
    leslie: () => ga,
    lfo: () => ef,
    linger: () => Rd,
    listRange: () => _t2,
    lock: () => Uu,
    logKey: () => oe2,
    logger: () => E2,
    loop: () => Ec,
    loopAt: () => Zm,
    loopAtCps: () => ny,
    loopBegin: () => jc,
    loopEnd: () => $c,
    loopat: () => ty,
    loopatcps: () => sy,
    loopb: () => Jc,
    loope: () => Nc,
    lp: () => qi2,
    lpa: () => zi2,
    lpattack: () => Oi2,
    lpd: () => $i2,
    lpdc: () => uu,
    lpdecay: () => Ji2,
    lpdepth: () => ru,
    lpdepthfreq: () => cu,
    lpdepthfrequency: () => ou,
    lpe: () => Ai2,
    lpenv: () => Si2,
    lpf: () => ki2,
    lpq: () => Nu,
    lpr: () => Ui2,
    lprate: () => nu,
    lprelease: () => Qi2,
    lps: () => Ii2,
    lpshape: () => iu,
    lpskew: () => au,
    lpsustain: () => Fi2,
    lpsync: () => su,
    lrate: () => ba,
    lsize: () => _a,
    lt: () => Qh,
    lte: () => Xh,
    mapArgs: () => ie2,
    mask: () => Sh,
    midi2note: () => eh,
    midiToFreq: () => it2,
    midibend: () => Dp,
    midichan: () => Mp,
    midicmd: () => jp,
    midimap: () => Pp,
    midiport: () => Ep,
    miditouch: () => Gp,
    minutes: () => op,
    mod: () => Wh,
    mode: () => Ya,
    morph: () => cy,
    mouseX: () => ow,
    mouseY: () => sw,
    mousex: () => rw,
    mousey: () => nw,
    mtranspose: () => Sa,
    mul: () => Lh,
    n: () => Xs,
    nanFallback: () => sn,
    ne: () => td,
    net: () => ed,
    never: () => $w,
    noise: () => Bu,
    note: () => Ks,
    noteToMidi: () => gt2,
    nothing: () => R,
    nrpnn: () => Rp,
    nrpv: () => Wp,
    nudge: () => Ba,
    numeralArgs: () => L2,
    objectMap: () => bn,
    oct: () => za,
    octave: () => Oa,
    octaveR: () => xa,
    octaves: () => Ka,
    octer: () => Nl,
    octersub: () => Ll,
    octersubsub: () => Rl,
    off: () => Qd,
    offset: () => Xa,
    often: () => Pw,
    or: () => sd,
    orbit: () => Ma,
    oschost: () => Up,
    oscport: () => Xp,
    outerBind: () => Oh,
    outside: () => Bd,
    overgain: () => Ja,
    overshape: () => $a,
    pace: () => Vn,
    pairs: () => un,
    palindrome: () => Zd,
    pan: () => Na,
    panchor: () => ma,
    panorient: () => Fa,
    panspan: () => La,
    pansplay: () => Ra,
    panwidth: () => Wa,
    parray: () => me2,
    parseFractional: () => cn,
    parseNumeral: () => ce2,
    partials: () => my,
    patt: () => ca,
    pattack: () => oa,
    pcurve: () => da,
    pdec: () => ua,
    pdecay: () => ia,
    penv: () => ha,
    per: () => Df,
    perCycle: () => Fw,
    perlin: () => kw,
    perx: () => Iw,
    ph: () => ai2,
    phasdp: () => wi2,
    phaser: () => li2,
    phasercenter: () => hi2,
    phaserdepth: () => mi2,
    phaserrate: () => ui2,
    phasersweep: () => pi2,
    phases: () => yy,
    phc: () => di2,
    phd: () => yi2,
    phs: () => fi2,
    pick: () => yf,
    pickF: () => xy,
    pickOut: () => Oy,
    pickReset: () => Ey,
    pickRestart: () => My,
    pickSqueeze: () => $y,
    pickmod: () => gf,
    pickmodF: () => By,
    pickmodOut: () => zy,
    pickmodReset: () => jy,
    pickmodRestart: () => Py,
    pickmodSqueeze: () => Ly,
    pipe: () => on,
    pitchJump: () => gp,
    pitchJumpTime: () => bp,
    ply: () => kd,
    plyForEach: () => lm,
    plyWith: () => am,
    pm: () => _h,
    polyBind: () => Ph,
    polyTouch: () => Qp,
    polymeter: () => $t2,
    polyrhythm: () => gh,
    postgain: () => nr,
    pow: () => Fh,
    pr: () => bh,
    prel: () => fa,
    prelease: () => pa,
    press: () => Yd,
    pressBy: () => Kd,
    progNum: () => Fp,
    psus: () => la,
    psustain: () => aa,
    pure: () => C2,
    pw: () => oi2,
    pwrate: () => ci2,
    pwsweep: () => ii2,
    rand: () => W2,
    rand2: () => hw,
    randL: () => aw,
    randcat: () => bw,
    randrun: () => Nf,
    range: () => ld,
    range2: () => fd,
    rangex: () => pd,
    rarely: () => Ew,
    ratio: () => hd,
    rdim: () => sl,
    real: () => Gl,
    ref: () => ry,
    register: () => l,
    registerControl: () => c2,
    registerMultiControl: () => V2,
    reify: () => d,
    rel: () => Ac,
    release: () => Sc,
    removeUndefineds: () => lt2,
    repeatCycles: () => dm,
    repl: () => Dy,
    replicate: () => Em,
    reset_state: () => df,
    reset_timelines: () => mf,
    resonance: () => $u,
    rev: () => Rn,
    revv: () => Xd,
    rfade: () => ol,
    rib: () => xm,
    ribbon: () => Cm,
    ring: () => Wl,
    ringdf: () => Il,
    ringf: () => Fl,
    rlp: () => el,
    room: () => Za,
    roomdim: () => nl,
    roomfade: () => rl,
    roomlp: () => tl,
    roomsize: () => ll,
    rotate: () => rn,
    round: () => od,
    rsize: () => hl,
    run: () => jf,
    s: () => us,
    s_add: () => Fm,
    s_alt: () => Nm,
    s_cat: () => $m,
    s_contract: () => Dm,
    s_expand: () => Vm,
    s_extend: () => Hm,
    s_polymeter: () => Lm,
    s_sub: () => Im,
    s_taper: () => Rm,
    s_taperlist: () => Wm,
    s_tour: () => Gm,
    s_zip: () => Qm,
    saw: () => qt2,
    saw2: () => Se2,
    scram: () => Yl,
    scramble: () => pw,
    scrub: () => Yp,
    seconds: () => cp,
    seed: () => fw,
    seg: () => Fd,
    segment: () => Wd,
    semitone: () => Va,
    seq: () => Nn,
    seqPLoop: () => qh,
    sequence: () => Q2,
    sequenceP: () => En,
    set: () => Eh,
    setCpsFunc: () => _f,
    setIsStarted: () => qf,
    setPattern: () => vf,
    setStringParser: () => mh,
    setTime: () => ee2,
    setTriggerFunc: () => kf,
    shape: () => dl,
    shrink: () => Zn,
    shrinklist: () => Yn,
    shuffle: () => lw,
    signal: () => j2,
    silence: () => q2,
    sine: () => Af,
    sine2: () => Te2,
    sinefold: () => hy,
    size: () => pl,
    slice: () => ss,
    slide: () => Ia,
    slow: () => Td,
    slowChunk: () => wm,
    slowcat: () => Z2,
    slowcatPrime: () => fe2,
    slowchunk: () => ym,
    smear: () => Kl,
    soft: () => iy,
    sol2note: () => uh,
    someCycles: () => Mw,
    someCyclesBy: () => zw,
    sometimes: () => Ow,
    sometimesBy: () => Bw,
    songPtr: () => ip,
    sound: () => as,
    source: () => Qs,
    sparsity: () => Cd,
    speak: () => Vw,
    speed: () => ye2,
    splice: () => Ym,
    splitAt: () => ue2,
    spread: () => Zu,
    square: () => Tf,
    square2: () => Xy,
    squeeze: () => Ry,
    squeezeBind: () => zh,
    squiz: () => Tl,
    src: () => Us,
    stack: () => z,
    stackBy: () => vh,
    stackCentre: () => $n,
    stackLeft: () => jn,
    stackRight: () => Jn,
    steady: () => Gy,
    stepBind: () => Mh,
    stepalt: () => Dn,
    stepcat: () => $2,
    steps: () => Um,
    stepsPerOctave: () => Ca,
    stretch: () => Sl,
    striate: () => Km,
    stringifyValues: () => ae,
    struct: () => Ah,
    strudelScope: () => le,
    stut: () => um,
    stutWith: () => om,
    stutwith: () => cm,
    sub: () => Nh,
    superimpose: () => Th,
    sus: () => qc,
    sustain: () => kc,
    sustainpedal: () => zl,
    swing: () => Vd,
    swingBy: () => Id,
    sysex: () => Ip,
    sysexdata: () => Hp,
    sysexid: () => Vp,
    sz: () => fl,
    take: () => Gn,
    time: () => ew,
    timeCat: () => ns,
    timecat: () => Jm,
    timeline: () => Cy,
    toBipolar: () => ud,
    tokenizeNote: () => Ue2,
    tour: () => ts,
    transient: () => rf,
    trem: () => Fc,
    tremolo: () => Wc,
    tremolodepth: () => Vc,
    tremolophase: () => Dc,
    tremoloshape: () => Gc,
    tremoloskew: () => Hc,
    tremolosync: () => Ic,
    tri: () => Ky,
    tri2: () => Yy,
    triode: () => jl,
    tsdelay: () => Dl,
    uid: () => up,
    undegrade: () => xw,
    undegradeBy: () => Cw,
    unicodeToBase64: () => wn,
    uniq: () => ah,
    uniqsort: () => lh,
    uniqsortr: () => yn,
    unison: () => Yu,
    unit: () => Al,
    useRNG: () => cw,
    v: () => xu,
    val: () => ap,
    valueToMidi: () => Zf,
    vel: () => tr,
    velocity: () => Zs,
    vib: () => Tu,
    vibmod: () => Ou,
    vibrato: () => Cu,
    vmod: () => zu,
    voice: () => Ha,
    vowel: () => Cl,
    warp: () => Cs,
    warpatt: () => Os,
    warpattack: () => Bs,
    warpdc: () => Rs,
    warpdec: () => Ms,
    warpdecay: () => zs,
    warpdepth: () => Ns,
    warpenv: () => Ds,
    warpmode: () => Fs,
    warprate: () => $s,
    warprel: () => Js,
    warprelease: () => js,
    warpshape: () => Ls,
    warpskew: () => Ws,
    warpsus: () => Es,
    warpsustain: () => Ps,
    warpsync: () => Gs,
    waveloss: () => xl,
    wavetablePhaseRand: () => Hs,
    wavetablePosition: () => ps,
    wavetableWarp: () => xs,
    wavetableWarpMode: () => Is,
    wchoose: () => _w,
    wchooseCycles: () => If,
    when: () => Gd,
    whenKey: () => Lw,
    withSeed: () => Lf,
    withValue: () => Ch,
    within: () => Pm,
    worklet: () => wy,
    wrandcat: () => vw,
    wt: () => ls,
    wtatt: () => ds,
    wtattack: () => hs,
    wtdc: () => As,
    wtdec: () => ys,
    wtdecay: () => ms,
    wtdepth: () => qs,
    wtenv: () => fs,
    wtphaserand: () => Vs,
    wtrate: () => vs,
    wtrel: () => _s,
    wtrelease: () => bs,
    wtshape: () => Ss,
    wtskew: () => Ts,
    wtsus: () => gs,
    wtsustain: () => ws,
    wtsync: () => ks,
    xfade: () => rs,
    xsdelay: () => Hl,
    zcrush: () => kp,
    zdelay: () => qp,
    zip: () => es,
    zipWith: () => Pt2,
    zmod: () => vp,
    znoise: () => _p,
    zoom: () => Jd,
    zoomArc: () => $d,
    zoomarc: () => Nd,
    zrand: () => mp,
    zzfx: () => Sp
  });

  // node_modules/@kabelsalat/web/dist/index.mjs
  function W(e, t) {
    if (t || (t = "assertion failed"), !e)
      throw new Error(t);
  }
  var c = class {
    constructor(t, i) {
      this.type = t, i !== void 0 && (this.value = i), this.ins = [];
    }
    static parseInput(t, i) {
      if (typeof t == "function") {
        if (!i)
          throw new Error(
            "tried to parse function input without without passing node.."
          );
        return t(i);
      }
      return typeof t == "object" ? t : typeof t == "number" && !isNaN(t) || typeof t == "string" ? f(t) : (console.log(
        `invalid input type "${typeof t}" for node of type "${i.type}", falling back to 0. The input was:`,
        t
      ), 0);
    }
  };
  var x = (e, t) => new c(e, t);
  var y = /* @__PURE__ */ new Map();
  var Z = "poly";
  var Y = "exit";
  c.prototype.inherit = function(e) {
    return e.inputOf && (this.inputOf = e.inputOf), e.outputOf && (this.outputOf = e.outputOf), this;
  };
  c.prototype.toObject = function() {
    return JSON.parse(JSON.stringify(this));
  };
  c.prototype.stringify = function() {
    return JSON.stringify(this, null, 2).replaceAll('"', "'");
  };
  function F(e, ...t) {
    let i = 1;
    if (t = t.map((l2) => {
      if (Array.isArray(l2)) {
        if (l2.length === 1)
          return l2[0];
        l2 = new c(Z).withIns(...l2);
      }
      if (typeof l2 == "function") {
        const o = l2(new c("peek"));
        o.type === Z && (i = Math.max(o.ins.length, i));
      }
      return l2.type === Z && (i = Math.max(l2.ins.length, i)), l2;
    }), i === 1) {
      const l2 = x(e);
      return l2.withIns(...t.map((o) => c.parseInput(o, l2)));
    }
    if (e === Y) {
      const l2 = t.map((o) => o.type === Z ? o.ins.map((d2) => c.parseInput(d2).inherit(d2)) : o).flat();
      return x(Y).withIns(...l2);
    }
    const n = Array.from({ length: i }, (l2, o) => {
      const d2 = new c(e), G3 = t.map((p) => p.type === Z ? c.parseInput(p.ins[o % p.ins.length], d2).inherit(p) : (p = c.parseInput(p, d2), p.type === Z && (p = p.ins[o]), p));
      return d2.withIns(...G3);
    });
    return new c(Z).withIns(...n);
  }
  function oe(e, t) {
    const i = y.get(e);
    return i?.ins?.[t] ? i.ins[t].name : "";
  }
  var a = (e, t) => u(e, (...i) => F(e, ...i), t);
  y.set("register", {
    tags: ["meta"],
    graph: false,
    description: "Registers a new Node function. Sets it on the prototype + returns the function itself. Like `module` but doesn't hide complexity in graph viz.",
    examples: [
      `let kick = register('kick', gate => gate.adsr(0,.11,0,.11)
.apply(env => env.mul(env)
  .mul(158)
  .sine(env)
  .distort(.85)
))
impulse(2).kick().out()`
    ]
  });
  var u = (e, t, i) => (i && y.set(e, i), c.prototype[e] = function(...n) {
    return t(this, ...n);
  }, c.prototype["_" + e] = function() {
    return this;
  }, t);
  y.set("module", {
    tags: ["meta"],
    graph: true,
    description: "Creates a module. Like `register`, but the graph viz will hide the internal complexity of the module.",
    examples: [
      `let kick = module('kick', gate => gate.adsr(0,.11,0,.11)
.apply(env => env.mul(env)
  .mul(158)
  .sine(env)
  .distort(.85)
))
impulse(2).kick().out()`
    ]
  });
  var de = 0;
  function g(e, t, i) {
    return u(
      e,
      (...n) => {
        const l2 = de++;
        return n = n.map(
          (o, d2) => c.parseInput(o).asModuleInput?.(e, l2, d2)
        ), t(...n).asModuleOutput?.(e, l2);
      },
      i
    );
  }
  y.set("n", {
    tags: ["math"],
    description: "Constant value node. Turns a number into a Node.",
    ins: [{ name: "value", default: 0 }]
  });
  function f(e) {
    return Array.isArray(e) ? poly(...e.map((t) => f(t))) : typeof e == "object" ? e : x("n", e);
  }
  y.set("out", {
    tags: ["meta"],
    description: "Sends the node to the audio output"
  });
  y.set("withIns", {
    internal: true,
    tags: ["innards"],
    description: "Sets the inputs of a node. Returns the node itself",
    ins: [{ name: "in", dynamic: true }]
  });
  c.prototype.withIns = function(...e) {
    return this.ins = e, this;
  };
  y.set("flatten", {
    internal: true,
    tags: ["innards"],
    description: "Flattens the node to a list of all nodes in the graph, where each Node's ins are now indices"
  });
  c.prototype.flatten = function() {
    return pe(this);
  };
  y.set("apply", {
    graph: true,
    tags: ["meta"],
    description: "Applies the given function to the Node. Useful when a node has to be used multiple times.",
    examples: [
      `impulse(4)
.apply(imp=>imp
  .seq(110,220,330,440)
  .sine()
  .mul( imp.ad(.1,.1) )
).out()`
    ]
  });
  c.prototype.apply = function(e) {
    return e(this);
  };
  y.set("clone", {
    internal: true,
    tags: ["innards"],
    description: "Clones the node"
  });
  c.prototype.clone = function() {
    return new c(this.type, this.value).withIns(...this.ins);
  };
  y.set("map", {
    tags: ["meta"],
    description: "Applies the given function to all ins if it's poly node. Otherwise it applies the function to itself.",
    examples: [
      `n([110,220,330])
.map( freq=>freq.mul([1,1.007]).saw().mix() )
.mix(2).mul(.5).out()`
    ]
  });
  c.prototype.map = function(e) {
    return this.type !== "poly" ? e(this) : poly(...this.ins.map(e));
  };
  c.prototype.channel = function(e) {
    return this.type !== "poly" ? this : this.ins[e % this.ins.length];
  };
  y.set("select", {
    tags: ["meta"],
    graph: true,
    description: "Find the first occurence of the given type up in the graph and returns the match. Useful to exit a feedback loop at another point.",
    examples: [
      `sine(220).mul(impulse(1).ad(.001,.2))
.add( x=>x.delay(.2).mul(.8) )
.select('delay').out()
`
    ]
  });
  c.prototype.select = function(e) {
    for (let t of this.ins) {
      if (t.type === e)
        return t;
      const i = t.select(e);
      if (i)
        return i;
    }
  };
  y.set("debug", {
    tags: ["meta"],
    description: "Logs the node to the console"
  });
  c.prototype.debug = function(e = (t) => t) {
    return console.log(e(this)), this;
  };
  function ce(e) {
    const t = modules.get(e), i = Array.from(
      { length: t.length },
      (l2, o) => x(`$INPUT${o}`)
    ), n = t(...i);
    return JSON.stringify(n, null, 2);
  }
  function pe(e) {
    const t = [];
    return S(e, (i) => (t.push(i), i)), t.map((i) => {
      let n = {
        ...i,
        type: i.type,
        ins: i.ins.map((l2) => t.indexOf(l2) + "")
      };
      return i.value !== void 0 && (n.value = i.value), i.to !== void 0 && (n.to = t.indexOf(i.to)), n;
    });
  }
  var J = a("exit", { internal: true });
  function j(e, t) {
    let i = [];
    const n = u("out", function(o, d2 = [0, 1]) {
      return i.push(o.output(d2)), o;
    });
    return t ? (t.out = n, Function(...Object.keys(t), e)(...Object.values(t))) : (globalThis.out = n, Function(e)()), J(...i);
  }
  c.prototype.over = function(e) {
    return this.apply((t) => add(t, e(t)));
  };
  c.prototype.dfs = function(e, t) {
    return this.apply((i) => S(i, e, t));
  };
  c.prototype.apply2 = function(e) {
    return e(this, this);
  };
  var S = (e, t, i = []) => (e = t(e, i), i.push(e), e.ins = e.ins.map((n) => i.includes(n) ? n : S(n, t, i)), e);
  c.prototype.asModuleInput = function(e, t, i) {
    return this.inputOf = this.inputOf || [], this.inputOf.push([e, t, i]), this;
  };
  c.prototype.asModuleOutput = function(e, t) {
    return this.outputOf = [e, t], this;
  };
  function T(e, t = {}) {
    const {
      log: i = false,
      lang: n = "js",
      fallbackType: l2 = "thru",
      constType: o = "n",
      getRegister: d2 = (h) => `r[${h}]`,
      getOutput: G3 = (h) => `o[${h}]`,
      getSource: p = (h) => `s[${h}]`
    } = t;
    i && console.log("compile", e);
    const m3 = ue(e);
    let r = [], R3 = (h) => m3[h].type !== o ? d2(h) : typeof m3[h].value == "string" ? `"${m3[h].value}"` : m3[h].value;
    const X2 = [];
    for (let h in m3) {
      const v = m3[h], I3 = m3[h].ins.map((ae3) => R3(m3.indexOf(ae3))), se3 = X2.length;
      let b2 = y.get(v.type);
      b2 || (console.warn(
        `unhandled node type "${m3[h].type}". falling back to "${l2}"`
      ), b2 = y.get(l2));
      const le3 = {
        vars: I3,
        node: v,
        nodes: m3,
        id: h,
        ugenIndex: se3,
        ugen: b2.ugen,
        name: R3(h),
        lang: n,
        getRegister: d2,
        getOutput: G3,
        getSource: p
      };
      b2.compile && r.push(b2.compile(le3)), b2.ugen && X2.push({ type: b2.ugen, inputs: I3 });
    }
    const z4 = r.join(`
`);
    return i && (console.log("compiled code:"), console.log(z4)), { src: z4, ugens: X2, registers: m3.length };
  }
  c.prototype.compile = function(e) {
    return T(this, e);
  };
  function ue(e) {
    const t = [], i = /* @__PURE__ */ new Set();
    function n(l2) {
      if (!(typeof l2 != "object" || i.has(l2))) {
        i.add(l2);
        for (let o in l2.ins)
          n(l2.ins[o]);
        t.push(l2);
      }
    }
    return n(e), t;
  }
  var U = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    compile: T
  }, Symbol.toStringTag, { value: "Module" }));
  var Q = class {
    constructor() {
      this._events = {};
    }
    on(t, i) {
      this._events[t] || (this._events[t] = []);
      let n = this._events[t];
      W(n.indexOf(i) == -1), n.push(i);
    }
    removeListener(t, i) {
      let n = this._events[t], l2 = n.indexOf(i);
      l2 != -1 && n.splice(l2, 1);
    }
    trigger(t, ...i) {
      let n = this._events[t] || [];
      for (let l2 = 0; l2 < n.length; l2++)
        n[l2].apply(null, i);
    }
  };
  var me = class extends Q {
    constructor(t = navigator) {
      super(), this.midiAccess = null, this.getMIDIAccess(t);
    }
    // Try to get MIDI access from the browser
    async getMIDIAccess(t) {
      if ("requestMIDIAccess" in t) {
        this.midiAccess = await t.requestMIDIAccess({ sysex: false }), console.log("got MIDI access");
        for (let i of this.midiAccess.inputs.values())
          i.state == "connected" && (i.onmidimessage = (n) => this.trigger("midimessage", i.id, n.data));
        this.midiAccess.onstatechange = (i) => {
          i.port.type == "input" && i.port.state == "connected" && (console.log(
            "MIDI device connected:",
            i.port.name,
            "PORT:",
            i.port.id
          ), i.port.onmidimessage = (n) => this.trigger("midimessage", i.port.id, n.data));
        };
      }
    }
    // Send a message to all MIDI devices
    broadcast(t, i) {
      if (midi)
        for (let n of this.midiAccess.outputs.values())
          n.send(t, i);
    }
  };
  function re(e) {
    let t = e[0] & 240, i = (e[0] & 15) + 1;
    if (t == 176 && e.length == 3) {
      let n = e[1], o = e[2] / 127 * 2 - 1;
      return { type: "CC", channel: i, cc: n, value: o };
    }
    if (t == 224 && e.length == 3) {
      let n = e[1], d2 = (e[2] << 7 | n) / 16383 * 2 - 1;
      return { type: "PITCHBEND", channel: i, value: d2 };
    }
    if (t == 144 && e.length == 3) {
      let n = e[1], l2 = e[2] / 127;
      return { type: "NOTE_ON", channel: i, note: n, velocity: l2 };
    }
    if (t == 128 && e.length == 3) {
      let n = e[1];
      return { type: "NOTE_ON", channel: i, note: n, velocity: 0 };
    }
  }
  var he = class extends Q {
    constructor() {
      super(), this.attach();
    }
    attach() {
      typeof window < "u" && (this.handleMouseMove = (t) => {
        const i = t.clientX / document.body.clientWidth * 2 - 1, n = t.clientY / document.body.clientHeight * 2 - 1;
        this.trigger("move", i, n);
      }, document.addEventListener("mousemove", this.handleMouseMove));
    }
    detach() {
      typeof window < "u" && document.removeEventListener("mousemove", this.handleMouseMove);
    }
  };
  var Ge = "data:text/javascript;base64,KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2Z1bmN0aW9uIGcoaCx0KXtpZih0fHwodD0iYXNzZXJ0aW9uIGZhaWxlZCIpLCFoKXRocm93IG5ldyBFcnJvcih0KX1mdW5jdGlvbiBTKGgsdCxzKXtyZXR1cm4gaDw9MD90Omg+PTE/czp0K2gqKHMtdCl9ZnVuY3Rpb24gUChoLHQscyl7cmV0dXJuIGg8PXQ/MDpoPj1zPzE6cz09PXQ/MDooaC10KS8ocy10KX1mdW5jdGlvbiBFKGgsdCl7cmV0dXJuIGg8dD8oaC89dCxoK2gtaCpoLTEpOmg+MS10PyhoPShoLTEpL3QsaCpoK2graCsxKTowfWZ1bmN0aW9uIFUoaCl7cmV0dXJuIE1hdGguZmxvb3IoaCk9PT1ofWZ1bmN0aW9uIF8oaCl7cmV0dXJuIFUoaCkmJmg+MH1mdW5jdGlvbiBrKGgsdCl7dD1NYXRoLm1pbihNYXRoLm1heCh0LDApLDEpLHQtPS4wMTt2YXIgcz0yKnQvKDEtdCksZT0oMStzKSpoLygxK3MqTWF0aC5hYnMoaCkpO3JldHVybiBlfWZ1bmN0aW9uIHcoaCx0LHMpe3JldHVybiBoPj0xP3M6dCtoKihzLXQpfWZ1bmN0aW9uIFQoKXt0aGlzLnN0YXRlPSJvZmYiLHRoaXMuc3RhcnRUaW1lPTAsdGhpcy5zdGFydFZhbD0wfVQucHJvdG90eXBlLmV2YWw9ZnVuY3Rpb24oaCx0LHMsZSxpLG4pe3N3aXRjaCh0aGlzLnN0YXRlKXtjYXNlIm9mZiI6cmV0dXJuIHQ+MCYmKHRoaXMuc3RhdGU9ImF0dGFjayIsdGhpcy5zdGFydFRpbWU9aCx0aGlzLnN0YXJ0VmFsPTApLDA7Y2FzZSJhdHRhY2siOntsZXQgcj1oLXRoaXMuc3RhcnRUaW1lO3JldHVybiByPnM/KHRoaXMuc3RhdGU9ImRlY2F5Iix0aGlzLnN0YXJ0VGltZT1oLDEpOncoci9zLHRoaXMuc3RhcnRWYWwsMSl9Y2FzZSJkZWNheSI6e2xldCByPWgtdGhpcy5zdGFydFRpbWUsbD13KHIvZSwxLGkpO3JldHVybiB0PD0wPyh0aGlzLnN0YXRlPSJyZWxlYXNlIix0aGlzLnN0YXJ0VGltZT1oLHRoaXMuc3RhcnRWYWw9bCxsKTpyPmU/KHRoaXMuc3RhdGU9InN1c3RhaW4iLHRoaXMuc3RhcnRUaW1lPWgsaSk6bH1jYXNlInN1c3RhaW4iOnJldHVybiB0PD0wJiYodGhpcy5zdGF0ZT0icmVsZWFzZSIsdGhpcy5zdGFydFRpbWU9aCx0aGlzLnN0YXJ0VmFsPWkpLGk7Y2FzZSJyZWxlYXNlIjp7bGV0IHI9aC10aGlzLnN0YXJ0VGltZTtpZihyPm4pcmV0dXJuIHRoaXMuc3RhdGU9Im9mZiIsMDtsZXQgbD13KHIvbix0aGlzLnN0YXJ0VmFsLDApO3JldHVybiB0PjAmJih0aGlzLnN0YXRlPSJhdHRhY2siLHRoaXMuc3RhcnRUaW1lPWgsdGhpcy5zdGFydFZhbD1sKSxsfX10aHJvdyJpbnZhbGlkIGVudmVsb3BlIHN0YXRlIn07ZnVuY3Rpb24gdigpe3RoaXMuczA9MCx0aGlzLnMxPTB9di5wcm90b3R5cGUuYXBwbHk9ZnVuY3Rpb24oaCx0LHMpe2coIWlzTmFOKGgpLCJOYU4gdmFsdWUgZmVkIGluIFR3b1BvbGVGaWx0ZXIiKSx0PU1hdGgubWluKHQsMSkscz1NYXRoLm1heChzLDApO3ZhciBlPU1hdGgucG93KC41LCgxLXQpLy4xMjUpLGk9TWF0aC5wb3coLjUsKHMrLjEyNSkvLjEyNSksbj0xLWkqZSxyPXRoaXMuczAsbD10aGlzLnMxO3JldHVybiByPW4qci1lKmwrZSpoLGw9bipsK2UqcixoPWwsdGhpcy5zMD1yLHRoaXMuczE9bCxofTtsZXQgQT1jbGFzcyBDe2NvbnN0cnVjdG9yKHQscyl7dGhpcy5zYW1wbGVSYXRlPXQscz90aGlzLmJ1ZmZlcj1zLnNsaWNlKDApOih0aGlzLmJ1ZmZlcj1uZXcgRmxvYXQzMkFycmF5KDEwKnQpLHRoaXMuYnVmZmVyLmZpbGwoMCkpLHRoaXMud3JpdGVJZHg9MCx0aGlzLnJlYWRJZHg9MH1yZXNldCgpe3RoaXMuYnVmZmVyLmZpbGwoMCksdGhpcy53cml0ZUlkeD0wLHRoaXMucmVhZElkeD0wfWNsb25lKCl7Y29uc3QgdD1uZXcgQyh0aGlzLnNhbXBsZVJhdGUsdGhpcy5idWZmZXIpO3JldHVybiB0LndyaXRlSWR4PXRoaXMud3JpdGVJZHgsdC5yZWFkSWR4PXRoaXMucmVhZElkeCx0fXdyaXRlKHQscyl7dGhpcy53cml0ZUlkeD0odGhpcy53cml0ZUlkeCsxKSV0aGlzLmJ1ZmZlci5sZW5ndGgsdGhpcy5idWZmZXJbdGhpcy53cml0ZUlkeF09dDtsZXQgZT1NYXRoLm1pbihNYXRoLmZsb29yKHRoaXMuc2FtcGxlUmF0ZSpzKSx0aGlzLmJ1ZmZlci5sZW5ndGgtMSk7dGhpcy5yZWFkSWR4PXRoaXMud3JpdGVJZHgtZSx0aGlzLnJlYWRJZHg8MCYmKHRoaXMucmVhZElkeCs9dGhpcy5idWZmZXIubGVuZ3RoKX1yZWFkKCl7cmV0dXJuIHRoaXMuYnVmZmVyW3RoaXMucmVhZElkeF19fTtjb25zdCB5PTEvNDhlMyxNPTI0LE49TS80O2NsYXNzIG97Y29uc3RydWN0b3IodCxzLGUsaSl7dGhpcy5ub2RlSWQ9dCx0aGlzLnN0YXRlPXMsdGhpcy5zYW1wbGVSYXRlPWUsdGhpcy5zYW1wbGVUaW1lPTEvZSx0aGlzLnNlbmQ9aX19Y2xhc3MgcSBleHRlbmRzIG97Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSksdGhpcy5lbnY9bmV3IFR9dXBkYXRlKHQscyxlLGksbixyKXtyZXR1cm4gdGhpcy5lbnYuZXZhbCh0LHMsZSxpLG4scil9fWNsYXNzIEYgZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMucGhhc2U9MH11cGRhdGUodCl7bGV0IHM9TSp0LzYwLGU9LjU7cmV0dXJuIHRoaXMucGhhc2UrPXRoaXMuc2FtcGxlVGltZSpzLHRoaXMucGhhc2UlMTxlPzE6LTF9fWNsYXNzIEQgZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMuaW5TZ249ITAsdGhpcy5vdXRTZ249ITAsdGhpcy5jbG9ja0NudD0wfXVwZGF0ZSh0LHMpe2xldCBlPXQ+MDtyZXR1cm4gdGhpcy5pblNnbiE9ZSYmKHRoaXMuY2xvY2tDbnQrKyx0aGlzLmNsb2NrQ250Pj1zJiYodGhpcy5jbG9ja0NudD0wLHRoaXMub3V0U2duPSF0aGlzLm91dFNnbikpLHRoaXMuaW5TZ249ZSx0aGlzLm91dFNnbj8xOi0xfX1jbGFzcyBMIGV4dGVuZHMgb3tjb25zdHJ1Y3Rvcih0LHMsZSxpKXtzdXBlcih0LHMsZSxpKSx0aGlzLmluU2duPSExfXVwZGF0ZSh0LHMpe2xldCBlPXM+MDtyZXR1cm4gZSYmdGhpcy5pblNnbiE9ZSYmdGhpcy5zZW5kKHt0eXBlOiJDTE9DS19QVUxTRSIsbm9kZUlkOnRoaXMubm9kZUlkLHRpbWU6dH0pLHRoaXMuaW5TZ249ZSwwfX1jb25zdCBPPW5ldyBNYXA7Y2xhc3MgViBleHRlbmRzIG97Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSk7Y29uc3Qgbj1zLmlucHV0c1syXTtuJiZPLmhhcyhuKT90aGlzLmRlbGF5PU8uZ2V0KG4pLmNsb25lKCk6dGhpcy5kZWxheT1uZXcgQShlKSxuJiZPLnNldChuLHRoaXMuZGVsYXkpfXVwZGF0ZSh0LHMpe3JldHVybiB0aGlzLmRlbGF5LndyaXRlKHQscyksdGhpcy5kZWxheS5yZWFkKCl9fWNsYXNzIEcgZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpfXVwZGF0ZSh0LHMpe3JldHVybiBrKHQscyl9fWNsYXNzIFIgZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMudmFsdWU9MCx0aGlzLnRyaWdTZ249ITF9d3JpdGUodCxzKXshdGhpcy50cmlnU2duJiZzPjAmJih0aGlzLnZhbHVlPXQpLHRoaXMudHJpZ1Nnbj1zPjB9cmVhZCgpe3JldHVybiB0aGlzLnZhbHVlfXVwZGF0ZSh0LHMpe3JldHVybiB0aGlzLndyaXRlKHQscyksdGhpcy5yZWFkKCl9fWNsYXNzIEJ7Y29uc3RydWN0b3IoKXt0aGlzLnZhbHVlPTB9dXBkYXRlKHQpe3JldHVybiB0aGlzLnZhbHVlPXQsdGhpcy52YWx1ZX19Y29uc3QgJD0zNDA7bGV0IEk9MDtjbGFzcyBIe2NvbnN0cnVjdG9yKCl7dGhpcy5jaD1JLHRoaXMuc3RhcnRfc2VlZD0kKih0aGlzLmNoKzEpPj4+MCx0aGlzLnN0YXRlPXRoaXMuc3RhcnRfc2VlZCx0aGlzLnZhbHVlPTAsdGhpcy5hPTE2NjQ1MjUsdGhpcy5jPTEwMTM5MDQyMjMsdGhpcy5tYXNrPTE2Nzc3MjE1LHRoaXMuc2NhbGU9MS8oMTw8MjQpLEkrK311cGRhdGUodCxzKXtpZighdClyZXR1cm4gdGhpcy52YWx1ZTtzJiYodGhpcy5zdGF0ZT10aGlzLnN0YXJ0X3NlZWQpLHRoaXMuc3RhdGU9dGhpcy5zdGF0ZSp0aGlzLmErdGhpcy5jPj4+MDtjb25zdCBlPSh0aGlzLnN0YXRlJnRoaXMubWFzaykqdGhpcy5zY2FsZTtyZXR1cm4gdGhpcy52YWx1ZT1lKjItMSx0aGlzLnZhbHVlfX1jbGFzcyBqe2NvbnN0cnVjdG9yKCl7dGhpcy52YWx1ZT1NYXRoLnJhbmRvbSgpKjItMX11cGRhdGUodCl7cmV0dXJuIHQ/KHRoaXMudmFsdWU9TWF0aC5yYW5kb20oKSoyLTEsdGhpcy52YWx1ZSk6dGhpcy52YWx1ZX19Y2xhc3MgS3t1cGRhdGUodCl7cmV0dXJuIE1hdGgucmFuZG9tKCk8dCp5P01hdGgucmFuZG9tKCk6MH19Y2xhc3MgV3tjb25zdHJ1Y3Rvcigpe3RoaXMub3V0PTB9dXBkYXRlKCl7bGV0IHQ9TWF0aC5yYW5kb20oKSoyLTE7cmV0dXJuIHRoaXMub3V0PSh0aGlzLm91dCsuMDIqdCkvMS4wMix0aGlzLm91dH19Y2xhc3MgWHtjb25zdHJ1Y3Rvcigpe3RoaXMuYjA9MCx0aGlzLmIxPTAsdGhpcy5iMj0wLHRoaXMuYjM9MCx0aGlzLmI0PTAsdGhpcy5iNT0wLHRoaXMuYjY9MH11cGRhdGUoKXtjb25zdCB0PU1hdGgucmFuZG9tKCkqMi0xO3RoaXMuYjA9Ljk5ODg2KnRoaXMuYjArdCouMDU1NTE3OSx0aGlzLmIxPS45OTMzMip0aGlzLmIxK3QqLjA3NTA3NTksdGhpcy5iMj0uOTY5KnRoaXMuYjIrdCouMTUzODUyLHRoaXMuYjM9Ljg2NjUqdGhpcy5iMyt0Ki4zMTA0ODU2LHRoaXMuYjQ9LjU1KnRoaXMuYjQrdCouNTMyOTUyMix0aGlzLmI1PS0uNzYxNip0aGlzLmI1LXQqLjAxNjg5ODtjb25zdCBzPXRoaXMuYjArdGhpcy5iMSt0aGlzLmIyK3RoaXMuYjMrdGhpcy5iNCt0aGlzLmI1K3RoaXMuYjYrdCouNTM2MjtyZXR1cm4gdGhpcy5iNj10Ki4xMTU5MjYscyouMTF9fWNsYXNzIFkgZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMucGhhc2U9MX11cGRhdGUodCl7dGhpcy5waGFzZSs9dGhpcy5zYW1wbGVUaW1lKnQ7bGV0IHM9dGhpcy5waGFzZT49MT8xOjA7cmV0dXJuIHRoaXMucGhhc2U9dGhpcy5waGFzZSUxLHN9fWNsYXNzIHogZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMucGhhc2U9MH11cGRhdGUodCxzKXtyZXR1cm4gdGhpcy5waGFzZSs9dGhpcy5zYW1wbGVUaW1lKnQsdGhpcy5waGFzZSUxPHM/MTotMX19Y2xhc3MgWiBleHRlbmRzIG97Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSksdGhpcy5waGFzZT0wfXVwZGF0ZSh0KXtyZXR1cm4gdGhpcy5waGFzZSs9dGhpcy5zYW1wbGVUaW1lKnQsdGhpcy5waGFzZSUxKjItMX19Y2xhc3MgSntjb25zdHJ1Y3Rvcigpe3RoaXMucGhhc2U9TWF0aC5yYW5kb20oKX11cGRhdGUodCl7Y29uc3Qgcz10L3NhbXBsZVJhdGU7bGV0IGU9RSh0aGlzLnBoYXNlLHMpLGk9Mip0aGlzLnBoYXNlLTEtZTtyZXR1cm4gdGhpcy5waGFzZSs9cyx0aGlzLnBoYXNlPjEmJih0aGlzLnBoYXNlLT0xKSxpfX1jbGFzcyBRIGV4dGVuZHMgb3tjb25zdHJ1Y3Rvcih0LHMsZSxpKXtzdXBlcih0LHMsZSxpKSx0aGlzLnBoYXNlPTAsdGhpcy5zeW5jU2duPSExfXVwZGF0ZSh0LHMsZSl7IXRoaXMuc3luY1NnbiYmcz4wJiYodGhpcy5waGFzZT0wKSx0aGlzLnN5bmNTZ249cz4wO2xldCBpPSh0aGlzLnBoYXNlK2UpJTE7cmV0dXJuIHRoaXMucGhhc2UrPXRoaXMuc2FtcGxlVGltZSp0LE1hdGguc2luKGkqMipNYXRoLlBJKX19Y2xhc3MgdHR7ZEJUb0xpbmVhcih0KXtyZXR1cm4gTWF0aC5wb3coMTAsdC8yMCl9bGluZWFyVG9EQih0KXtyZXR1cm4gMjAqTWF0aC5sb2cxMCh0KX11cGRhdGUodCxzLGUpe2xldCBpPXRoaXMubGluZWFyVG9EQihNYXRoLmFicyh0KSksbj0wO3JldHVybiBpPnMmJihuPShpLXMpKigxLTEvZSkpLHRoaXMuZEJUb0xpbmVhcigtbil9fWNsYXNzIHN0IGV4dGVuZHMgb3tjb25zdHJ1Y3Rvcih0LHMsZSxpKXtzdXBlcih0LHMsZSxpKSx0aGlzLnBoYXNlPTB9dXBkYXRlKHQpe3RoaXMucGhhc2UrPXRoaXMuc2FtcGxlVGltZSp0O2xldCBzPXRoaXMucGhhc2UlMTtyZXR1cm4oczwuNT8yKnM6MS0yKihzLS41KSkqMi0xfX1jbGFzcyBldCBleHRlbmRzIG97Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSk7Y29uc3Qgbj1lLzMwO2coXyhuKSksdGhpcy5idWZmZXI9bmV3IEZsb2F0MzJBcnJheShuKSx0aGlzLndyaXRlUG9zPTB9dXBkYXRlKHQscyxlLGkpe3JldHVybiB0aGlzLmJ1ZmZlclt0aGlzLndyaXRlUG9zXT10LHRoaXMud3JpdGVQb3MrKyx0aGlzLndyaXRlUG9zJXRoaXMuYnVmZmVyLmxlbmd0aD09MCYmKHRoaXMud3JpdGVQb3M9MCx0aGlzLnNlbmQoe3R5cGU6IlNFTkRfU0FNUExFUyIsaWQ6cyxzYW1wbGVzOnRoaXMuYnVmZmVyLGNoYW5uZWxzOmUsY2hhbm5lbDppfSkpLHR9fWNsYXNzIGl0e2NvbnN0cnVjdG9yKCl7dGhpcy5sYWdVbml0PTQ0MTAsdGhpcy5zPTB9dXBkYXRlKHQscyl7cmV0dXJuIHM9cyp0aGlzLmxhZ1VuaXQsczwxJiYocz0xKSx0aGlzLnMrPTEvcyoodC10aGlzLnMpLHRoaXMuc319Y2xhc3MgaHR7Y29uc3RydWN0b3IoKXt0aGlzLmxhc3Q9MH11cGRhdGUodCxzLGUpe2NvbnN0IGk9cyp5LG49ZSp5O2xldCByPXQtdGhpcy5sYXN0O3JldHVybiByPmk/cj1pOnI8LW4mJihyPS1uKSx0aGlzLmxhc3QrPXIsdGhpcy5sYXN0fX1jbGFzcyBhdCBleHRlbmRzIG97Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSksdGhpcy5zPTB9dXBkYXRlKHQscyl7cmV0dXJuIHM9cyoxZTMsczwxJiYocz0xKSx0aGlzLnMrPTEvcyoodC10aGlzLnMpLHRoaXMuc319Y2xhc3MgbnQgZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMuZmlsdGVyPW5ldyB2fXVwZGF0ZSh0LHMsZSl7cmV0dXJuIHRoaXMuZmlsdGVyLmFwcGx5KHQscyxlKSx0aGlzLmZpbHRlci5zMX19Y2xhc3MgcnQgZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMuZmlsdGVyPW5ldyB2fXVwZGF0ZSh0LHMsZSl7cmV0dXJuIHRoaXMuZmlsdGVyLmFwcGx5KHQscyxlKSx0aGlzLmZpbHRlci5zMH19Y2xhc3MgdXQgZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpfXVwZGF0ZSh0LHMpe3JldHVybiBzPDAmJihzPTApLHM9cysxLHQ9dCpzLDQqKE1hdGguYWJzKC4yNSp0Ky4yNS1NYXRoLnJvdW5kKC4yNSp0Ky4yNSkpLS4yNSl9fWNsYXNzIGx0IGV4dGVuZHMgb3t1cGRhdGUodCl7cmV0dXJuIHR9fWNsYXNzIG0gZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMubm90ZT0wLHRoaXMuZnJlcT0wLHRoaXMudmVsb2NpdHk9MCx0aGlzLmdhdGVTdGF0ZT0ib2ZmIix0aGlzLnR5cGU9Im1pZGlpbiIsdGhpcy5jaGFubmVsPS0xfWlzRnJlZSgpe3JldHVybiB0aGlzLmdhdGVTdGF0ZT09PSJvZmYifW5vdGVPbih0LHMpe3M+MD8odGhpcy5ub3RlPXQsdGhpcy52ZWxvY2l0eT1zLHRoaXMuZnJlcT0yKiooKHQtNjkpLzEyKSo0NDAsdGhpcy5nYXRlU3RhdGU9InByZXRyaWciKTp0aGlzLm5vdGVPZmYoKX1ub3RlT2ZmKCl7dGhpcy5ub3RlPTAsdGhpcy5nYXRlU3RhdGU9Im9mZiJ9Z2V0R2F0ZSgpe3N3aXRjaCh0aGlzLmdhdGVTdGF0ZSl7Y2FzZSJwcmV0cmlnIjpyZXR1cm4gdGhpcy5nYXRlU3RhdGU9Im9uIiwwO2Nhc2Uib24iOnJldHVybiAxO2Nhc2Uib2ZmIjpyZXR1cm4gMDtkZWZhdWx0OmcoITEpfX1nZXRGcmVxKCl7c3dpdGNoKHRoaXMuZ2F0ZVN0YXRlKXtjYXNlInByZXRyaWciOnJldHVybiB0aGlzLmdhdGVTdGF0ZT0ib24iLDA7Y2FzZSJvbiI6cmV0dXJuIHRoaXMuZnJlcTtjYXNlIm9mZiI6cmV0dXJuIHRoaXMuZnJlcTtkZWZhdWx0OmcoITEpfX1nZXRWZWxvY2l0eSgpe3N3aXRjaCh0aGlzLmdhdGVTdGF0ZSl7Y2FzZSJwcmV0cmlnIjpyZXR1cm4gdGhpcy5nYXRlU3RhdGU9Im9uIiwwO2Nhc2Uib24iOnJldHVybiB0aGlzLnZlbG9jaXR5O2Nhc2Uib2ZmIjpyZXR1cm4gdGhpcy52ZWxvY2l0eTtkZWZhdWx0OmcoITEpfX19Y2xhc3Mgb3QgZXh0ZW5kcyBte2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMudHlwZT0ibWlkaWdhdGUifXVwZGF0ZSh0KXtyZXR1cm4gdGhpcy5jaGFubmVsPXQsdGhpcy5nZXRHYXRlKCl9fWNsYXNzIGN0IGV4dGVuZHMgbXtjb25zdHJ1Y3Rvcih0LHMsZSxpKXtzdXBlcih0LHMsZSxpKSx0aGlzLnR5cGU9Im1pZGlmcmVxIn11cGRhdGUodCl7cmV0dXJuIHRoaXMuY2hhbm5lbD10LHRoaXMuZ2V0RnJlcSgpfX1jbGFzcyBkdCBleHRlbmRzIG17Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSksdGhpcy50eXBlPSJtaWRpdmVsIn11cGRhdGUodCl7cmV0dXJuIHRoaXMuY2hhbm5lbD10LHRoaXMuZ2V0VmVsb2NpdHkoKX19Y2xhc3MgZnR7Y29uc3RydWN0b3IodCxzLGUsaSl7dGhpcy51cD0hMSx0aGlzLnNlbmQ9aSx0aGlzLnZhbHVlPTAsdGhpcy50eXBlPSJjYyJ9c2V0VmFsdWUodCl7dGhpcy52YWx1ZT10fXVwZGF0ZSh0LHMsZSl7cmV0dXJuIHRoaXMuaWQ9cywhdGhpcy51cCYmdD4wPyh0aGlzLnVwPSEwLHRoaXMuc2VuZCh7dHlwZToiU0lHTkFMX1RSSUdHRVIiLGlkOnMsdGltZTplfSksdGhpcy52YWx1ZSk6KHRoaXMudXA9dD4wLHRoaXMudmFsdWUpfX1jbGFzcyBwdCBleHRlbmRzIG97Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSksdGhpcy50eXBlPSJjYyIsdGhpcy52YWx1ZT1zLmlucHV0c1sxXT8/MH1zZXRWYWx1ZSh0KXt0aGlzLnZhbHVlPXR9dXBkYXRlKHQpe3JldHVybiB0aGlzLmlkPXQsdGhpcy52YWx1ZX19Y2xhc3MgYnQgZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMudHlwZT0ibWlkaWNjIix0aGlzLnZhbHVlPXMuaW5wdXRzWzJdPz8tMSx0aGlzLmNoYW5uZWw9LTEsdGhpcy5jY251bWJlcj0tMX1zZXRWYWx1ZSh0KXt0aGlzLnZhbHVlPXR9dXBkYXRlKHQscyl7cmV0dXJuIHRoaXMuY2NudW1iZXI9dCx0aGlzLmNoYW5uZWw9cyx0aGlzLnZhbHVlfX1jbGFzcyBndCBleHRlbmRzIG97Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSksdGhpcy5jbG9ja1Nnbj0hMCx0aGlzLnN0ZXA9MCx0aGlzLmZpcnN0PSEwfXVwZGF0ZSh0LC4uLnMpe3JldHVybiF0aGlzLmNsb2NrU2duJiZ0PjA/KHRoaXMuc3RlcD0odGhpcy5zdGVwKzEpJXMubGVuZ3RoLHRoaXMuY2xvY2tTZ249dD4wLDApOih0aGlzLmNsb2NrU2duPXQ+MCxzW3RoaXMuc3RlcF0pfX1jbGFzcyBtdCBleHRlbmRzIG97dXBkYXRlKHQsLi4ucyl7Y29uc3QgZT10JXMubGVuZ3RoK3MubGVuZ3RoO3JldHVybiBzW01hdGguZmxvb3IoZSklcy5sZW5ndGhdfX1jbGFzcyBTdHt1cGRhdGUodCxzLGUsaSxuKXtsZXQgcj1QKHQscyxlKTtyZXR1cm4gUyhyLGksbil9fWNsYXNzIHd0e3VwZGF0ZSh0LHMsZSl7cmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHQscyksZSl9fWNsYXNzIHZ0e2NvbnN0cnVjdG9yKCl7dGhpcy5oaT0hMX11cGRhdGUodCl7cmV0dXJuIXRoaXMuaGkmJnQ+MD8odGhpcy5oaT0hMCwxKToodGhpcy5oaSYmdDw9MCYmKHRoaXMuaGk9ITEpLDApfX1jbGFzcyB5dHtjb25zdHJ1Y3Rvcigpe3RoaXMueDE9MCx0aGlzLngyPTAsdGhpcy55MT0wLHRoaXMueTI9MCx0aGlzLmEwPTEsdGhpcy5hMT0wLHRoaXMuYTI9MCx0aGlzLmIwPTEsdGhpcy5iMT0wLHRoaXMuYjI9MH11cGRhdGUodD0wLHM9MCxlPTUwMCxpPTEsbj0xKXtjb25zdCByPTIqTWF0aC5QSSplL3NhbXBsZVJhdGUsbD1NYXRoLnNpbihyKTtpPU1hdGgucG93KDEwLGkvMjApO2NvbnN0IHU9bC8oMippKSxjPU1hdGguY29zKHIpO2lmKHM9PT0wKXRoaXMuYjE9MS1jLHRoaXMuYjA9dGhpcy5iMS8yLHRoaXMuYjI9dGhpcy5iMCx0aGlzLmEwPTErdSx0aGlzLmExPS0yKmMsdGhpcy5hMj0xLXU7ZWxzZSBpZihzPT09MSl0aGlzLmIwPSgxK2MpLzIsdGhpcy5iMT0tKDErYyksdGhpcy5iMj10aGlzLmIwLHRoaXMuYTA9MSt1LHRoaXMuYTE9LTIqYyx0aGlzLmEyPTEtdTtlbHNlIGlmKHM9PT0yKXRoaXMuYjA9bC8yLHRoaXMuYjE9MCx0aGlzLmIyPS10aGlzLmIwLHRoaXMuYTA9MSt1LHRoaXMuYTE9LTIqYyx0aGlzLmEyPTEtdTtlbHNlIGlmKHM9PT0zKXRoaXMuYjA9MSx0aGlzLmIxPS0yKmMsdGhpcy5iMj0xLHRoaXMuYTA9MSt1LHRoaXMuYTE9LTIqYyx0aGlzLmEyPTEtdTtlbHNlIGlmKHM9PT00KXRoaXMuYjA9MS11LHRoaXMuYjE9LTIqYyx0aGlzLmIyPTErdSx0aGlzLmEwPTErdSx0aGlzLmExPS0yKmMsdGhpcy5hMj0xLXU7ZWxzZSBpZihzPT09NSl7Y29uc3QgYT1NYXRoLnBvdygxMCxuLzQwKTt0aGlzLmIwPTErdSphLHRoaXMuYjE9LTIqYyx0aGlzLmIyPTEtdSphLHRoaXMuYTA9MSt1L2EsdGhpcy5hMT0tMipjLHRoaXMuYTI9MS11L2F9ZWxzZSBpZihzPT09Nil7Y29uc3QgYT1NYXRoLnBvdygxMCxuLzQwKSxkPTIqTWF0aC5zcXJ0KGEpKnUsZj0oYS0xKSpjLHA9KGErMSkqYzt0aGlzLmIwPWEqKGErMS1mK2QpLHRoaXMuYjE9MiphKihhLTEtcCksdGhpcy5iMj1hKihhKzEtZi1kKSx0aGlzLmEwPWErMStmK2QsdGhpcy5hMT0tMiooYS0xK3ApLHRoaXMuYTI9YSsxK2YtZH1lbHNlIGlmKHM9PT03KXtjb25zdCBhPU1hdGgucG93KDEwLG4vNDApLGQ9MipNYXRoLnNxcnQoYSkqdSxmPShhLTEpKmMscD0oYSsxKSpjO3RoaXMuYjA9YSooYSsxK2YrZCksdGhpcy5iMT0tMiphKihhLTErcCksdGhpcy5iMj1hKihhKzErZi1kKSx0aGlzLmEwPWErMS1mK2QsdGhpcy5hMT0yKihhLTEtcCksdGhpcy5hMj1hKzEtZi1kfXRoaXMuYjAvPXRoaXMuYTAsdGhpcy5iMS89dGhpcy5hMCx0aGlzLmIyLz10aGlzLmEwLHRoaXMuYTEvPXRoaXMuYTAsdGhpcy5hMi89dGhpcy5hMCx0aGlzLmEwPTE7Y29uc3QgYj10aGlzLmIwKnQrdGhpcy5iMSp0aGlzLngxK3RoaXMuYjIqdGhpcy54Mi10aGlzLmExKnRoaXMueTEtdGhpcy5hMip0aGlzLnkyO3JldHVybiB0aGlzLngyPXRoaXMueDEsdGhpcy54MT10LHRoaXMueTI9dGhpcy55MSx0aGlzLnkxPWIsYn19Y29uc3QgTXQ9T2JqZWN0LmZyZWV6ZShPYmplY3QuZGVmaW5lUHJvcGVydHkoe19fcHJvdG9fXzpudWxsLEFEU1JOb2RlOnEsQXVkaW9JbjpsdCxBdWRpb05vZGU6byxCUEY6cnQsQmlxdWFkRmlsdGVyOnl0LEJyb3duTm9pc2VPc2M6VyxDQzpwdCxDTE9DS19QUFE6TSxDTE9DS19QUFM6TixDbGlwOnd0LENsb2NrOkYsQ2xvY2tEaXY6RCxDbG9ja091dDpMLERlbGF5OlYsRGlzdG9ydDpHLER1c3RPc2M6SyxGaWx0ZXI6bnQsRm9sZDp1dCxIb2xkOlIsSW1wdWxzZU9zYzpZLExhZzppdCxMY2dOb2lzZTpILE1pZGlDQzpidCxNaWRpRnJlcTpjdCxNaWRpR2F0ZTpvdCxNaWRpSW46bSxNaWRpVmVsOmR0LE5vaXNlT3NjOmosT3V0cHV0OkIsUGljazptdCxQaW5rTm9pc2U6WCxQdWxzZU9zYzp6LFJlbWFwOlN0LFNhd09zYzpKLFNjb3BlOmV0LFNlcXVlbmNlOmd0LFNpZGVjaGFpbkNvbXByZXNzb3I6dHQsU2lnbmFsOmZ0LFNpbmVPc2M6USxTbGV3Omh0LFNsaWRlOmF0LFRyaU9zYzpzdCxUcmlnOnZ0LFphd09zYzpafSxTeW1ib2wudG9TdHJpbmdUYWcse3ZhbHVlOiJNb2R1bGUifSkpLHg9bmV3IE1hcChPYmplY3QuZW50cmllcyhNdCkpO2NsYXNzIE90e2NvbnN0cnVjdG9yKHQscyl7Zyh0PT00OGUzKSx0aGlzLnNhbXBsZVJhdGU9dCx0aGlzLnBsYXlQb3M9MCx0aGlzLnNlbmQ9cyx0aGlzLnVuaXRzPVtdLHRoaXMudW5pdElEPTAsdGhpcy5mYWRlVGltZT0uMDEsdGhpcy5tYXhVbml0cz0xLHRoaXMucT1bXX1mYWRlT3V0VW5pdCh0KXt0LmZhZGVPdXQodGhpcy5wbGF5UG9zLHRoaXMuZmFkZVRpbWUpLHRoaXMuZnJlZVVuaXQodC5pZCx0aGlzLmZhZGVUaW1lKX1mYWRlT3V0VW5pdEJ5SWQodCl7Y29uc3Qgcz10aGlzLnVuaXRzLmZpbmQoZT0+ZS5pZD09PXQpO3MmJnRoaXMuZmFkZU91dFVuaXQocyl9ZmFkZU91dEFsbFVuaXRzKCl7dGhpcy51bml0cy5mb3JFYWNoKHQ9PnRoaXMuZmFkZU91dFVuaXQodCkpfWZhZGVPdXRPbGRVbml0cygpe2NvbnN0IHQ9dGhpcy51bml0cy5maWx0ZXIoZT0+ZS5hY3RpdmUpLHM9dC5sZW5ndGgtdGhpcy5tYXhVbml0cztzPD0wfHx0LnNsaWNlKDAscykuZm9yRWFjaChlPT50aGlzLmZhZGVPdXRVbml0KGUpKX1zdG9wKCl7dGhpcy5mYWRlT3V0QWxsVW5pdHMoKSx0aGlzLnNlbmQoe3R5cGU6IlNUT1AiLGZhZGVUaW1lOnRoaXMuZmFkZVRpbWV9KX1zcGF3blVuaXQodCxzKXtjb25zdCBlPW5ldyB4dCh0aGlzLnVuaXRJRCsrLHQsdGhpcy5zYW1wbGVSYXRlLHRoaXMuc2VuZCk7dGhpcy51bml0cy5wdXNoKGUpLGUuZmFkZUluKHRoaXMucGxheVBvcyx0aGlzLmZhZGVUaW1lKSx0aGlzLmZhZGVPdXRPbGRVbml0cygpLGNvbnNvbGUubG9nKGBzcGF3biB1bml0ICR7ZS5pZH0sIHVuaXRzIGFsaXZlOiAke3RoaXMudW5pdHMubGVuZ3RofWApLHMmJnRoaXMuc2NoZWR1bGVNZXNzYWdlKHttc2c6e3R5cGU6IkZBREVfT1VUX1VOSVQiLGlkOmUuaWR9LHRpbWU6c30pfWZyZWVVbml0KHQscyl7aWYocyl7dGhpcy5zY2hlZHVsZU1lc3NhZ2Uoe21zZzp7dHlwZToiRlJFRV9VTklUIixpZDp0fSx0aW1lOnN9KTtyZXR1cm59Y29uc3QgZT10aGlzLnVuaXRzLmxlbmd0aDt0aGlzLnVuaXRzPXRoaXMudW5pdHMuZmlsdGVyKGk9PmkuaWQhPT10KSxlPnRoaXMudW5pdHMubGVuZ3RoJiZjb25zb2xlLmxvZyhgZnJlZSB1bml0ICR7dH0sIHVuaXRzIGFsaXZlOiAke3RoaXMudW5pdHMubGVuZ3RofWApfXBhcnNlTXNnKHQpe3N3aXRjaCh0LnR5cGUpe2Nhc2UiU1BBV05fVU5JVCI6dGhpcy5zcGF3blVuaXQodC51bml0LHQuZHVyYXRpb24pO2JyZWFrO2Nhc2UiRlJFRV9VTklUIjp0aGlzLmZyZWVVbml0KHQuaWQpO2JyZWFrO2Nhc2UiRkFERV9PVVRfVU5JVCI6dGhpcy5mYWRlT3V0VW5pdEJ5SWQodC5pZCk7YnJlYWs7Y2FzZSJOT1RFX09OIjp0aGlzLm5vdGVPbih0KTticmVhaztjYXNlIkNDIjp0aGlzLm1pZGlDQyh0KTticmVhaztjYXNlIlNFVF9DT05UUk9MIjp0aGlzLnNldENvbnRyb2wodCk7YnJlYWs7Y2FzZSJGQURFX1RJTUUiOnRoaXMuZmFkZVRpbWU9TnVtYmVyKHQuZmFkZVRpbWUpO2JyZWFrO2Nhc2UiTUFYX1VOSVRTIjp0aGlzLm1heFVuaXRzPU51bWJlcih0Lm1heFVuaXRzKTticmVhaztjYXNlIlNUT1AiOnRoaXMuc3RvcCgpO2JyZWFrO2Nhc2UiU0VUX1VHRU4iOnRoaXMuYWRkVWdlbih0LmNsYXNzTmFtZSx0LnVnZW4pO2JyZWFrO2Nhc2UiU0NIRURVTEVfTVNHIjp0aGlzLnNjaGVkdWxlTWVzc2FnZSh0KTticmVhaztjYXNlIkJBVENIX01TRyI6dC5tZXNzYWdlcy5mb3JFYWNoKHM9PnRoaXMucGFyc2VNc2cocykpO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IFR5cGVFcnJvcihgdW5rbm93biBtZXNzYWdlIHR5cGUgJHt0LnR5cGV9YCl9fW5vdGVPbih0KXt0aGlzLnVuaXRzLmZvckVhY2gocz0+cy5ub3RlT24odCkpfW1pZGlDQyh0KXt0aGlzLnVuaXRzLmZvckVhY2gocz0+cy5taWRpQ0ModCkpfXNldENvbnRyb2wodCl7dGhpcy51bml0cy5mb3JFYWNoKHM9PnMuc2V0Q29udHJvbCh0KSl9c2NoZWR1bGVNZXNzYWdlKHQpe2lmKHQudGltZT10aGlzLnBsYXlQb3MrdC50aW1lLCF0aGlzLnEubGVuZ3RoKXt0aGlzLnEucHVzaCh0KTtyZXR1cm59bGV0IHM9MDtmb3IoO3M8dGhpcy5xLmxlbmd0aCYmdGhpcy5xW3NdLnRpbWU8dC50aW1lOylzKys7dGhpcy5xLnNwbGljZShzLDAsdCl9Z2VuU2FtcGxlKHQpe2Zvcig7dGhpcy5xLmxlbmd0aD4wJiZ0aGlzLnFbMF0udGltZTw9dGhpcy5wbGF5UG9zOyl0aGlzLnBhcnNlTXNnKHRoaXMucVswXS5tc2cpLHRoaXMucS5zaGlmdCgpO2lmKCF0aGlzLnVuaXRzLmxlbmd0aClyZXR1cm5bMCwwXTtjb25zdCBzPVswLDBdO2ZvcihsZXQgZT0wO2U8dGhpcy51bml0cy5sZW5ndGg7ZSsrKXtjb25zdCBpPXRoaXMudW5pdHNbZV0sbj1pLmdldExldmVsKHRoaXMucGxheVBvcyk7aS5nZW5TYW1wbGUodGhpcy5wbGF5UG9zLGkubm9kZXMsdCxpLnJlZ2lzdGVycyxpLm91dHB1dHMsaS5zb3VyY2VzKSxzWzBdKz1pLm91dHB1dHNbMF0qbixzWzFdKz1pLm91dHB1dHNbMV0qbn1yZXR1cm4gdGhpcy5wbGF5UG9zKz0xLzQ4ZTMsc31hZGRVZ2VuKHQscyl7Y29uc3QgZT1uZXcgRnVuY3Rpb24oYCR7c307cmV0dXJuICR7dH1gKSgpO3guc2V0KHQsZSl9fWNsYXNzIHh0e2NvbnN0cnVjdG9yKHQscyxlLGkpe3RoaXMuaWQ9dCx0aGlzLnNhbXBsZVJhdGU9ZSx0aGlzLnNlbmQ9aSx0aGlzLm5vZGVzPVtdLHRoaXMuYWN0aXZlPSEwO2ZvcihsZXQgciBpbiBzLnVnZW5zKXtjb25zdCBsPXMudWdlbnNbcl07aWYoeC5oYXMobC50eXBlKSl7Y29uc3QgdT14LmdldChsLnR5cGUpLGM9TnVtYmVyKHIpO3RoaXMubm9kZXNbY109bmV3IHUoYyxsLHRoaXMuc2FtcGxlUmF0ZSx0aGlzLnNlbmQpfWVsc2UgY29uc29sZS53YXJuKGB1bmtub3duIHVnZW4gIiR7bC50eXBlfSJgKX10aGlzLnJlZ2lzdGVycz1uZXcgQXJyYXkocy5yZWdpc3RlcnMpLmZpbGwoMCk7bGV0IG49MTY7dGhpcy5vdXRwdXRzPW5ldyBBcnJheShuKS5maWxsKDApLHRoaXMuc291cmNlcz1uZXcgQXJyYXkobikuZmlsbCgwKSxzLnNyYz1gby5maWxsKDApOyAvLyByZXNldCBvdXRwdXRzCmArcy5zcmMsdGhpcy5nZW5TYW1wbGU9bmV3IEZ1bmN0aW9uKCJ0aW1lIiwibm9kZXMiLCJpbnB1dCIsInIiLCJvIiwicyIscy5zcmMpfW5vdGVPbih0KXt2YXIgdSxjLGI7Y29uc3R7Y2hhbm5lbDpzLG5vdGU6ZSx2ZWxvY2l0eTppfT10LG49dGhpcy5ub2Rlcy5maWx0ZXIoYT0+YS50eXBlPT09Im1pZGlmcmVxIiYmKGEuY2hhbm5lbD09PS0xfHxhLmNoYW5uZWw9PT1zKSkscj10aGlzLm5vZGVzLmZpbHRlcihhPT5hLnR5cGU9PT0ibWlkaWdhdGUiJiYoYS5jaGFubmVsPT09LTF8fGEuY2hhbm5lbD09PXMpKSxsPXRoaXMubm9kZXMuZmlsdGVyKGE9PmEudHlwZT09PSJtaWRpdmVsIiYmKGEuY2hhbm5lbD09PS0xfHxhLmNoYW5uZWw9PT1zKSk7aWYoaT4wKXtsZXQgYT1uLmZpbmQocD0+cC5pc0ZyZWUoKSl8fG5bMF0sZD1yLmZpbmQocD0+cC5pc0ZyZWUoKSl8fHJbMF0sZj1sLmZpbmQocD0+cC5pc0ZyZWUoKSl8fGxbMF07YT09bnVsbHx8YS5ub3RlT24oZSxpKSxkPT1udWxsfHxkLm5vdGVPbihlLGkpLGY9PW51bGx8fGYubm90ZU9uKGUsaSl9ZWxzZSh1PW4uZmluZChhPT5hLm5vdGU9PT1lKSk9PW51bGx8fHUubm90ZU9mZigpLChjPXIuZmluZChhPT5hLm5vdGU9PT1lKSk9PW51bGx8fGMubm90ZU9mZigpLChiPWwuZmluZChhPT5hLm5vdGU9PT1lKSk9PW51bGx8fGIubm90ZU9mZigpfW1pZGlDQyh0KXtjb25zdHtjaGFubmVsOnMsY2M6ZSx2YWx1ZTppfT10O3RoaXMubm9kZXMuZm9yRWFjaChuPT57bi50eXBlPT09Im1pZGljYyImJihuLmNoYW5uZWw9PT0tMXx8bi5jaGFubmVsPT09cykmJm4uY2NudW1iZXI9PT1lJiZuLnNldFZhbHVlKGkpfSl9c2V0Q29udHJvbCh0KXtjb25zdHt2YWx1ZTpzLGlkOmV9PXQsaT10aGlzLm5vZGVzLmZpbmQobj0+bi50eXBlPT09ImNjIiYmbi5pZD09PWUpO2kmJmkuc2V0VmFsdWUocyl9Z2V0TGV2ZWwodCl7cmV0dXJuIHRoaXMuZmFkZVN0YXJ0PT09dm9pZCAwPzA6dGhpcy5hY3RpdmU/UygodC10aGlzLmZhZGVTdGFydCkvdGhpcy5mYWRlVGltZSwwLC4zKTpTKCh0LXRoaXMuZmFkZVN0YXJ0KS90aGlzLmZhZGVUaW1lLHRoaXMuZmFkZUZyb20sMCl9ZmFkZUluKHQscyl7dGhpcy5mYWRlU3RhcnQ9dCx0aGlzLmZhZGVUaW1lPXN9ZmFkZU91dCh0LHMpe3RoaXMuZmFkZVRpbWU9cyx0aGlzLmZhZGVGcm9tPXRoaXMuZ2V0TGV2ZWwodCksdGhpcy5hY3RpdmU9ITEsdGhpcy5mYWRlU3RhcnQ9dH1pc0RvbmUodCl7cmV0dXJuIXRoaXMuYWN0aXZlJiZ0aGlzLmdldExldmVsKHQpPT09MH19Y2xhc3MgVHQgZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3J7Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMucG9ydC5vbm1lc3NhZ2U9dGhpcy5vbm1lc3NhZ2UuYmluZCh0aGlzKSx0aGlzLmF1ZGlvR3JhcGg9bmV3IE90KDQ4ZTMsdGhpcy5wb3J0LnBvc3RNZXNzYWdlLmJpbmQodGhpcy5wb3J0KSl9b25tZXNzYWdlKHQpe2xldCBzPXQuZGF0YTt0aGlzLmF1ZGlvR3JhcGgucGFyc2VNc2cocyl9cHJvY2Vzcyh0LHMsZSl7Y29uc3QgaT1zWzBdLG49dFswXVswXSxyPWlbMF0sbD1pWzFdO2ZvcihsZXQgdT0wO3U8ci5sZW5ndGg7dSsrKXtsZXRbYyxiXT10aGlzLmF1ZGlvR3JhcGguZ2VuU2FtcGxlKG4/blt1XTowKTtyW3VdPWMsbFt1XT1ifXJldHVybiEwfX1yZWdpc3RlclByb2Nlc3Nvcigic2FtcGxlLWdlbmVyYXRvciIsVHQpfSkoKTsK";
  var ye = "data:text/javascript;base64,KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2NsYXNzIG4gZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3J7c3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpe3JldHVyblt7bmFtZToiaXNSZWNvcmRpbmciLGRlZmF1bHRWYWx1ZTowfV19Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMuX2J1ZmZlclNpemU9MjA0OCx0aGlzLl9idWZmZXI9bmV3IEZsb2F0MzJBcnJheSh0aGlzLl9idWZmZXJTaXplKSx0aGlzLl9pbml0QnVmZmVyKCl9X2luaXRCdWZmZXIoKXt0aGlzLl9ieXRlc1dyaXR0ZW49MH1faXNCdWZmZXJFbXB0eSgpe3JldHVybiB0aGlzLl9ieXRlc1dyaXR0ZW49PT0wfV9pc0J1ZmZlckZ1bGwoKXtyZXR1cm4gdGhpcy5fYnl0ZXNXcml0dGVuPT09dGhpcy5fYnVmZmVyU2l6ZX1fYXBwZW5kVG9CdWZmZXIoZSl7dGhpcy5faXNCdWZmZXJGdWxsKCkmJnRoaXMuX2ZsdXNoKCksdGhpcy5fYnVmZmVyW3RoaXMuX2J5dGVzV3JpdHRlbl09ZSx0aGlzLl9ieXRlc1dyaXR0ZW4rPTF9X2ZsdXNoKCl7bGV0IGU9dGhpcy5fYnVmZmVyO3RoaXMuX2J5dGVzV3JpdHRlbjx0aGlzLl9idWZmZXJTaXplJiYoZT1lLnNsaWNlKDAsdGhpcy5fYnl0ZXNXcml0dGVuKSksdGhpcy5wb3J0LnBvc3RNZXNzYWdlKHtldmVudFR5cGU6ImRhdGEiLGF1ZGlvQnVmZmVyOmV9KSx0aGlzLl9pbml0QnVmZmVyKCl9X3JlY29yZGluZ1N0b3BwZWQoKXt0aGlzLnBvcnQucG9zdE1lc3NhZ2Uoe2V2ZW50VHlwZToic3RvcCJ9KX1wcm9jZXNzKGUsbyxoKXtjb25zdCBpPWguaXNSZWNvcmRpbmcsZj1vWzBdLHM9ZVswXSx1PWZbMF0sXz1mWzFdO2xldCByPSExO2ZvcihsZXQgdD0wO3Q8dS5sZW5ndGg7dCsrKXQ8aS5sZW5ndGgmJihyPWlbdF09PT0xKSwhciYmIXRoaXMuX2lzQnVmZmVyRW1wdHkoKSYmKHRoaXMuX2ZsdXNoKCksdGhpcy5fcmVjb3JkaW5nU3RvcHBlZCgpKSxyJiYodGhpcy5fYXBwZW5kVG9CdWZmZXIoc1swXVt0XSksdGhpcy5fYXBwZW5kVG9CdWZmZXIoc1sxXVt0XSkpLHVbdF09c1swXVt0XSxfW3RdPXNbMV1bdF07cmV0dXJuITB9fXJlZ2lzdGVyUHJvY2Vzc29yKCJyZWNvcmRlciIsbil9KSgpOwo=";
  function fe(e, t, i) {
    if (e.length < 1)
      return;
    e[0];
    const n = 3, l2 = 32, o = e.map((X2) => X2.length).reduce((X2, z4) => X2 + z4, 0), d2 = l2 / 8, G3 = i * d2, p = 44, m3 = new ArrayBuffer(p + o * d2), r = new DataView(m3);
    V(r, 0, "RIFF"), r.setUint32(4, 36 + o * d2, true), V(r, 8, "WAVE"), V(r, 12, "fmt "), r.setUint32(16, 16, true), r.setUint16(20, n, true), r.setUint16(22, i, true), r.setUint32(24, t, true), r.setUint32(28, t * G3, true), r.setUint16(32, G3, true), r.setUint16(34, l2, true), V(r, 36, "data"), r.setUint32(40, o * d2, true);
    let R3 = 44;
    for (const X2 of e)
      ge(r, R3, X2), R3 += X2.length * d2;
    return m3;
  }
  function V(e, t, i) {
    for (let n = 0; n < i.length; n++)
      e.setUint8(t + n, i.charCodeAt(n));
  }
  function ge(e, t, i) {
    for (var n = 0; n < i.length; n++, t += 4)
      e.setFloat32(t, i[n], true);
  }
  var k = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Node: c,
    compile: T,
    evaluate: j,
    exit: J,
    exportModule: ce,
    getInletName: oe,
    getNode: F,
    module: g,
    n: f,
    node: x,
    nodeRegistry: y,
    outputType: Y,
    polyType: Z,
    register: u,
    registerNode: a
  }, Symbol.toStringTag, { value: "Module" }));
  var Xe = (e) => `Math.sin(${e})`;
  var Ze = (e) => `Math.cos(${e})`;
  var be = (e) => `Math.tan(${e})`;
  var xe = (e) => `Math.asin(${e})`;
  var Re = (e) => `Math.acos(${e})`;
  var Le = (e) => `Math.atan(${e})`;
  var B = (e, t, i) => `${e} = ${t};${i ? ` /* ${i} */` : ""}`;
  var w = (e, ...t) => B(
    e.name,
    `nodes[${e.ugenIndex}].update(${t.join(",")})`,
    e.node.type
  );
  var Me = (e) => `(2 ** ((${e} - 69) / 12) * 440)`;
  var ze = (e, t) => `${e} ** ${t}`;
  var Ve = (e) => `Math.exp(${e})`;
  var We = (e) => `Math.log(${e})`;
  var Ye = (e, t) => `${e}%${t}`;
  var Ne = (e) => `Math.abs(${e})`;
  var He = (e) => `Math.round(${e})`;
  var Se = (e) => `Math.floor(${e})`;
  var Te = (e) => `Math.sign(${e})`;
  var we = (e) => `Math.ceil(${e})`;
  var Ke = (e, t) => `Math.min(${e}, ${t})`;
  var Ce = (e, t) => `Math.max(${e}, ${t})`;
  var ve = (e, t) => `[${e}, ${t}]`;
  var L = (e) => `${e}[0]`;
  var Ie = (e) => `${e}[1]`;
  var Ue = (e, t) => `(${L(e)} < ${L(t)} ? ${e} : ${t})`;
  var ke = (e, t) => `(${L(e)} > ${L(t)} ? ${e} : ${t})`;
  var Pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    abs: Ne,
    ceil: we,
    def: B,
    defAcos: Re,
    defAsin: xe,
    defAtan: Le,
    defCos: Ze,
    defSin: Xe,
    defTan: be,
    defUgen: w,
    exp: Ve,
    floor: Se,
    log: We,
    max: Ce,
    midinote: Me,
    min: Ke,
    mod: Ye,
    pair_a: L,
    pair_a_max: ke,
    pair_a_min: Ue,
    pair_b: Ie,
    pair_make: ve,
    pow: ze,
    round: He,
    sign: Te
  }, Symbol.toStringTag, { value: "Module" }));
  var Fe = class {
    constructor(t = null) {
      this.ugens = /* @__PURE__ */ new Map(), this.outputNode = t;
    }
    async spawn(t, i) {
      this.graph = t;
      const { src: n, ugens: l2, registers: o } = t.compile({
        log: false
      });
      !this.mouse && n.includes("mouse") && this.initMouse(), !this.midiInited && l2.some((d2) => d2.type.startsWith("Midi")) && this.initMidi(), !this.audioIn && l2.some((d2) => d2.type === "AudioIn") && await this.initAudioIn(), this.sendCustomUgens(), this.send({
        type: "SPAWN_UNIT",
        unit: { src: n, ugens: l2, registers: o },
        duration: i
        // experimental
      });
    }
    // ugen is expected to be a class
    registerUgen(t) {
      this.ugens.set(t.name, t);
    }
    // custom ugens
    sendCustomUgens() {
      if (!this.ugens.size)
        return;
      let t = [];
      for (let [i, n] of this.ugens)
        t.push({
          type: "SET_UGEN",
          className: i,
          ugen: n + ""
        });
      this.send({
        type: "BATCH_MSG",
        messages: t
      });
    }
    scheduleMessage(t, i) {
      this.send({
        type: "SCHEDULE_MSG",
        msg: t,
        time: i
      });
    }
    setControl(t, i, n) {
      const l2 = {
        type: "SET_CONTROL",
        id: t,
        value: i
      };
      n ? this.send({ type: "SCHEDULE_MSG", time: n, msg: l2 }) : this.send(l2);
    }
    // controls: { id, value, time }[]
    setControls(t) {
      const i = {
        type: "BATCH_MSG",
        messages: t.map((n) => {
          const l2 = { type: "SET_CONTROL", id: n.id, value: n.value };
          return n.time === void 0 ? l2 : {
            type: "SCHEDULE_MSG",
            time: n.time,
            msg: l2
          };
        })
      };
      this.send(i);
    }
    async initAudioIn() {
      console.log("init audio input...");
      const t = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });
      this.audioCtx.createMediaStreamSource(t).connect(this.audioWorklet);
    }
    initMidi() {
      console.log("init midi input..."), this.midiInited = true, new me().on("midimessage", (i, n) => {
        const l2 = re(n);
        l2 && this.send(l2);
      });
    }
    initMouse() {
      console.log("init mouse"), this.mouse = new he(), this.mouse.on("move", (t, i) => {
        this.setControl("mouseX", t), this.setControl("mouseY", i);
      });
    }
    /**
     * Send a message to the audio thread (audio worket)
     */
    send(t) {
      W(t instanceof Object), this.audioWorklet && this.audioWorklet.port.postMessage(t);
    }
    async init() {
      if (!this.audioCtx) {
        if (W(!this.audioCtx), this.audioCtx = this.outputNode?.context || new AudioContext({
          latencyHint: "interactive",
          sampleRate: 48e3
        }), await this.audioCtx.resume(), !this.audioCtx.audioWorklet)
          throw new Error(
            "Audio cannot be loaded: non-secure origin? (AudioContext.audioWorklet is undefined)"
          );
        await this.audioCtx.audioWorklet.addModule(Ge), await this.audioCtx.audioWorklet.addModule(ye), this.audioWorklet = new AudioWorkletNode(
          this.audioCtx,
          "sample-generator",
          {
            outputChannelCount: [2]
          }
        ), this.audioWorklet.port.onmessage = (t) => {
          const { id: i, time: n, type: l2 } = t.data;
          l2 === "SIGNAL_TRIGGER" ? this.graph.dfs((o) => {
            if (o.type === "signal" && o.id === i) {
              const d2 = o.callback(n, i);
              isNaN(d2) ? d2 !== void 0 && console.warn(
                `expected number from "on" callback with id "${i}", got "${d2}" instead.`
              ) : window.postMessage({
                type: "KABELSALAT_SET_CONTROL",
                value: d2,
                id: i
              });
            }
            return o;
          }) : l2 === "STOP" ? setTimeout(() => this.destroy(), t.data.fadeTime * 1e3 + 200) : l2 === "SEND_SAMPLES" && this.graph.dfs((o) => (o.type !== "scope" || o.ins.length < 2 || o.ins[1].value !== i || window.postMessage({
            type: "KABELSALAT_UPDATE_SCOPE",
            samples: t.data.samples,
            channels: t.data.channels,
            channel: t.data.channel,
            id: i
          }), o));
        }, this.recorder = new window.AudioWorkletNode(this.audioCtx, "recorder"), this.audioWorklet.connect(this.recorder), this.sendCustomUgens(), this.recorder.connect(this.outputNode || this.audioCtx.destination), this.recorder.port.onmessage = (t) => {
          if (t.data.eventType === "data" && this.recordedBuffers.push(t.data.audioBuffer), t.data.eventType === "stop") {
            console.log("recording stopped");
            const i = fe(
              this.recordedBuffers,
              this.audioCtx.sampleRate,
              2
            );
            Je(i, "kabelsalat.wav", "audio/wav"), this.recordedBuffers = [];
          }
        }, this.recordOnPlay && this.record();
      }
    }
    destroy() {
      this.audioWorklet?.disconnect(), this.audioWorklet = null, this.recorder?.disconnect(), this.recorder = null, !this.outputNode && this.audioCtx?.close(), this.audioCtx = null;
    }
    /**
     * Stop audio playback
     */
    stop() {
      this.audioCtx && this.send({ type: "STOP" }), this.mouse?.detach();
    }
    record() {
      if (!this.audioCtx) {
        this.recordOnPlay = true;
        return;
      }
      this.recordedBuffers = [], this.recorder.parameters.get("isRecording").setValueAtTime(1, 0), console.log("recording started");
    }
    stopRecording() {
      this.recordOnPlay = false, this.audioCtx && this.recorder.parameters.get("isRecording").setValueAtTime(0, 0);
    }
    set fadeTime(t) {
      this.send({ type: "FADE_TIME", fadeTime: t });
    }
    set maxUnits(t) {
      this.send({ type: "MAX_UNITS", maxUnits: t });
    }
  };
  function Je(e, t, i) {
    const n = new Blob([e], { type: i }), l2 = document.createElement("a");
    l2.href = window.URL.createObjectURL(n), l2.download = t, l2.click();
  }
  var je = 0;
  var _i = u(
    "signal",
    (e, t) => {
      const i = je++, n = getNode("signal", e, i);
      return n.callback = t, n.id = i, n;
    },
    {
      ugen: "Signal",
      compile: ({ vars: [e, t], ...i }) => w(i, e, t, "time")
    }
  );
  var Qe = (e) => `sin(${e})`;
  var Be = (e) => `cos(${e})`;
  var Ee = (e) => `tan(${e})`;
  var Oe = (e) => `asin(${e})`;
  var $e = (e) => `acos(${e})`;
  var De = (e) => `atan(${e})`;
  var N = (e, t, i) => `${e} = ${t};${i ? ` /* ${i} */` : ""}`;
  var Ae = (e, ...t) => {
    if (t.unshift(`nodes[${e.ugenIndex}]`), e.ugen === "Sequence" || e.ugen === "Pick") {
      const i = t.length - 2, n = `(float[${i}]){${t.slice(2).join(",")}}`;
      return N(
        e.name,
        `${e.ugen}_update(${t[0]}, ${t[1]}, ${i}, ${n})`,
        e.ugen
      );
    }
    return N(e.name, `${e.ugen}_update(${t.join(",")})`, e.ugen);
  };
  var qe = (e) => `pow(2.0, ((${e} - 69.0) / 12.0)) * 440.0`;
  var _e = (e, t) => `pow(${e}, ${t})`;
  var et = (e) => `exp(${e})`;
  var tt = (e) => `log(${e})`;
  var it = (e, t) => `${e}>=${t}?${e}-${t}:${e}`;
  var nt = (e) => `fabs(${e})`;
  var st = (e, t) => `fmin(${e}, ${t})`;
  var lt = (e, t) => `fmax(${e}, ${t})`;
  var at = (e) => `fround(${e})`;
  var ot = (e) => `floor(${e})`;
  var dt = (e) => `ceil(${e})`;
  var ct = (e, t) => `((pair) {${e}, ${t}})`;
  var M = (e) => `${e}.a`;
  var pt = (e) => `${e}.b`;
  var ut = (e, t) => `(${M(e)} < ${M(t)} ? ${e} : ${t})`;
  var mt = (e, t) => `(${M(e)} > ${M(t)} ? ${e} : ${t})`;
  var rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    abs: nt,
    ceil: dt,
    def: N,
    defAcos: $e,
    defAsin: Oe,
    defAtan: De,
    defCos: Be,
    defSin: Qe,
    defTan: Ee,
    defUgen: Ae,
    exp: et,
    floor: ot,
    log: tt,
    max: lt,
    midinote: qe,
    min: st,
    mod: it,
    pair_a: M,
    pair_a_max: mt,
    pair_a_min: ut,
    pair_b: pt,
    pair_make: ct,
    pow: _e,
    round: at
  }, Symbol.toStringTag, { value: "Module" }));
  var s = {
    js: Pe,
    c: rt
  };
  var E = (e, t) => a(e, {
    ugen: t,
    compile: ({ vars: i, ...n }) => s[n.lang].defUgen(n, ...i)
  });
  var ht = u("time", (e) => new c("time", e), {
    tags: ["meta"],
    description: "Returns elapsed time in seconds",
    compile: ({ name: e, lang: t }) => s[t].def(e, "time")
  });
  var Gt = u(
    "raw",
    (e, t) => new c("raw", t).withIns(f(e)),
    {
      ins: [
        { name: "in" },
        {
          name: "code",
          description: "expression with variable `t` being the elapsed time and `$input` the input."
        }
      ],
      tags: ["meta"],
      description: "Raw code node, expects floats between -1 and 1",
      compile: ({ vars: e, node: t, name: i }) => `let $input = ${e[0]}; 
const ${i} = (${t.value}); // raw`,
      examples: [
        `sine(4).range(.5,1)
.raw("(time*110%1*2-1)*$input")
.out()`
      ]
    }
  );
  var yt = u(
    "bytebeat",
    (e, t) => new c("bytebeat", t).withIns(f(e)),
    {
      ins: [
        { name: "t", description: "time in samples" },
        {
          name: "code",
          description: "bytebeat code with variable `t`"
        }
      ],
      tags: ["meta"],
      description: "Bytebeat node, expects numbers from 0 to 255",
      examples: [
        `time().mul(8000).bytebeat\`
// Fractalized Past
// by: lhphr
// from: https://dollchan.net/btb/res/3.html#69

(t>>10^t>>11)%5*((t>>14&3^t>>15&1)+1)*t%99+((3+(t>>14&3)-(t>>16&1))/3*t%99&64)
\`.out()`
      ],
      compile: ({ vars: e, node: t, name: i }) => `let t = ${e[0]}; 
const ${i} = ((${t.value}) & 255) / 127.5 - 1; // bytebeat`
    }
  );
  var ft = u(
    "floatbeat",
    (e, t) => new c("bytebeat", t).withIns(f(e)),
    {
      ins: [
        { name: "t", description: "time in samples" },
        {
          name: "code",
          description: "floatbeat code with variable `t`"
        }
      ],
      tags: ["meta"],
      description: "Raw code node, expects numbers from -1 to 1",
      compile: ({ vars: e, node: t, name: i }) => `let t = ${e[0]}; const ${i} = (${t.value}); // floatbeat`
    }
  );
  var gt = a("adsr", {
    ugen: "ADSRNode",
    tags: ["envelope"],
    description: "ADSR envelope",
    examples: [
      `impulse(1).perc(.5)
.adsr(.01, .1, .5, .1)
.mul(sine(220)).out()`
    ],
    ins: [
      { name: "gate", default: 0, description: "gate input" },
      { name: "att", default: 0.02, description: "attack time" },
      { name: "dec", default: 0.1, description: "decay time" },
      { name: "sus", default: 0.2, description: "sustain level" },
      { name: "rel", default: 0.1, description: "release time" }
    ],
    compile: ({
      vars: [e = 0, t = 0.02, i = 0.1, n = 0.2, l2 = 0.1],
      ...o
    }) => s[o.lang].defUgen(o, "time", e, t, i, n, l2)
  });
  var Xt = g(
    "ar",
    (e = 0, t = 0.02, i = 0.1) => e.adsr(t, 0, 1, i),
    {
      tags: ["envelope"],
      description: "AR envelope",
      examples: ["impulse(1).ad(.01, .1).mul(sine(220)).out()"],
      ins: [
        { name: "trig", default: 0, description: "gate input" },
        { name: "att", default: 0.02, description: "attack time" },
        { name: "rel", default: 0.1, description: "release time" }
      ]
    }
  );
  var Zt = g(
    "ad",
    (e = 0, t = 0.02, i = 0.1) => e.adsr(t, i, 0, i),
    {
      tags: ["envelope"],
      description: "AD envelope",
      examples: ["impulse(1).ad(.01, .1).mul(sine(220)).out()"],
      ins: [
        { name: "trig", default: 0, description: "gate input" },
        { name: "att", default: 0.02, description: "attack time" },
        { name: "dec", default: 0.1, description: "decay time" }
      ]
    }
  );
  var bt = a("clock", {
    ugen: "Clock",
    internal: true,
    // impulse is the preferred way..
    tags: ["regular", "clock"],
    description: "Clock source, with tempo in BPM",
    examples: ["clock(120).clockdiv(16).mul(sine(220)).out()"],
    ins: [
      {
        name: "bpm",
        default: 120,
        description: "clock tempo in bpm (beats per minute)"
      }
    ],
    compile: ({ vars: [e = 120], ...t }) => s[t.lang].defUgen(t, e)
  });
  var xt = a("clockdiv", {
    ugen: "ClockDiv",
    tags: ["clock", "trigger"],
    description: "Clock signal divider",
    examples: ["impulse(8).clockdiv(2).ad(.1,.1).mul(sine(220)).out()"],
    ins: [
      { name: "clock", default: 0, description: "clock input" },
      { name: "divisor", default: 2, description: "tempo divisor" }
    ],
    compile: ({ vars: [e = 0, t = 2], ...i }) => s[i.lang].defUgen(i, e, t)
  });
  var Rt = a("distort", {
    ugen: "Distort",
    tags: ["fx", "distortion"],
    description: "Overdrive-style distortion",
    examples: [
      `sine(220)
.distort( saw(.5).range(0,1) )
.out()`
    ],
    ins: [
      { name: "in", default: 0 },
      { name: "amt", default: 0, description: "distortion amount" }
    ],
    compile: ({ vars: [e = 0, t = 0], ...i }) => s[i.lang].defUgen(i, e, t)
  });
  var O = a("noise", {
    ugen: "NoiseOsc",
    tags: ["source", "noise"],
    description: "White noise source",
    examples: ["noise().mul(.25).out()"],
    ins: [
      {
        name: "next",
        default: 1,
        description: "if 0, the noise will hold the previous value. defaults to 1."
      }
    ],
    compile: ({ lang: e, vars: [t = 1], ...i }) => s[e].defUgen(i, t)
  });
  var Lt = a("lcgnoise", {
    ugen: "LcgNoise",
    tags: ["source", "noise"],
    description: "Lcg white noise source.",
    examples: ["lcgnoise().mul(.25).out()"],
    ins: [
      {
        name: "next",
        default: 1,
        description: "if 0, the noise will hold the previous value. defaults to 1."
      },
      {
        name: "reset",
        default: 0,
        description: "if 1, the random number generator sequence will reset."
      }
    ],
    compile: ({ lang: e, vars: [t = 1, i = 0], ...n }) => s[e].defUgen(n, t, i)
  });
  var Mt = a("pink", {
    ugen: "PinkNoise",
    tags: ["source", "noise"],
    description: "Pink noise source",
    examples: ["pink().mul(.5).out()"],
    ins: [],
    compile: ({ lang: e, ...t }) => s[e].defUgen(t)
  });
  var zt = a("brown", {
    ugen: "BrownNoiseOsc",
    tags: ["source", "noise"],
    description: "Brown noise source",
    examples: ["brown().out()"],
    ins: [],
    compile: ({ lang: e, ...t }) => s[e].defUgen(t)
  });
  var Vt = a("dust", {
    ugen: "DustOsc",
    tags: ["trigger", "noise", "source"],
    description: "Generates random impulses from 0 to +1.",
    examples: ["dust(200).out()"],
    ins: [
      { name: "density", default: 0, description: "average impulses per second" }
    ],
    compile: ({ vars: [e = 0], ...t }) => s[t.lang].defUgen(t, e)
  });
  var $ = a("impulse", {
    ugen: "ImpulseOsc",
    tags: ["regular", "trigger"],
    description: "Regular single sample impulses (0 - 1)",
    examples: ["impulse(10).out()"],
    ins: [
      { name: "freq", default: 0 },
      { name: "phase", default: 0 }
    ],
    compile: ({ vars: [e = 0, t = 0], ...i }) => s[i.lang].defUgen(i, e, t)
  });
  var Wt = a("saw", {
    ugen: "SawOsc",
    tags: ["regular", "waveform", "source"],
    description: "Sawtooth wave oscillator with anti aliasing",
    examples: ["saw(110).mul(.5).out()"],
    ins: [{ name: "freq", default: 0 }],
    compile: ({ vars: [e = 0], ...t }) => s[t.lang].defUgen(t, e)
  });
  var Yt = a("zaw", {
    ugen: "ZawOsc",
    tags: ["regular", "waveform", "source"],
    description: "Sawtooth wave oscillator with sharp edges. Use saw for anti aliased variant.",
    examples: ["zaw(110).mul(.5).out()"],
    ins: [{ name: "freq", default: 0 }],
    compile: ({ vars: [e = 0], ...t }) => s[t.lang].defUgen(t, e)
  });
  var Nt = a("sine", {
    tags: ["regular", "waveform", "source"],
    ugen: "SineOsc",
    description: "Sine wave oscillator",
    examples: ["sine(220).out()"],
    ins: [
      { name: "freq", default: 0 },
      { name: "sync", default: 0, description: "sync input" },
      { name: "phase", default: 0, description: "phase offset" }
    ],
    compile: ({ vars: [e = 0, t = 0, i = 0], ...n }) => s[n.lang].defUgen(n, e, t, i)
  });
  var Ht = a("tri", {
    ugen: "TriOsc",
    tags: ["regular", "waveform", "source"],
    description: "Triangle wave oscillator",
    examples: ["tri(220).out()"],
    ins: [{ name: "freq", default: 0 }],
    compile: ({ vars: [e = 0], ...t }) => s[t.lang].defUgen(t, e)
  });
  var St = a("pulse", {
    ugen: "PulseOsc",
    tags: ["regular", "waveform", "source"],
    description: "Pulse wave oscillator",
    examples: ["pulse(220, sine(.1).range(.1,.5)).mul(.5).out()"],
    ins: [
      { name: "freq", default: 0 },
      { name: "pw", default: 0.5, description: "pulse width 0 - 1" }
    ],
    compile: ({ vars: [e = 0, t = 0.5], ...i }) => s[i.lang].defUgen(i, e, t)
  });
  var Tt = a("slide", {
    ugen: "Slide",
    tags: ["fx"],
    internal: true,
    description: "Slide/portamento node",
    examples: [
      `impulse(2).seq(55,110,220,330)
.slide(4).sine().out()`
    ],
    ins: [
      { name: "in", default: 0 },
      { name: "rate", default: 1 }
    ],
    compile: ({ vars: [e = 0, t = 1], ...i }) => s[i.lang].defUgen(i, e, t)
  });
  var wt = a("lag", {
    ugen: "Lag",
    tags: ["fx"],
    description: "Smoothes a signal. Good for slide / portamento effects.",
    examples: [
      `impulse(2).seq(220,330,440,550)
.lag(.4).sine().out()`
    ],
    ins: [
      { name: "in", default: 0 },
      { name: "rate", default: 1, description: "60 dB lag time in seconds" }
    ],
    compile: ({ vars: [e = 0, t = 1], ...i }) => s[i.lang].defUgen(i, e, t)
  });
  var Kt = a("slew", {
    ugen: "Slew",
    tags: ["fx"],
    description: "Limits the slope of an input signal. The slope is expressed in units per second.",
    examples: ["pulse(800).slew(4000, 4000).out()"],
    ins: [
      { name: "in", default: 0 },
      {
        name: "up",
        default: 1,
        description: "Maximum upward slope in units per second"
      },
      {
        name: "dn",
        default: 1,
        description: "Maximum downward slope in units per second"
      }
    ],
    compile: ({ vars: [e = 0, t = 1, i = 1], ...n }) => s[n.lang].defUgen(n, e, t, i)
  });
  var D = a("filter", {
    ugen: "Filter",
    tags: ["fx", "filter"],
    internal: true,
    description: "Two-pole low-pass filter",
    examples: ["saw(55).lpf( sine(1).range(.4,.8) ).out()"],
    ins: [
      { name: "in", default: 0 },
      { name: "cutoff", default: 1 },
      { name: "reso", default: 0 }
    ],
    compile: ({ vars: [e = 0, t = 1, i = 0], ...n }) => s[n.lang].defUgen(n, e, t, i)
  });
  var Ct = a("fold", {
    ugen: "Fold",
    tags: ["fx", "distortion", "limiter"],
    description: 'Distort incoming audio signal by "folding"',
    examples: [
      `sine(55)
.fold( sine(.5).range(0.2,4) )
.out()`
    ],
    ins: [
      { name: "in", default: 0 },
      { name: "rate", default: 0 }
    ],
    compile: ({ vars: [e = 0, t = 0], ...i }) => s[i.lang].defUgen(i, e, t)
  });
  var vt = a("seq", {
    ugen: "Sequence",
    tags: ["sequencer"],
    description: "Trigger controlled sequencer",
    examples: [
      `impulse(2).seq(220,330,440,550)
.sine().out()`
    ],
    ins: [
      { name: "trig", default: 0 },
      { name: "step", default: 0, dynamic: true, description: "step inputs" }
      // 1-Infinity of steps
    ],
    compile: ({ vars: e, ...t }) => s[t.lang].defUgen(t, ...e)
  });
  var It = a("delay", {
    ugen: "Delay",
    tags: ["fx"],
    description: "Delay line node",
    examples: [
      `impulse(1).ad(.01,.2).mul(sine(220))
.add(x=>x.delay(.1).mul(.8)).out()`
    ],
    ins: [
      { name: "in", default: 0 },
      { name: "time", default: 0 }
    ],
    compile: ({ vars: [e = 0, t = 0], ...i }) => s[i.lang].defUgen(i, e, t)
  });
  var Ut = a("hold", {
    ugen: "Hold",
    tags: ["fx"],
    description: "Sample and hold",
    examples: [
      `noise().hold(impulse(2))
.range(220,880).sine().out()`
    ],
    ins: [
      { name: "in", default: 0 },
      { name: "trig", default: 0 }
    ],
    compile: ({ vars: [e = 0, t = 0], ...i }) => s[i.lang].defUgen(i, e, t)
  });
  var kt = a("midifreq", {
    ugen: "MidiFreq",
    tags: ["external", "midi"],
    description: "Outputs frequency of midi note in. Multiple instances will do voice allocation",
    examples: ["midifreq().sine().out()"],
    ins: [
      {
        name: "channel",
        default: -1,
        description: "Channel filter. Defaults to all channels"
      }
    ],
    compile: ({ vars: [e = -1], ...t }) => s[t.lang].defUgen(t, e)
  });
  var Pt = a("midigate", {
    ugen: "MidiGate",
    tags: ["external", "midi"],
    description: "outputs gate of midi note in. Multiple instances will do voice allocation",
    examples: ["midigate().lag(1).mul(sine(220)).out()"],
    ins: [{ name: "channel", default: -1 }],
    compile: ({ vars: [e = -1], ...t }) => s[t.lang].defUgen(t, e)
  });
  var Ft = a("midivel", {
    ugen: "MidiVel",
    tags: ["external", "midi"],
    description: "outputs velocity of midi note in. Multiple instances will do voice allocation",
    examples: [
      "midigate().ar(0.01,0.2).mul(saw(midifreq())).mul(midivel()).mul(.8).out()"
    ],
    ins: [{ name: "channel", default: -1 }],
    compile: ({ vars: [e = -1], ...t }) => s[t.lang].defUgen(t, e)
  });
  var Jt = a("midicc", {
    ugen: "MidiCC",
    tags: ["external", "midi"],
    description: "Outputs bipolar value of given midi cc number. initValue can be set to be the output before getting first cc message.",
    examples: ["midicc(74).range(100,200).sine().out()"],
    ins: [
      { name: "ccnumber", default: -1 },
      { name: "channel", default: -1 },
      { name: "initValue", default: -1 }
      // could not name it "default" because syntax error
    ],
    compile: ({ vars: [e = -1, t = -1], ...i }) => s[i.lang].defUgen(i, e, t)
  });
  var K = a("cc", {
    ugen: "CC",
    tags: ["external"],
    description: "CC control",
    ins: [
      { name: "id", default: 0 },
      { name: "value", default: 0 }
    ],
    compile: ({ vars: [e], ...t }) => s[t.lang].defUgen(t, e)
  });
  var jt = a("audioin", {
    ugen: "AudioIn",
    tags: ["source", "external"],
    description: "External Audio Input, depends on your system input",
    examples: ["audioin().add(x=>x.delay(.1).mul(.8)).out()"],
    ins: [],
    compile: (e) => s[e.lang].defUgen(e, "input")
  });
  var H = a("log", {
    tags: ["math"],
    description: "calculates the logarithm (base 10) of the input signal",
    ins: [{ name: "in" }],
    compile: ({ vars: [e = 0], name: t, lang: i }) => s[i].def(t, s[i].log(e))
  });
  var A = a("exp", {
    tags: ["math"],
    description: "raises e to the power of the input signal",
    ins: [{ name: "in" }],
    compile: ({ vars: [e = 0], name: t, lang: i }) => s[i].def(t, s[i].exp(e))
  });
  var Qt = a("pow", {
    tags: ["math"],
    description: "raises the input to the given power",
    ins: [{ name: "in" }, { name: "power" }],
    compile: ({ vars: [e = 0, t = 1], name: i, lang: n }) => s[n].def(i, s[n].pow(e, t))
  });
  var q = a("sin", {
    tags: ["math"],
    description: "calculates the sine of the input signal",
    ins: [{ name: "in" }],
    compile: ({ vars: [e = 0], name: t, lang: i }) => s[i].def(t, s[i].defSin(e))
  });
  var _ = a("cos", {
    tags: ["math"],
    description: "calculates the cosine of the input signal",
    ins: [{ name: "in" }],
    compile: ({ vars: [e = 0], name: t, lang: i }) => s[i].def(t, s[i].defCos(e))
  });
  var Bt = a("tan", {
    tags: ["math"],
    description: "calculates the tan of the input signal",
    ins: [{ name: "in" }],
    compile: ({ vars: [e = 0], name: t, lang: i }) => s[i].def(t, s[i].defTan(e))
  });
  var Et = a("acos", {
    tags: ["math"],
    description: "calculates the acos of the input signal",
    ins: [{ name: "in" }],
    compile: ({ vars: [e = 0], name: t, lang: i }) => s[i].def(t, s[i].defAcos(e))
  });
  var Ot = a("asin", {
    tags: ["math"],
    description: "calculates the asin of the input signal",
    ins: [{ name: "in" }],
    compile: ({ vars: [e = 0], name: t, lang: i }) => s[i].def(t, s[i].defAsin(e))
  });
  var $t = a("atan", {
    tags: ["math"],
    description: "calculates the atan of the input signal",
    ins: [{ name: "in" }],
    compile: ({ vars: [e = 0], name: t, lang: i }) => s[i].def(t, s[i].defAtan(e))
  });
  var Dt = a("mul", {
    tags: ["math"],
    description: "Multiplies the given signals.",
    examples: ["sine(220).mul( sine(4).range(.25,1) ).out()"],
    ins: [{ name: "in", dynamic: true }],
    compile: ({ vars: e, name: t, lang: i }) => s[i].def(t, e.join(" * ") || 0)
  });
  var C = a("add", {
    tags: ["math"],
    description: "sums the given signals",
    examples: ["n([0,3,7,10]).add(60).midinote().sine().mix(2).out()"],
    ins: [{ name: "in", dynamic: true }],
    compile: ({ vars: e, name: t, lang: i }) => s[i].def(t, e.join(" + ") || 0)
  });
  var At = a("div", {
    tags: ["math"],
    description: "adds the given signals",
    ins: [{ name: "in", dynamic: true }],
    compile: ({ vars: e, name: t, lang: i }) => s[i].def(t, e.join(" / ") || 0)
  });
  var qt = a("sub", {
    tags: ["math"],
    description: "subtracts the given signals",
    ins: [{ name: "in", dynamic: true }],
    compile: ({ vars: e, name: t, lang: i }) => s[i].def(t, e.join(" - ") || 0)
  });
  var _t = a("mod", {
    tags: ["math"],
    description: "calculates the modulo",
    examples: ["add(x=>x.add(.003).mod(1)).out()"],
    ins: [{ name: "in" }, { name: "modulo" }],
    compile: ({ vars: e, name: t, lang: i }) => s[i].def(t, s[i].mod(...e) || 0)
  });
  var ei = a("abs", {
    tags: ["math"],
    description: "returns the absolute value of the signal",
    ins: [{ name: "in" }],
    examples: ["sine(440).abs().out()"],
    compile: ({ vars: [e = 0], name: t, lang: i }) => s[i].def(t, s[i].abs(e))
  });
  var ti = a("round", {
    tags: ["math"],
    description: "Rounds the signal to the nearest integer",
    ins: [{ name: "in" }],
    examples: ["sine(440.5).round().out()"],
    compile: ({ vars: [e = 0], name: t, lang: i }) => s[i].def(t, s[i].round(e))
  });
  var ii = a("clamp", {
    tags: ["math"],
    description: "Clamps the signal to stay within the given range",
    ins: [{ name: "in" }, { name: "min" }, { name: "max" }],
    examples: ["sine(440.5).clamp(-.6,.6).out()"],
    compile: ({ vars: [e = 0, t = -1, i = 1], name: n, lang: l2 }) => {
      const o = s[l2].min(t, i), d2 = s[l2].max(t, i), G3 = s[l2].min(s[l2].max(e, o), d2);
      return s[l2].def(n, G3);
    }
  });
  var ni = a("floor", {
    tags: ["math"],
    description: "Rounds the signal down",
    ins: [{ name: "in" }],
    examples: ["sine(440.5).floor().out()"],
    compile: ({ vars: [e = 0], name: t, lang: i }) => s[i].def(t, s[i].floor(e))
  });
  var si = a("ceil", {
    tags: ["math"],
    description: "Rounds the signal up",
    ins: [{ name: "in" }],
    examples: ["sine(440.5).ceil().out()"],
    compile: ({ vars: [e = 0], name: t, lang: i }) => s[i].def(t, s[i].ceil(e))
  });
  var li = a("sign", {
    tags: ["math"],
    description: "Returns 1 if positive and -1 if negative. uses Math.sign",
    ins: [{ name: "in" }],
    examples: ["sine(440.5).ceil().out()"],
    compile: ({ vars: [e = 0], name: t, lang: i }) => s[i].def(t, s[i].sign(e))
  });
  var ai = a("min", {
    tags: ["math"],
    description: "returns the minimum of the given signals",
    examples: [
      "impulse(4).apply(x => min(x.seq(0,3,2), x.seq(0,7,0,5,0)).add(48).midinote().sine()).out()"
    ],
    ins: [{ name: "in", dynamic: true }],
    compile: ({ vars: e, name: t, lang: i }) => s[i].def(t, e.reduce(s[i].min) || 0)
  });
  var oi = a("max", {
    tags: ["math"],
    description: "returns the maximum of the given signals",
    examples: [
      "impulse(4).apply(x => max(x.seq(0,3,2), x.seq(0,7,0,5,0)).add(48).midinote().sine()).out()"
    ],
    ins: [{ name: "in", dynamic: true }],
    compile: ({ vars: e, name: t, lang: i }) => s[i].def(t, e.reduce(s[i].max) || 0)
  });
  var di = a("argmin", {
    tags: ["math"],
    description: "returns the index of the minimum of the given signals",
    examples: [
      "argmin(saw(1), saw(3), saw(5)).mul(12).add(48).midinote().sine().out()"
    ],
    ins: [{ name: "in", dynamic: true }],
    compile: ({ vars: e, name: t, lang: i }) => s[i].def(
      t,
      s[i].pair_b(
        e.map(s[i].pair_make).reduce(s[i].pair_a_min)
      ) || 0
    )
  });
  var ci = a("argmax", {
    tags: ["math"],
    description: "returns the index of the maximum of the given signals",
    examples: [
      "argmax(saw(1), saw(3), saw(5)).mul(12).add(48).midinote().sine().out()"
    ],
    ins: [{ name: "in", dynamic: true }],
    compile: ({ vars: e, name: t, lang: i }) => s[i].def(
      t,
      s[i].pair_b(
        e.map(s[i].pair_make).reduce(s[i].pair_a_max)
      ) || 0
    )
  });
  var ee = a("greater", {
    tags: ["logic"],
    description: "returns 1 if input is greater then threshold",
    ins: [{ name: "in" }, { name: "threshold" }],
    examples: [
      `greater(sine(1),0)
.bipolar().range(100,200)
.sine().out()`
    ],
    compile: ({ vars: [e = 0, t = 0], name: i, lang: n }) => s[n].def(i, `${e} > ${t}`)
  });
  var te = a("lower", {
    tags: ["logic"],
    description: "returns 1 if input is lower then threshold",
    ins: [{ name: "in" }, { name: "threshold" }],
    examples: [
      `lower(sine(1),0)
.bipolar().range(100,200)
.sine().out()`
    ],
    compile: ({ vars: [e = 0, t = 0], name: i, lang: n }) => s[n].def(i, `${e} < ${t}`)
  });
  var pi = ee;
  var ui = te;
  var mi = a("xor", {
    tags: ["logic"],
    description: "returns 1 if exactly one of the inputs is 1",
    ins: [{ name: "a" }, { name: "b" }],
    compile: ({ vars: [e = 0, t = 0], name: i, lang: n }) => s[n].def(i, `${e} != ${t} ? 1 : 0`)
  });
  var ri = a("and", {
    tags: ["logic"],
    description: "returns 1 if both inputs are 1",
    ins: [{ name: "a" }, { name: "b" }],
    compile: ({ vars: [e = 0, t = 0], name: i, lang: n }) => s[n].def(i, `${e} && ${t} ? 1 : 0`)
  });
  var hi = a("or", {
    tags: ["logic"],
    description: "returns 1 if one or both inputs are 1",
    ins: [{ name: "a" }, { name: "b" }],
    compile: ({ vars: [e = 0, t = 0], name: i, lang: n }) => s[n].def(i, `${e} || ${t} ? 1 : 0`)
  });
  var Gi = a("not", {
    tags: ["logic"],
    description: "returns 1 if input is 0, otherwise 0",
    ins: [{ name: "in" }],
    compile: ({ vars: [e = 0], name: t, lang: i }) => s[i].def(t, `(${e} === 0 ? 1 : 0)`)
  });
  var yi = a("bool", {
    tags: ["logic"],
    description: "returns 1 signal is non zero. inspired by genish",
    ins: [{ name: "a" }],
    compile: ({ vars: [e = 0], name: t, lang: i }) => s[i].def(t, `(${e} === 0 ? 0 : 1)`)
  });
  var fi = a("ifelse", {
    tags: ["logic"],
    description: "if control is 1, a is returned, otherwise b",
    ins: [{ name: "control" }, { name: "a" }, { name: "b" }],
    compile: ({ vars: [e = 0, t = 0, i = 0], name: n, lang: l2 }) => s[l2].def(n, `(${e} === 1 ? ${t} : ${i})`),
    examples: ["ifelse(pulse(1), sine(220), sine(330)).out()"]
  });
  var gi = a("range", {
    tags: ["math"],
    description: "Scales the incoming bipolar value to the given range.",
    examples: ["sine(.5).range(.25,1).mul(sine(440)).out()"],
    ins: [{ name: "in" }, { name: "min" }, { name: "max" }],
    compile: ({ vars: e, name: t, lang: i }) => {
      const [n, l2, o, d2 = 1] = e, G3 = `((${n} + 1) * 0.5)`, p = d2 === 1 ? G3 : s[i].pow(G3, d2);
      return s[i].def(t, `${p} * (${o} - ${l2}) + ${l2}`);
    }
  });
  var Xi = a("remap", {
    ugen: "Remap",
    tags: ["math"],
    description: "Remaps input from one value range to another",
    ins: [
      { name: "in" },
      { name: "inmin" },
      { name: "inmax" },
      { name: "outmin" },
      { name: "outmax" }
    ],
    // examples: [`sine(440).abs().out()`],
    compile: ({
      vars: [e = 0, t = -1, i = 1, n = -1, l2 = 1],
      ...o
    }) => s[o.lang].defUgen(o, e, t, i, n, l2)
  });
  var Zi = a("thru", {
    compile: ({ name: e, vars: t, lang: i }) => s[i].def(e, t[0], "thru")
  });
  var bi = g(
    "rangex",
    (e, t, i) => {
      let n = H(t), l2 = H(i).sub(n), d2 = e.unipolar().mul(l2).add(n);
      return A(d2);
    },
    {
      tags: ["math"],
      description: "exponential range",
      ins: [{ name: "in" }, { name: "min" }, { name: "max" }],
      examples: ["sine([1,3]).rangex(100, 2e3).sine().out()"]
    }
  );
  var xi = a("midinote", {
    compile: ({ vars: [e], name: t, lang: i }) => s[i].def(t, s[i].midinote(e)),
    tags: ["math"],
    description: "convert midi number to frequency",
    ins: [{ name: "midi" }],
    examples: [
      `impulse(4).seq(0,3,7,12).add(60)
.midinote().sine().out()`
    ]
  });
  var Ri = a("src", {
    internal: true,
    compile: ({ vars: [e = 0], name: t, lang: i, ...n }) => s[i].def(t, n.getSource(e), `read source ${e}`)
  });
  var Li = a("output", {
    internal: true,
    ugen: "Output",
    compile: ({ vars: [e, t = 0], name: i, lang: n, ...l2 }) => {
      const o = l2.getOutput(t), d2 = l2.getSource(t);
      return [
        s[n].def(o, [o, e].join(" + "), `+ output ${t}`),
        s[n].def(d2, o, `write source ${t}`)
      ].join(`
`);
    }
  });
  var ie = a("poly");
  var ne = f(Math.PI);
  var Mi = u(
    "fork",
    (e, t = 1) => ie(...Array.from({ length: t }, () => e.clone())),
    {
      ins: [{ name: "in" }, { name: "times" }],
      tags: ["multi-channel"],
      description: "split the signal into n channels",
      examples: ["dust(4).fork(2).adsr(.1).mul(sine(220)).out()"]
    }
  );
  var zi = g("perc", (e, t) => e.adsr(0, 0, 1, t), {
    tags: ["envelope"],
    description: "percussive envelope. usable with triggers or gates",
    ins: [{ name: "gate" }, { name: "release" }],
    examples: ["impulse(4).perc(.1).mul( pink() ).out()"]
  });
  var Vi = g(
    "hpf",
    (e, t, i = 0) => e.sub(e.lpf(t, i)),
    {
      ins: [{ name: "in" }, { name: "cutoff" }, { name: "reso" }],
      description: "high pass filter",
      tags: ["fx", "filter"],
      examples: ["tri([220,331,442]).mix().hpf(sine(.5).range(0,.9)).out()"]
    }
  );
  var Wi = g("lpf", D, {
    ins: [{ name: "in" }, { name: "cutoff" }, { name: "reso" }],
    description: "low pass filter",
    tags: ["fx", "filter"],
    examples: ["saw(55).lpf( sine(1).range(.4,.8) ).out()"]
  });
  var Yi = a("bpf", {
    ugen: "BPF",
    ins: [{ name: "in" }, { name: "cutoff" }, { name: "reso" }],
    description: "high pass filter",
    tags: ["fx", "filter"],
    compile: ({ vars: [e = 0, t = 1, i = 0], ...n }) => s[n.lang].defUgen(n, e, t, i)
  });
  var Ni = g("lfnoise", (e) => O().hold($(e)), {
    ins: [{ name: "freq" }],
    description: "low frequency stepped noise.",
    tags: ["regular", "noise"],
    examples: ["lfnoise(4).range(200,800).sine().out()"]
  });
  var Hi = g(
    "bipolar",
    (e) => f(e).mul(2).sub(1),
    {
      ins: [{ name: "in" }],
      description: "convert unipolar [0,1] signal to bipolar [-1,1]",
      tags: ["math"]
      // examples: [], // tbd
    }
  );
  var Si = g(
    "unipolar",
    (e) => f(e).add(1).div(2),
    {
      ins: [{ name: "in" }],
      description: "convert bipolar [-1,1] signal to unipolar [0,1]",
      tags: ["math"]
      // examples: [], // tbd
    }
  );
  var Ti = g(
    "pan",
    (e, t) => (t = f(t).add(1).mul(ne, 0.25), e.mul([_(t), q(t)])),
    {
      ins: [
        { name: "in" },
        {
          name: "pos",
          description: "bipolar position: -1 = left, 0 = center, 1 = right"
        }
      ],
      description: "pans signal to stereo position. splits signal path in 2",
      tags: ["multi-channel"],
      examples: ["sine(220).pan(sine(.25)).out()"]
    }
  );
  var wi = a("pick", {
    tags: ["multi-channel"],
    ugen: "Pick",
    description: "Pick",
    ins: [{ name: "index" }, { name: "inputs", dynamic: true }],
    description: "picks input of given index",
    examples: [
      `sine(.25).range(0,2).round()
.pick(...sine([220,330,440]).ins)
.out()`
    ],
    compile: ({ vars: e, ...t }) => s[t.lang].defUgen(t, ...e)
  });
  var Ki = a("clip", {
    tags: ["fx"],
    ugen: "Clip",
    description: "Hard limits the signal between lo and hi.",
    ins: [{ name: "input" }, { name: "lo" }, { name: "hi" }],
    compile: ({ vars: [e = 0, t = -1, i = 1], ...n }) => s[n.lang].defUgen(n, e, t, i)
  });
  var Ci = a("trig", {
    tags: ["trigger"],
    ugen: "Trig",
    description: "Emits a trigger impulse whenever the signal becomes positive. Useful to turn gates into triggers.",
    ins: [
      { name: "input", default: 0 },
      { name: "lo", default: -1 },
      { name: "hi", default: 1 }
    ],
    compile: ({ vars: [e = 0, t = -1, i = 1], ...n }) => s[n.lang].defUgen(n, e, t, i),
    examples: [
      `pulse(2)
.trig() // comment out to hear difference
.ar(.01,.2)
.mul(sine(200)).out()`
    ]
  });
  var vi = a("qf", {
    tags: ["fx", "filter"],
    ugen: "BiquadFilter",
    description: "biQuad Filter.",
    ins: [
      { name: "input", default: 0 },
      {
        name: "type",
        default: 0,
        description: "filter type: 0 = lowpass, 1 = highpass, 2 = band pass, 3 = notch, 4 = allpass, 5 = peaking, 6 = lowshelf, 7 = highshelf"
      },
      { name: "freq", default: 500, description: "filter cutoff in Hz" },
      { name: "q", default: 1, description: "q factor" },
      { name: "gain", default: 1 }
    ],
    compile: ({ vars: e, ...t }) => s[t.lang].defUgen(t, ...e),
    examples: [
      `pink()
.qf(
 impulse(.5).seq(0,1,2,3,4,5,6,7), // type
  tri(0.5).rangex(100, 8000),  // freq
 10, // Q
 1, // gain (only relevant for types 5-7)
).div(4).out();`
    ]
  });
  var Ii = u(
    "qlpf",
    (e, t, i = 10) => e.qf(0, t, i),
    {
      description: "biQuad Low Pass Filter",
      ins: [
        { name: "input" },
        { name: "freq" },
        { name: "q", description: "resonance" }
      ],
      tags: ["fx", "filter"],
      examples: [
        `pink().qlpf(
  tri(0.5).rangex(100, 8000), // cutoff freq
  10 // Q
).out()`
      ]
    }
  );
  var Ui = u(
    "qhpf",
    (e, t, i = 10) => e.qf(1, t, i),
    {
      description: "biQuad High pass filter",
      ins: [
        { name: "input" },
        { name: "freq" },
        { name: "q", description: "resonance" }
      ],
      tags: ["fx", "filter"],
      examples: [
        `pink().qhpf(
  tri(0.5).rangex(100, 8000), // cutoff freq
  10 // Q
).out()`
      ]
    }
  );
  var ki = u(
    "qbpf",
    (e, t, i = 10) => e.qf(2, t, i),
    {
      description: "biQuad Band Pass Filter",
      ins: [
        { name: "input" },
        { name: "freq" },
        { name: "q", description: "resonance" }
      ],
      tags: ["fx", "filter"],
      examples: [
        `pink().qbpf(
  tri(0.5).rangex(100, 8000), // cutoff freq
  10 // Q
).out()`
      ]
    }
  );
  var Pi = u(
    "qnf",
    (e, t, i = 10) => e.qf(3, t, i),
    {
      description: "biQuad Notch Filter",
      ins: [
        { name: "input" },
        { name: "freq" },
        { name: "q", description: "resonance" }
      ],
      tags: ["fx", "filter"],
      examples: [
        `pink().qnf(
  tri(0.5).rangex(100, 8000), // cutoff freq
  10 // Q
).out()`
      ]
    }
  );
  var Fi = u(
    "qapf",
    (e, t, i = 10) => e.qf(3, t, i),
    {
      description: "biQuad All Pass Filter",
      ins: [
        { name: "input" },
        { name: "freq" },
        { name: "q", description: "resonance" }
      ],
      tags: ["fx", "filter"],
      examples: [
        `impulse(1).qapf(
  tri(0.5).rangex(100, 8000), // cutoff freq
  10 // Q
).out()`
      ]
    }
  );
  var Ji = u(
    "split",
    (e, t) => e.type !== "poly" ? t([e]) : t(e.ins),
    {
      ins: [{ name: "input" }, { name: "fn" }],
      tags: ["multi-channel"],
      description: "apply fn to an array of signals, one for each channel in input",
      examples: ["sine([220,330,550]).split(chs => add(...chs)).out()"]
    }
  );
  var ji = u(
    "mix",
    (e, t = 1) => {
      if ([1, 2].includes(t) || (t = 2, console.warn("mix only supports 1 or 2 channels atm.. falling back to 2")), e.type !== "poly")
        return e;
      if (t === 2) {
        const i = e.ins.map((n, l2, o) => {
          const G3 = (l2 / (o.length - 1) * 2 - 1 + 1) * Math.PI / 4;
          return n.mul([Math.cos(G3), Math.sin(G3)]).inherit(e);
        });
        return C(...i);
      }
      return e.ins = e.ins.map((i) => i.inherit(e)), x("mix").withIns(...e.ins);
    },
    {
      compile: ({ vars: e, name: t, lang: i }) => s[i].def(t, `(${e.join(" + ")})`),
      description: `mixes down multiple channels. Useful to make sure you get a mono or stereo signal out at the end. 
When mixing down to 2 channels, the input channels are equally distributed over the stereo image, e.g. 3 channels are panned [-1,0,1]`,
      ins: [
        { name: "in" },
        {
          name: "channels",
          default: 1,
          description: "how many channels to mix down to. Only supports 1 and 2"
        }
      ],
      tags: ["multi-channel"],
      examples: ["sine([220,330,440]).mix(2).out()"]
    }
  );
  c.prototype.feedback = function(e) {
    return this.add(e);
  };
  var Qi = (e) => C(e);
  var Bi = f;
  var Ei = f;
  var Oi = g("mouseX", () => K("mouseX"), {
    ins: [],
    description: "X position of mouse, bipolar range",
    tags: ["external"],
    examples: ["mouseX.range(100,800).sine().out()"]
  });
  var $i = Oi();
  var Di = g("mouseY", () => K("mouseY"), {
    ins: [],
    description: "Y position of mouse, bipolar range",
    tags: ["external"],
    examples: ["mouseY.range(800,100).sine().out()"]
  });
  var Ai = Di();
  var qi = u(
    "scope",
    (e, t) => {
      let i = 1;
      e.type === "poly" && (i = e.ins.length);
      const n = getNode("scope", e, t, i);
      return n.type !== "poly" ? (n.ins.push({ type: "n", value: 0, ins: [] }), n) : (n.ins.forEach((l2, o) => l2.ins.push({ type: "n", value: o, ins: [] })), n);
    },
    {
      ugen: "Scope",
      description: "renders an an oscilloscope of the current point in the graph. expects values between -1 and 1. warning: this feature is still experimental! when using it, make sure to not switch tabs, as it might fry your browser.",
      compile: ({ vars: [e, t, i, n], ...l2 }) => w(l2, e, t, i, n)
    }
  );
  var P2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    B: Bi,
    PI: ne,
    _: Ei,
    abs: ei,
    acos: Et,
    ad: Zt,
    add: C,
    adsr: gt,
    and: ri,
    ar: Xt,
    argmax: ci,
    argmin: di,
    asin: Ot,
    atan: $t,
    audioin: jt,
    bipolar: Hi,
    bool: yi,
    bpf: Yi,
    brown: zt,
    bytebeat: yt,
    cc: K,
    ceil: si,
    clamp: ii,
    clip: Ki,
    clock: bt,
    clockdiv: xt,
    cos: _,
    delay: It,
    distort: Rt,
    div: At,
    dust: Vt,
    exp: A,
    feedback: Qi,
    filter: D,
    floatbeat: ft,
    floor: ni,
    fold: Ct,
    fork: Mi,
    greater: ee,
    gt: pi,
    hold: Ut,
    hpf: Vi,
    ifelse: fi,
    impulse: $,
    lag: wt,
    lfnoise: Ni,
    log: H,
    lower: te,
    lpf: Wi,
    lt: ui,
    max: oi,
    midicc: Jt,
    midifreq: kt,
    midigate: Pt,
    midinote: xi,
    midivel: Ft,
    min: ai,
    mix: ji,
    mod: _t,
    mouseX: $i,
    mouseY: Ai,
    mul: Dt,
    noise: O,
    not: Gi,
    or: hi,
    output: Li,
    pan: Ti,
    perc: zi,
    pick: wi,
    pink: Mt,
    poly: ie,
    pow: Qt,
    pulse: St,
    qapf: Fi,
    qbpf: ki,
    qf: vi,
    qhpf: Ui,
    qlpf: Ii,
    qnf: Pi,
    range: gi,
    rangex: bi,
    raw: Gt,
    registerUgen: E,
    remap: Xi,
    rng: Lt,
    round: ti,
    saw: Wt,
    scope: qi,
    seq: vt,
    sign: li,
    sin: q,
    sine: Nt,
    slew: Kt,
    slide: Tt,
    split: Ji,
    src: Ri,
    sub: qt,
    tan: Bt,
    thru: Zi,
    time: ht,
    tri: Ht,
    trig: Ci,
    unipolar: Si,
    xor: mi,
    zaw: Yt
  }, Symbol.toStringTag, { value: "Module" }));
  var en = class {
    constructor({
      onToggle: t,
      onToggleRecording: i,
      beforeEval: n,
      transpiler: l2,
      localScope: o = false,
      outputNode: d2 = null
    } = {}) {
      this.outputNode = d2, this.audio = new Fe(this.outputNode), this.onToggle = t, this.transpiler = l2, this.onToggleRecording = i, this.beforeEval = n, this.localScope = o, typeof window < "u" && (o || (Object.assign(globalThis, k), Object.assign(globalThis, P2), Object.assign(globalThis, U), Object.assign(globalThis, { repl: this })), window.addEventListener("message", (p) => {
        p.data.type === "KABELSALAT_SET_CONTROL" && this.audio.setControl(p.data.id, p.data.value);
      }));
      const G3 = this;
      c.prototype.spawn = function(p = [0, 1], m3) {
        G3.audio.spawn(this.output(p).exit(), m3);
      };
    }
    registerUgen(t, i) {
      return this.audio.registerUgen(i), E(t, i.name);
    }
    evaluate(t) {
      this.localScope || (Object.assign(globalThis, { audio: this.audio }), Object.assign(globalThis, {
        addUgen: this.registerUgen.bind(this)
      }));
      let i;
      this.transpiler ? i = this.transpiler(t) : i = { output: t }, this.beforeEval?.(i);
      let n;
      return this.localScope && (n = {
        ...k,
        ...P2,
        ...U,
        audio: this.audio,
        addUgen: this.registerUgen.bind(this),
        repl: this
      }), j(i.output, n);
    }
    async play(t) {
      await this.audio.init(), t.ins.length && this.audio.spawn(t), this.onToggle?.(true);
    }
    run(t) {
      const i = this.evaluate(t);
      this.play(i);
    }
    stop() {
      this.stopRecording(), this.audio.stop(), this.onToggle?.(false);
    }
    record() {
      this.audio.record(), this.onToggleRecording?.(true);
    }
    stopRecording() {
      this.audio.stopRecording(), this.onToggleRecording?.(false);
    }
  };

  // node_modules/@strudel/core/dist/index.mjs
  var import_meta = {};
  var oe2 = "strudel.log";
  var Qe2 = 1e3;
  var Ut2;
  var Xt2;
  function zt2(t, e = "cyclist") {
    process.env.NODE_ENV === "development" && console.error(t), E2(`[${e}] error: ${t.message}`);
  }
  function E2(t, e, n = {}) {
    let s2 = performance.now();
    Ut2 === t && s2 - Xt2 < Qe2 || (Ut2 = t, Xt2 = s2, console.log(`%c${t}`, "background-color: black;color:white;border-radius:15px"), typeof document < "u" && typeof CustomEvent < "u" && document.dispatchEvent(
      new CustomEvent(oe2, {
        detail: {
          message: t,
          type: e,
          data: n
        }
      })
    ));
  }
  E2.key = oe2;
  var Yf = (t) => /^[a-gA-G][#bsf]*[0-9]*$/.test(t);
  var Mt2 = (t) => /^[a-gA-G][#bsf]*-?[0-9]*$/.test(t);
  var Ue2 = (t) => {
    if (typeof t != "string")
      return [];
    const [e, n = "", s2] = t.match(/^([a-gA-G])([#bsf]*)(-?[0-9]*)$/)?.slice(1) || [];
    return e ? [e, n, s2 ? Number(s2) : void 0] : [];
  };
  var Xe2 = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
  var Ke2 = { "#": 1, b: -1, s: 1, f: -1 };
  var Ye2 = (t) => t?.split("").reduce((e, n) => e + Ke2[n], 0) || 0;
  var gt2 = (t, e = 3) => {
    const [n, s2, r = e] = Ue2(t);
    if (!n)
      throw new Error('not a note: "' + t + '"');
    const o = Xe2[n.toLowerCase()], i = Ye2(s2);
    return (Number(r) + 1) * 12 + o + i;
  };
  var it2 = (t) => Math.pow(2, (t - 69) / 12) * 440;
  var Ze2 = (t) => 12 * Math.log(t / 440) / Math.LN2 + 69;
  var Zf = (t, e) => {
    if (typeof t != "object")
      throw new Error("valueToMidi: expected object value");
    let { freq: n, note: s2 } = t;
    if (typeof n == "number")
      return Ze2(n);
    if (typeof s2 == "string")
      return gt2(s2);
    if (typeof s2 == "number")
      return s2;
    if (!e)
      throw new Error("valueToMidi: expected freq or note to be set");
    return e;
  };
  var th = (t, e) => (t - e) * 1e3;
  var tn = (t) => it2(typeof t == "number" ? t : gt2(t));
  var en2 = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  var eh = (t) => {
    const e = Math.floor(t / 12) - 1;
    return en2[t % 12] + e;
  };
  var bt2 = (t, e) => (t % e + e) % e;
  var nn = (t) => t.reduce((e, n) => e + n) / t.length;
  function sn(t, e = 0) {
    return isNaN(Number(t)) ? (E2(`"${t}" is not a number, falling back to ${e}`, "warning"), e) : t;
  }
  var nh = (t, e) => bt2(Math.round(sn(t ?? 0, 0)), e);
  var sh = (t) => {
    let { value: e, context: n } = t, s2 = e;
    if (typeof s2 == "object" && !Array.isArray(s2) && (s2 = s2.note || s2.n || s2.value, s2 === void 0))
      throw new Error(`cannot find a playable note for ${JSON.stringify(e)}`);
    if (typeof s2 == "number" && n.type !== "frequency")
      s2 = it2(t.value);
    else if (typeof s2 == "number" && n.type === "frequency")
      s2 = t.value;
    else if (typeof s2 != "string" || !Mt2(s2))
      throw new Error("not a note: " + JSON.stringify(s2));
    return s2;
  };
  var rh = (t) => {
    let { value: e, context: n } = t;
    if (typeof e == "object")
      return e.freq ? e.freq : tn(e.note || e.n || e.value);
    if (typeof e == "number" && n.type !== "frequency")
      e = it2(t.value);
    else if (typeof e == "string" && Mt2(e))
      e = it2(gt2(t.value));
    else if (typeof e != "number")
      throw new Error("not a note or frequency: " + e);
    return e;
  };
  var rn = (t, e) => t.slice(e).concat(t.slice(0, e));
  var on = (...t) => t.reduce(
    (e, n) => (...s2) => e(n(...s2)),
    (e) => e
  );
  var oh = (...t) => on(...t.reverse());
  var lt2 = (t) => t.filter((e) => e != null);
  var G = (t) => [].concat(...t);
  var ot2 = (t) => t;
  var ch = (t, e) => t;
  var _t2 = (t, e) => Array.from({ length: e - t + 1 }, (n, s2) => s2 + t);
  function w2(t, e, n = t.length) {
    const s2 = function r(...o) {
      if (o.length >= n)
        return t.apply(this, o);
      {
        const i = function(...a2) {
          return r.apply(this, o.concat(a2));
        };
        return e && e(i, o), i;
      }
    };
    return e && e(s2, []), s2;
  }
  function ce2(t) {
    const e = Number(t);
    if (!isNaN(e))
      return e;
    if (Mt2(t))
      return gt2(t);
    throw new Error(`cannot parse as numeral: "${t}"`);
  }
  function ie2(t, e) {
    return (...n) => t(...n.map(e));
  }
  function L2(t) {
    return ie2(t, ce2);
  }
  function cn(t) {
    const e = Number(t);
    if (!isNaN(e))
      return e;
    const n = {
      pi: Math.PI,
      w: 1,
      h: 0.5,
      q: 0.25,
      e: 0.125,
      s: 0.0625,
      t: 1 / 3,
      f: 0.2,
      x: 1 / 6
    }[t];
    if (typeof n < "u")
      return n;
    throw new Error(`cannot parse as fractional: "${t}"`);
  }
  var ih = (t) => ie2(t, cn);
  var ue2 = function(t, e) {
    return [e.slice(0, t), e.slice(t)];
  };
  var Pt2 = (t, e, n) => e.map((s2, r) => t(s2, n[r]));
  var un = function(t) {
    const e = [];
    for (let n = 0; n < t.length - 1; ++n)
      e.push([t[n], t[n + 1]]);
    return e;
  };
  var an = (t, e, n) => Math.min(Math.max(t, e), n);
  var ln = ["Do", "Reb", "Re", "Mib", "Mi", "Fa", "Solb", "Sol", "Lab", "La", "Sib", "Si"];
  var pn = [
    "Sa",
    "Re",
    "Ga",
    "Ma",
    "Pa",
    "Dha",
    "Ni"
  ];
  var fn = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Hb", "H"];
  var hn = [
    "Ni",
    "Pab",
    "Pa",
    "Voub",
    "Vou",
    "Ga",
    "Dib",
    "Di",
    "Keb",
    "Ke",
    "Zob",
    "Zo"
  ];
  var dn = [
    "I",
    "Ro",
    "Ha",
    "Ni",
    "Ho",
    "He",
    "To"
  ];
  var mn = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  var uh = (t, e = "letters") => {
    const s2 = (e === "solfeggio" ? ln : e === "indian" ? pn : e === "german" ? fn : e === "byzantine" ? hn : e === "japanese" ? dn : mn)[t % 12], r = Math.floor(t / 12) - 1;
    return s2 + r;
  };
  function ah(t) {
    var e = {};
    return t.filter(function(n) {
      return e.hasOwn(n) ? false : e[n] = true;
    });
  }
  function lh(t) {
    return t.sort().filter(function(e, n, s2) {
      return !n || e != s2[n - 1];
    });
  }
  function yn(t) {
    return t.sort((e, n) => e.compare(n)).filter(function(e, n, s2) {
      return !n || e.ne(s2[n - 1]);
    });
  }
  function wn(t) {
    const e = new TextEncoder().encode(t);
    return btoa(String.fromCharCode(...e));
  }
  function gn(t) {
    const e = new Uint8Array(
      atob(t).split("").map((s2) => s2.charCodeAt(0))
    );
    return new TextDecoder().decode(e);
  }
  function ph(t) {
    return encodeURIComponent(wn(t));
  }
  function fh(t) {
    return gn(decodeURIComponent(t));
  }
  function bn(t, e) {
    return Array.isArray(t) ? t.map(e) : Object.fromEntries(Object.entries(t).map(([n, s2], r) => [n, e(s2, n, r)]));
  }
  function Kt2(t, e) {
    return t / e;
  }
  var _n = class {
    constructor({
      getTargetClockTime: e = vn,
      weight: n = 16,
      offsetDelta: s2 = 5e-3,
      checkAfterTime: r = 2,
      resetAfterTime: o = 8
    }) {
      this.offsetTime, this.timeAtPrevOffsetSample, this.prevOffsetTimes = [], this.getTargetClockTime = e, this.weight = n, this.offsetDelta = s2, this.checkAfterTime = r, this.resetAfterTime = o, this.reset = () => {
        this.prevOffsetTimes = [], this.offsetTime = null, this.timeAtPrevOffsetSample = null;
      };
    }
    calculateOffset(e) {
      const n = this.getTargetClockTime(), s2 = n - this.timeAtPrevOffsetSample, r = n - e;
      if (s2 > this.resetAfterTime && this.reset(), this.offsetTime == null && (this.offsetTime = r), this.prevOffsetTimes.push(r), this.prevOffsetTimes.length > this.weight && this.prevOffsetTimes.shift(), this.timeAtPrevOffsetSample == null || s2 > this.checkAfterTime) {
        this.timeAtPrevOffsetSample = n;
        const o = nn(this.prevOffsetTimes);
        Math.abs(o - this.offsetTime) > this.offsetDelta && (this.offsetTime = o);
      }
      return this.offsetTime;
    }
    calculateTimestamp(e, n) {
      return this.calculateOffset(e) + n;
    }
  };
  function hh() {
    return performance.now() * 1e-3;
  }
  function vn() {
    return Date.now() * 1e-3;
  }
  var kn = /* @__PURE__ */ new Map([
    ["control", "Control"],
    ["ctrl", "Control"],
    ["alt", "Alt"],
    ["shift", "Shift"],
    ["down", "ArrowDown"],
    ["up", "ArrowUp"],
    ["left", "ArrowLeft"],
    ["right", "ArrowRight"]
  ]);
  var rt2;
  function qn() {
    if (rt2 == null) {
      if (typeof window > "u")
        return;
      rt2 = {}, window.addEventListener("keydown", (t) => {
        rt2[t.key] = true;
      }), window.addEventListener("keyup", (t) => {
        rt2[t.key] = false;
      });
    }
    return { ...rt2 };
  }
  function ae(t, e = false) {
    return typeof t == "object" ? e ? JSON.stringify(t).slice(1, -1).replaceAll('"', "").replaceAll(",", " ") : JSON.stringify(t) : t;
  }
  Fraction.prototype.sam = function() {
    return this.floor();
  };
  Fraction.prototype.nextSam = function() {
    return this.sam().add(1);
  };
  Fraction.prototype.wholeCycle = function() {
    return new B2(this.sam(), this.nextSam());
  };
  Fraction.prototype.cyclePos = function() {
    return this.sub(this.sam());
  };
  Fraction.prototype.lt = function(t) {
    return this.compare(t) < 0;
  };
  Fraction.prototype.gt = function(t) {
    return this.compare(t) > 0;
  };
  Fraction.prototype.lte = function(t) {
    return this.compare(t) <= 0;
  };
  Fraction.prototype.gte = function(t) {
    return this.compare(t) >= 0;
  };
  Fraction.prototype.eq = function(t) {
    return this.compare(t) == 0;
  };
  Fraction.prototype.ne = function(t) {
    return this.compare(t) != 0;
  };
  Fraction.prototype.max = function(t) {
    return this.gt(t) ? this : t;
  };
  Fraction.prototype.maximum = function(...t) {
    return t = t.map((e) => new Fraction(e)), t.reduce((e, n) => n.max(e), this);
  };
  Fraction.prototype.min = function(t) {
    return this.lt(t) ? this : t;
  };
  Fraction.prototype.mulmaybe = function(t) {
    return t !== void 0 ? this.mul(t) : void 0;
  };
  Fraction.prototype.divmaybe = function(t) {
    return t !== void 0 ? this.div(t) : void 0;
  };
  Fraction.prototype.addmaybe = function(t) {
    return t !== void 0 ? this.add(t) : void 0;
  };
  Fraction.prototype.submaybe = function(t) {
    return t !== void 0 ? this.sub(t) : void 0;
  };
  Fraction.prototype.show = function() {
    return this.s * this.n + "/" + this.d;
  };
  Fraction.prototype.or = function(t) {
    return this.eq(0) ? t : this;
  };
  var m = (t) => Fraction(t);
  var Sn = (...t) => {
    if (t = lt2(t), t.length !== 0)
      return t.reduce((e, n) => e.gcd(n), m(1));
  };
  var Y2 = (...t) => {
    if (t = lt2(t), t.length === 0)
      return;
    const e = t.pop();
    return t.reduce(
      (n, s2) => n === void 0 || s2 === void 0 ? void 0 : n.lcm(s2),
      e
    );
  };
  var An = (t) => t instanceof Fraction;
  m._original = Fraction;
  var B2 = class _B {
    constructor(e, n) {
      this.begin = m(e), this.end = m(n);
    }
    get spanCycles() {
      const e = [];
      var n = this.begin;
      const s2 = this.end, r = s2.sam();
      if (n.equals(s2))
        return [new _B(n, s2)];
      for (; s2.gt(n); ) {
        if (n.sam().equals(r)) {
          e.push(new _B(n, this.end));
          break;
        }
        const o = n.nextSam();
        e.push(new _B(n, o)), n = o;
      }
      return e;
    }
    get duration() {
      return this.end.sub(this.begin);
    }
    cycleArc() {
      const e = this.begin.cyclePos(), n = e.add(this.duration);
      return new _B(e, n);
    }
    withTime(e) {
      return new _B(e(this.begin), e(this.end));
    }
    withEnd(e) {
      return new _B(this.begin, e(this.end));
    }
    withCycle(e) {
      const n = this.begin.sam(), s2 = n.add(e(this.begin.sub(n))), r = n.add(e(this.end.sub(n)));
      return new _B(s2, r);
    }
    intersection(e) {
      const n = this.begin.max(e.begin), s2 = this.end.min(e.end);
      if (!n.gt(s2) && !(n.equals(s2) && (n.equals(this.end) && this.begin.lt(this.end) || n.equals(e.end) && e.begin.lt(e.end))))
        return new _B(n, s2);
    }
    intersection_e(e) {
      const n = this.intersection(e);
      if (n == null)
        throw "TimeSpans do not intersect";
      return n;
    }
    midpoint() {
      return this.begin.add(this.duration.div(m(2)));
    }
    equals(e) {
      return this.begin.equals(e.begin) && this.end.equals(e.end);
    }
    show() {
      return this.begin.show() + " \u2192 " + this.end.show();
    }
  };
  var S2 = class _S {
    /*
          Event class, representing a value active during the timespan
          'part'. This might be a fragment of an event, in which case the
          timespan will be smaller than the 'whole' timespan, otherwise the
          two timespans will be the same. The 'part' must never extend outside of the
          'whole'. If the event represents a continuously changing value
          then the whole will be returned as None, in which case the given
          value will have been sampled from the point halfway between the
          start and end of the 'part' timespan.
          The context is to store a list of source code locations causing the event.
    
          The word 'Event' is more or less a reserved word in javascript, hence this
          class is named called 'Hap'.
          */
    constructor(e, n, s2, r = {}, o = false) {
      this.whole = e, this.part = n, this.value = s2, this.context = r, this.stateful = o, o && console.assert(typeof this.value == "function", "Stateful values must be functions");
    }
    get duration() {
      let e;
      return typeof this.value?.duration == "number" ? e = m(this.value.duration) : e = this.whole.end.sub(this.whole.begin), typeof this.value?.clip == "number" ? e.mul(this.value.clip) : e;
    }
    get endClipped() {
      return this.whole.begin.add(this.duration);
    }
    isActive(e) {
      return this.whole.begin <= e && this.endClipped >= e;
    }
    isInPast(e) {
      return e > this.endClipped;
    }
    isInNearPast(e, n) {
      return n - e <= this.endClipped;
    }
    isInFuture(e) {
      return e < this.whole.begin;
    }
    isInNearFuture(e, n) {
      return n < this.whole.begin && n > this.whole.begin - e;
    }
    isWithinTime(e, n) {
      return this.whole.begin <= n && this.endClipped >= e;
    }
    wholeOrPart() {
      return this.whole ? this.whole : this.part;
    }
    withSpan(e) {
      const n = this.whole ? e(this.whole) : void 0;
      return new _S(n, e(this.part), this.value, this.context);
    }
    withValue(e) {
      return new _S(this.whole, this.part, e(this.value), this.context);
    }
    hasOnset() {
      return this.whole != null && this.whole.begin.equals(this.part.begin);
    }
    hasTag(e) {
      return this.context.tags?.includes(e);
    }
    resolveState(e) {
      if (this.stateful && this.hasOnset()) {
        console.log("stateful");
        const n = this.value, [s2, r] = n(e);
        return [s2, new _S(this.whole, this.part, r, this.context, false)];
      }
      return [e, this];
    }
    spanEquals(e) {
      return this.whole == null && e.whole == null || this.whole.equals(e.whole);
    }
    equals(e) {
      return this.spanEquals(e) && this.part.equals(e.part) && // TODO would == be better ??
      this.value === e.value;
    }
    show(e = false) {
      const n = typeof this.value == "object" ? e ? JSON.stringify(this.value).slice(1, -1).replaceAll('"', "").replaceAll(",", " ") : JSON.stringify(this.value) : this.value;
      var s2 = "";
      if (this.whole == null)
        s2 = "~" + this.part.show;
      else {
        var r = this.whole.begin.equals(this.part.begin) && this.whole.end.equals(this.part.end);
        this.whole.begin.equals(this.part.begin) || (s2 = this.whole.begin.show() + " \u21DC "), r || (s2 += "("), s2 += this.part.show(), r || (s2 += ")"), this.whole.end.equals(this.part.end) || (s2 += " \u21DD " + this.whole.end.show());
      }
      return "[ " + s2 + " | " + n + " ]";
    }
    showWhole(e = false) {
      return `${this.whole == null ? "~" : this.whole.show()}: ${ae(this.value, e)}`;
    }
    combineContext(e) {
      const n = this;
      return { ...n.context, ...e.context, locations: (n.context.locations || []).concat(e.context.locations || []) };
    }
    setContext(e) {
      return new _S(this.whole, this.part, this.value, e);
    }
    ensureObjectValue() {
      if (typeof this.value != "object")
        throw new Error(
          `expected hap.value to be an object, but got "${this.value}". Hint: append .note() or .s() to the end`,
          "error"
        );
    }
  };
  var ut2 = class _ut {
    constructor(e, n = {}) {
      this.span = e, this.controls = n;
    }
    // Returns new State with different span
    setSpan(e) {
      return new _ut(e, this.controls);
    }
    withSpan(e) {
      return this.setSpan(e(this.span));
    }
    // Returns new State with added controls.
    setControls(e) {
      return new _ut(this.span, { ...this.controls, ...e });
    }
  };
  function Tn(t, e, n) {
    if (e?.value !== void 0 && Object.keys(e).length === 1)
      return E2("[warn]: Can't do arithmetic on control pattern."), t;
    const s2 = Object.keys(t).filter((r) => Object.keys(e).includes(r));
    return Object.assign({}, t, e, Object.fromEntries(s2.map((r) => [r, n(t[r], e[r])])));
  }
  w2((t, e) => t * e);
  w2((t, e) => e.map(t));
  function Cn(t, e = 60) {
    let n = 0, s2 = m(0), r = [""], o = "";
    for (; r[0].length < e; ) {
      const i = t.queryArc(n, n + 1), a2 = i.filter((h) => h.hasOnset()).map((h) => h.duration), u2 = Sn(...a2), p = u2.inverse();
      r = r.map((h) => h + "|"), o += "|";
      for (let h = 0; h < p; h++) {
        const [y2, g2] = [s2, s2.add(u2)], v = i.filter((O2) => O2.whole.begin.lte(y2) && O2.whole.end.gte(g2)), _3 = v.length - r.length;
        _3 > 0 && (r = r.concat(Array(_3).fill(o))), r = r.map((O2, A4) => {
          const I3 = v[A4];
          if (I3) {
            const P4 = I3.whole.begin.eq(y2) ? "" + I3.value : "-";
            return O2 + P4;
          }
          return O2 + ".";
        }), o += ".", s2 = s2.add(u2);
      }
      n++;
    }
    return r.join(`
`);
  }
  var le = {};
  var xn = async (...t) => {
    const e = await Promise.allSettled(t), n = e.filter((s2) => s2.status === "fulfilled").map((s2) => s2.value);
    return e.forEach((s2, r) => {
      s2.status === "rejected" && console.warn(`evalScope: module with index ${r} could not be loaded:`, s2.reason);
    }), n.forEach((s2) => {
      Object.entries(s2).forEach(([r, o]) => {
        globalThis[r] = o, le[r] = o;
      });
    }), n;
  };
  function Bn(t, e = {}) {
    const { wrapExpression: n = true, wrapAsync: s2 = true } = e;
    n && (t = `{${t}}`), s2 && (t = `(async ()=>${t})()`);
    const r = `"use strict";return (${t})`;
    return Function(r)();
  }
  var On = async (t, e, n) => {
    let s2 = {};
    if (e) {
      const i = e(t, n);
      t = i.output, s2 = i;
    }
    return { mode: "javascript", pattern: await Bn(t, { wrapExpression: !!e }), meta: s2 };
  };
  var Ct2;
  var J2 = true;
  var dh = function(t) {
    J2 = !!t;
  };
  var mh = (t) => Ct2 = t;
  var f2 = class _f2 {
    /**
     * Create a pattern. As an end user, you will most likely not create a Pattern directly.
     *
     * @param {function} query - The function that maps a `State` to an array of `Hap`.
     * @noAutocomplete
     */
    constructor(e, n = void 0) {
      __publicField(this, "polyJoin", function() {
        const e = this;
        return e.fmap((n) => n.extend(e._steps.div(n._steps))).outerJoin();
      });
      this.query = e, this._Pattern = true, this._steps = n;
    }
    get _steps() {
      return this.__steps;
    }
    set _steps(e) {
      this.__steps = e === void 0 ? void 0 : m(e);
    }
    setSteps(e) {
      return this._steps = e, this;
    }
    withSteps(e) {
      return J2 ? new _f2(this.query, this._steps === void 0 ? void 0 : e(this._steps)) : this;
    }
    get hasSteps() {
      return this._steps !== void 0;
    }
    //////////////////////////////////////////////////////////////////////
    // Haskell-style functor, applicative and monadic operations
    /**
     * Returns a new pattern, with the function applied to the value of
     * each hap. It has the alias `fmap`.
     * @synonyms fmap
     * @param {Function} func to to apply to the value
     * @returns Pattern
     * @example
     * "0 1 2".withValue(v => v + 10).log()
     */
    withValue(e) {
      const n = new _f2((s2) => this.query(s2).map((r) => r.withValue(e)));
      return n._steps = this._steps, n;
    }
    // runs func on query state
    withState(e) {
      return new _f2((n) => this.query(e(n)));
    }
    /**
     * see `withValue`
     * @noAutocomplete
     */
    fmap(e) {
      return this.withValue(e);
    }
    /**
     * Assumes 'this' is a pattern of functions, and given a function to
     * resolve wholes, applies a given pattern of values to that
     * pattern of functions.
     * @param {Function} whole_func
     * @param {Function} func
     * @noAutocomplete
     * @returns Pattern
     */
    appWhole(e, n) {
      const s2 = this, r = function(o) {
        const i = s2.query(o), a2 = n.query(o), u2 = function(p, h) {
          const y2 = p.part.intersection(h.part);
          if (y2 != null)
            return new S2(
              e(p.whole, h.whole),
              y2,
              p.value(h.value),
              h.combineContext(p)
            );
        };
        return G(
          i.map((p) => lt2(a2.map((h) => u2(p, h))))
        );
      };
      return new _f2(r);
    }
    /**
     * When this method is called on a pattern of functions, it matches its haps
     * with those in the given pattern of values.  A new pattern is returned, with
     * each matching value applied to the corresponding function.
     *
     * In this `_appBoth` variant, where timespans of the function and value haps
     * are not the same but do intersect, the resulting hap has a timespan of the
     * intersection. This applies to both the part and the whole timespan.
     * @param {Pattern} pat_val
     * @noAutocomplete
     * @returns Pattern
     */
    appBoth(e) {
      const n = this, s2 = function(o, i) {
        if (!(o == null || i == null))
          return o.intersection_e(i);
      }, r = n.appWhole(s2, e);
      return J2 && (r._steps = Y2(e._steps, n._steps)), r;
    }
    /**
     * As with `appBoth`, but the `whole` timespan is not the intersection,
     * but the timespan from the function of patterns that this method is called
     * on. In practice, this means that the pattern structure, including onsets,
     * are preserved from the pattern of functions (often referred to as the left
     * hand or inner pattern).
     * @param {Pattern} pat_val
     * @noAutocomplete
     * @returns Pattern
     */
    appLeft(e) {
      const n = this, s2 = function(o) {
        const i = [];
        for (const a2 of n.query(o)) {
          const u2 = e.query(o.setSpan(a2.wholeOrPart()));
          for (const p of u2) {
            const h = a2.whole, y2 = a2.part.intersection(p.part);
            if (y2) {
              const g2 = a2.value(p.value), v = p.combineContext(a2), _3 = new S2(h, y2, g2, v);
              i.push(_3);
            }
          }
        }
        return i;
      }, r = new _f2(s2);
      return r._steps = this._steps, r;
    }
    /**
     * As with `appLeft`, but `whole` timespans are instead taken from the
     * pattern of values, i.e. structure is preserved from the right hand/outer
     * pattern.
     * @param {Pattern} pat_val
     * @noAutocomplete
     * @returns Pattern
     */
    appRight(e) {
      const n = this, s2 = function(o) {
        const i = [];
        for (const a2 of e.query(o)) {
          const u2 = n.query(o.setSpan(a2.wholeOrPart()));
          for (const p of u2) {
            const h = a2.whole, y2 = p.part.intersection(a2.part);
            if (y2) {
              const g2 = p.value(a2.value), v = a2.combineContext(p), _3 = new S2(h, y2, g2, v);
              i.push(_3);
            }
          }
        }
        return i;
      }, r = new _f2(s2);
      return r._steps = e._steps, r;
    }
    bindWhole(e, n) {
      const s2 = this, r = function(o) {
        const i = function(u2, p) {
          return new S2(
            e(u2.whole, p.whole),
            p.part,
            p.value,
            Object.assign({}, u2.context, p.context, {
              locations: (u2.context.locations || []).concat(p.context.locations || [])
            })
          );
        }, a2 = function(u2) {
          return n(u2.value).query(o.setSpan(u2.part)).map((p) => i(u2, p));
        };
        return G(s2.query(o).map((u2) => a2(u2)));
      };
      return new _f2(r);
    }
    bind(e) {
      const n = function(s2, r) {
        if (!(s2 == null || r == null))
          return s2.intersection_e(r);
      };
      return this.bindWhole(n, e);
    }
    join() {
      return this.bind(ot2);
    }
    outerBind(e) {
      return this.bindWhole((n) => n, e).setSteps(this._steps);
    }
    outerJoin() {
      return this.outerBind(ot2);
    }
    innerBind(e) {
      return this.bindWhole((n, s2) => s2, e);
    }
    innerJoin() {
      return this.innerBind(ot2);
    }
    // Flatterns patterns of patterns, by retriggering/resetting inner patterns at onsets of outer pattern haps
    resetJoin(e = false) {
      const n = this;
      return new _f2((s2) => n.discreteOnly().query(s2).map((r) => r.value.late(e ? r.whole.begin : r.whole.begin.cyclePos()).query(s2).map(
        (o) => new S2(
          // Supports continuous haps in the inner pattern
          o.whole ? o.whole.intersection(r.whole) : void 0,
          o.part.intersection(r.part),
          o.value
        ).setContext(r.combineContext(o))
      ).filter((o) => o.part)).flat());
    }
    restartJoin() {
      return this.resetJoin(true);
    }
    // Like the other joins above, joins a pattern of patterns of values, into a flatter
    // pattern of values. In this case it takes whole cycles of the inner pattern to fit each event
    // in the outer pattern.
    squeezeJoin() {
      const e = this;
      function n(s2) {
        const r = e.discreteOnly().query(s2);
        function o(a2) {
          const p = a2.value._focusSpan(a2.wholeOrPart()).query(s2.setSpan(a2.part));
          function h(y2, g2) {
            let v;
            if (g2.whole && y2.whole && (v = g2.whole.intersection(y2.whole), !v))
              return;
            const _3 = g2.part.intersection(y2.part);
            if (!_3)
              return;
            const O2 = g2.combineContext(y2);
            return new S2(v, _3, g2.value, O2);
          }
          return p.map((y2) => h(a2, y2));
        }
        return G(r.map(o)).filter((a2) => a2);
      }
      return new _f2(n);
    }
    squeezeBind(e) {
      return this.fmap(e).squeezeJoin();
    }
    polyBind(e) {
      return this.fmap(e).polyJoin();
    }
    //////////////////////////////////////////////////////////////////////
    // Utility methods mainly for internal use
    /**
     * Query haps inside the given time span.
     *
     * @param {Fraction | number} begin from time
     * @param {Fraction | number} end to time
     * @returns Hap[]
     * @example
     * const pattern = sequence('a', ['b', 'c'])
     * const haps = pattern.queryArc(0, 1)
     * console.log(haps)
     * silence
     * @noAutocomplete
     */
    queryArc(e, n, s2 = {}) {
      try {
        return this.query(new ut2(new B2(e, n), s2));
      } catch (r) {
        return zt2(r, "query"), [];
      }
    }
    /**
     * Returns a new pattern, with queries split at cycle boundaries. This makes
     * some calculations easier to express, as all haps are then constrained to
     * happen within a cycle.
     * @returns Pattern
     * @noAutocomplete
     */
    splitQueries() {
      const e = this, n = (s2) => G(s2.span.spanCycles.map((r) => e.query(s2.setSpan(r))));
      return new _f2(n);
    }
    /**
     * Returns a new pattern, where the given function is applied to the query
     * timespan before passing it to the original pattern.
     * @param {Function} func the function to apply
     * @returns Pattern
     * @noAutocomplete
     */
    withQuerySpan(e) {
      return new _f2((n) => this.query(n.withSpan(e)));
    }
    withQuerySpanMaybe(e) {
      const n = this;
      return new _f2((s2) => {
        const r = s2.withSpan(e);
        return r.span ? n.query(r) : [];
      });
    }
    /**
     * As with `withQuerySpan`, but the function is applied to both the
     * begin and end time of the query timespan.
     * @param {Function} func the function to apply
     * @returns Pattern
     * @noAutocomplete
     */
    withQueryTime(e) {
      return new _f2((n) => this.query(n.withSpan((s2) => s2.withTime(e))));
    }
    /**
     * Similar to `withQuerySpan`, but the function is applied to the timespans
     * of all haps returned by pattern queries (both `part` timespans, and where
     * present, `whole` timespans).
     * @param {Function} func
     * @returns Pattern
     * @noAutocomplete
     */
    withHapSpan(e) {
      return new _f2((n) => this.query(n).map((s2) => s2.withSpan(e)));
    }
    /**
     * As with `withHapSpan`, but the function is applied to both the
     * begin and end time of the hap timespans.
     * @param {Function} func the function to apply
     * @returns Pattern
     * @noAutocomplete
     */
    withHapTime(e) {
      return this.withHapSpan((n) => n.withTime(e));
    }
    /**
     * Returns a new pattern with the given function applied to the list of haps returned by every query.
     * @param {Function} func
     * @returns Pattern
     * @noAutocomplete
     */
    withHaps(e) {
      const n = new _f2((s2) => e(this.query(s2), s2));
      return n._steps = this._steps, n;
    }
    /**
     * As with `withHaps`, but applies the function to every hap, rather than every list of haps.
     * @param {Function} func
     * @returns Pattern
     * @noAutocomplete
     */
    withHap(e) {
      return this.withHaps((n) => n.map(e));
    }
    /**
     * Returns a new pattern with the context field set to every hap set to the given value.
     * @param {*} context
     * @returns Pattern
     * @noAutocomplete
     */
    setContext(e) {
      return this.withHap((n) => n.setContext(e));
    }
    /**
     * Returns a new pattern with the given function applied to the context field of every hap.
     * @param {Function} func
     * @returns Pattern
     * @noAutocomplete
     */
    withContext(e) {
      const n = this.withHap((s2) => s2.setContext(e(s2.context)));
      return this.__pure !== void 0 && (n.__pure = this.__pure, n.__pure_loc = this.__pure_loc), n;
    }
    /**
     * Returns a new pattern with the context field of every hap set to an empty object.
     * @returns Pattern
     * @noAutocomplete
     */
    stripContext() {
      return this.withHap((e) => e.setContext({}));
    }
    /**
     * Returns a new pattern with the given location information added to the
     * context of every hap.
     * @param {Number} start start offset
     * @param {Number} end end offset
     * @returns Pattern
     * @noAutocomplete
     */
    withLoc(e, n) {
      const s2 = {
        start: e,
        end: n
      }, r = this.withContext((o) => {
        const i = (o.locations || []).concat([s2]);
        return { ...o, locations: i };
      });
      return this.__pure && (r.__pure = this.__pure, r.__pure_loc = s2), r;
    }
    /**
     * Returns a new Pattern, which only returns haps that meet the given test.
     * @param {Function} hap_test - a function which returns false for haps to be removed from the pattern
     * @returns Pattern
     * @example
     * s("bd*8").velocity(rand).filterHaps((h) => (h.whole.begin % 1) < h.value.velocity)
     */
    filterHaps(e) {
      return new _f2((n) => this.query(n).filter(e));
    }
    /**
     * As with `filterHaps`, but the function is applied to values
     * inside haps.
     * @param {Function} value_test
     * @returns Pattern
     * @example
     * const drums = s("bd sd bd sd")
     * kick: drums.filterValues((v) => v.s === 'bd').duck(2)
     * snare: drums.filterValues((v) => v.s === 'sd')
     * bass: s("saw!4").note("G#1").lpf(80).lpenv(4).orbit(2)
     */
    filterValues(e) {
      return new _f2((n) => this.query(n).filter((s2) => e(s2.value))).setSteps(this._steps);
    }
    /**
     * Returns a new pattern, with haps containing undefined values removed from
     * query results.
     * @returns Pattern
     * @noAutocomplete
     */
    removeUndefineds() {
      return this.filterValues((e) => e != null);
    }
    /**
     * Returns a new pattern, with all haps without onsets filtered out. A hap
     * with an onset is one with a `whole` timespan that begins at the same time
     * as its `part` timespan.
     * @returns Pattern
     * @noAutocomplete
     */
    onsetsOnly() {
      return this.filterHaps((e) => e.hasOnset());
    }
    /**
     * Returns a new pattern, with 'continuous' haps (those without 'whole'
     * timespans) removed from query results.
     * @returns Pattern
     * @noAutocomplete
     */
    discreteOnly() {
      return this.filterHaps((e) => e.whole);
    }
    /**
     * Combines adjacent haps with the same value and whole.  Only
     * intended for use in tests.
     * @noAutocomplete
     */
    defragmentHaps() {
      return this.discreteOnly().withHaps((n) => {
        const s2 = [];
        for (var r = 0; r < n.length; ++r) {
          for (var o = true, i = n[r]; o; ) {
            const p = JSON.stringify(n[r].value);
            for (var a2 = false, u2 = r + 1; u2 < n.length; u2++) {
              const h = n[u2];
              if (i.whole.equals(h.whole)) {
                if (i.part.begin.eq(h.part.end)) {
                  if (p === JSON.stringify(h.value)) {
                    i = new S2(i.whole, new B2(h.part.begin, i.part.end), i.value), n.splice(u2, 1), a2 = true;
                    break;
                  }
                } else if (h.part.begin.eq(i.part.end) && p == JSON.stringify(h.value)) {
                  i = new S2(i.whole, new B2(i.part.begin, h.part.end), i.value), n.splice(u2, 1), a2 = true;
                  break;
                }
              }
            }
            o = a2;
          }
          s2.push(i);
        }
        return s2;
      });
    }
    /**
     * Queries the pattern for the first cycle, returning Haps. Mainly of use when
     * debugging a pattern.
     * @param {Boolean} with_context - set to true, otherwise the context field
     * will be stripped from the resulting haps.
     * @returns [Hap]
     * @noAutocomplete
     */
    firstCycle(e = false) {
      var n = this;
      return e || (n = n.stripContext()), n.query(new ut2(new B2(m(0), m(1))));
    }
    /**
     * Accessor for a list of values returned by querying the first cycle.
     * @noAutocomplete
     */
    get firstCycleValues() {
      return this.firstCycle().map((e) => e.value);
    }
    /**
     * More human-readable version of the `firstCycleValues` accessor.
     * @noAutocomplete
     */
    get showFirstCycle() {
      return this.firstCycle().map(
        (e) => `${e.value}: ${e.whole.begin.toFraction()} - ${e.whole.end.toFraction()}`
      );
    }
    /**
     * Returns a new pattern, which returns haps sorted in temporal order. Mainly
     * of use when comparing two patterns for equality, in tests.
     * @returns Pattern
     * @noAutocomplete
     */
    sortHapsByPart() {
      return this.withHaps(
        (e) => e.sort(
          (n, s2) => n.part.begin.sub(s2.part.begin).or(n.part.end.sub(s2.part.end)).or(n.whole.begin.sub(s2.whole.begin).or(n.whole.end.sub(s2.whole.end)))
        )
      );
    }
    asNumber() {
      return this.fmap(ce2);
    }
    //////////////////////////////////////////////////////////////////////
    // Operators - see 'make composers' later..
    _opIn(e, n) {
      return this.fmap(n).appLeft(d(e));
    }
    _opOut(e, n) {
      return this.fmap(n).appRight(d(e));
    }
    _opMix(e, n) {
      return this.fmap(n).appBoth(d(e));
    }
    _opSqueeze(e, n) {
      const s2 = d(e);
      return this.fmap((r) => s2.fmap((o) => n(r)(o))).squeezeJoin();
    }
    _opSqueezeOut(e, n) {
      const s2 = this;
      return d(e).fmap((o) => s2.fmap((i) => n(i)(o))).squeezeJoin();
    }
    _opReset(e, n) {
      return d(e).fmap((r) => this.fmap((o) => n(o)(r))).resetJoin();
    }
    _opRestart(e, n) {
      return d(e).fmap((r) => this.fmap((o) => n(o)(r))).restartJoin();
    }
    _opPoly(e, n) {
      const s2 = d(e);
      return this.fmap((r) => s2.fmap((o) => n(o)(r))).polyJoin();
    }
    //////////////////////////////////////////////////////////////////////
    // End-user methods.
    // Those beginning with an underscore (_) are 'patternified',
    // i.e. versions are created without the underscore, that are
    // magically transformed to accept patterns for all their arguments.
    //////////////////////////////////////////////////////////////////////
    // Methods without corresponding toplevel functions
    /**
     * Layers the result of the given function(s). Like `superimpose`, but without the original pattern:
     * @name layer
     * @memberof Pattern
     * @synonyms apply
     * @returns Pattern
     * @example
     * "<0 2 4 6 ~ 4 ~ 2 0!3 ~!5>*8"
     *   .layer(x=>x.add("0,2"))
     *   .scale('C minor').note()
     */
    layer(...e) {
      return z(...e.map((n) => n(this)));
    }
    /**
     * Superimposes the result of the given function(s) on top of the original pattern:
     * @name superimpose
     * @memberof Pattern
     * @returns Pattern
     * @example
     * "<0 2 4 6 ~ 4 ~ 2 0!3 ~!5>*8"
     *   .superimpose(x=>x.add(2))
     *   .scale('C minor').note()
     */
    superimpose(...e) {
      return this.stack(...e.map((n) => n(this)));
    }
    //////////////////////////////////////////////////////////////////////
    // Multi-pattern functions
    stack(...e) {
      return z(this, ...e);
    }
    sequence(...e) {
      return Q2(this, ...e);
    }
    seq(...e) {
      return Q2(this, ...e);
    }
    cat(...e) {
      return mt2(this, ...e);
    }
    fastcat(...e) {
      return N2(this, ...e);
    }
    slowcat(...e) {
      return Z2(this, ...e);
    }
    //////////////////////////////////////////////////////////////////////
    // Context methods - ones that deal with metadata
    onTrigger(e, n = true) {
      return this.withHap(
        (s2) => s2.setContext({
          ...s2.context,
          onTrigger: (...r) => {
            s2.context.onTrigger?.(...r), e(...r);
          },
          // if dominantTrigger is set to true, the default output (webaudio) will be disabled
          // when using multiple triggers, you cannot flip this flag to false again!
          // example: x.csound('CooLSynth').log() as well as x.log().csound('CooLSynth') should work the same
          dominantTrigger: s2.context.dominantTrigger || n
        })
      );
    }
    /**
     * Writes the content of the current event to the console (visible in the side menu).
     * @name log
     * @memberof Pattern
     * @example
     * s("bd sd").log()
     */
    log(e = (s2) => `[hap] ${s2.showWhole(true)}`, n = (s2) => ({ hap: s2 })) {
      return this.onTrigger((...s2) => {
        E2(e(...s2), void 0, n(...s2));
      }, false);
    }
    /**
     * A simplified version of `log` which writes all "values" (various configurable parameters)
     * within the event to the console (visible in the side menu).
     * @name logValues
     * @memberof Pattern
     * @example
     * s("bd sd").gain("0.25 0.5 1").n("2 1 0").logValues()
     */
    logValues(e = (n) => `[hap] ${ae(n, true)}`) {
      return this.log((n) => e(n.value));
    }
    //////////////////////////////////////////////////////////////////////
    // Visualisation
    drawLine() {
      return console.log(Cn(this)), this;
    }
    //////////////////////////////////////////////////////////////////////
    // methods relating to breaking patterns into subcycles
    // Breaks a pattern into a pattern of patterns, according to the structure of the given binary pattern.
    unjoin(e, n = ot2) {
      return e.withHap(
        (s2) => s2.withValue((r) => r ? n(this.ribbon(s2.whole.begin, s2.whole.duration)) : this)
      );
    }
    /**
     * Breaks a pattern into pieces according to the structure of a given pattern.
     * True values in the given pattern cause the corresponding subcycle of the
     * source pattern to be looped, and for an (optional) given function to be
     * applied. False values result in the corresponding part of the source pattern
     * to be played unchanged.
     * @name into
     * @memberof Pattern
     * @example
     * sound("bd sd ht lt").into("1 0", hurry(2))
     */
    into(e, n) {
      return this.unjoin(e, n).innerJoin();
    }
  };
  function zn(t, e) {
    let n = [];
    return e.forEach((s2) => {
      const r = n.findIndex(([o]) => t(s2, o));
      r === -1 ? n.push([s2]) : n[r].push(s2);
    }), n;
  }
  var Mn = (t, e) => t.spanEquals(e);
  f2.prototype.collect = function() {
    return this.withHaps(
      (t) => zn(Mn, t).map((e) => new S2(e[0].whole, e[0].part, e, {}))
    );
  };
  var yh = l("arpWith", (t, e) => e.collect().fmap((n) => d(t(n))).innerJoin().withHap((n) => new S2(n.whole, n.part, n.value.value, n.combineContext(n.value))));
  var wh = l(
    "arp",
    (t, e) => e.arpWith((n) => d(t).fmap((s2) => n[s2 % n.length])),
    false
  );
  function dt2(t) {
    return !Array.isArray(t) && typeof t == "object" && !An(t);
  }
  function Pn(t, e, n) {
    return dt2(t) || dt2(e) ? (dt2(t) || (t = { value: t }), dt2(e) || (e = { value: e }), Tn(t, e, n)) : n(t, e);
  }
  (function() {
    const t = {
      set: [(n, s2) => s2],
      keep: [(n) => n],
      keepif: [(n, s2) => s2 ? n : void 0],
      // numerical functions
      /**
       *
       * Assumes a pattern of numbers. Adds the given number to each item in the pattern.
       * @name add
       * @memberof Pattern
       * @example
       * // Here, the triad 0, 2, 4 is shifted by different amounts
       * n("0 2 4".add("<0 3 4 0>")).scale("C:major")
       * // Without add, the equivalent would be:
       * // n("<[0 2 4] [3 5 7] [4 6 8] [0 2 4]>").scale("C:major")
       * @example
       * // You can also use add with notes:
       * note("c3 e3 g3".add("<0 5 7 0>"))
       * // Behind the scenes, the notes are converted to midi numbers:
       * // note("48 52 55".add("<0 5 7 0>"))
       */
      add: [L2((n, s2) => n + s2)],
      // support string concatenation
      /**
       *
       * Like add, but the given numbers are subtracted.
       * @name sub
       * @memberof Pattern
       * @example
       * n("0 2 4".sub("<0 1 2 3>")).scale("C4:minor")
       * // See add for more information.
       */
      sub: [L2((n, s2) => n - s2)],
      /**
       *
       * Multiplies each number by the given factor.
       * @name mul
       * @memberof Pattern
       * @example
       * "<1 1.5 [1.66, <2 2.33>]>*4".mul(150).freq()
       */
      mul: [L2((n, s2) => n * s2)],
      /**
       *
       * Divides each number by the given factor.
       * @name div
       * @memberof Pattern
       */
      div: [L2((n, s2) => n / s2)],
      mod: [L2(bt2)],
      pow: [L2(Math.pow)],
      log2: [L2(Math.log2)],
      band: [L2((n, s2) => n & s2)],
      bor: [L2((n, s2) => n | s2)],
      bxor: [L2((n, s2) => n ^ s2)],
      blshift: [L2((n, s2) => n << s2)],
      brshift: [L2((n, s2) => n >> s2)],
      // TODO - force numerical comparison if both look like numbers?
      lt: [(n, s2) => n < s2],
      gt: [(n, s2) => n > s2],
      lte: [(n, s2) => n <= s2],
      gte: [(n, s2) => n >= s2],
      eq: [(n, s2) => n == s2],
      eqt: [(n, s2) => n === s2],
      ne: [(n, s2) => n != s2],
      net: [(n, s2) => n !== s2],
      and: [(n, s2) => n && s2],
      or: [(n, s2) => n || s2],
      //  bitwise ops
      func: [(n, s2) => s2(n)]
    }, e = ["In", "Out", "Mix", "Squeeze", "SqueezeOut", "Reset", "Restart", "Poly"];
    for (const [n, [s2, r]] of Object.entries(t)) {
      f2.prototype["_" + n] = function(o) {
        return this.fmap((i) => s2(i, o));
      }, Object.defineProperty(f2.prototype, n, {
        // a getter that returns a function, so 'pat' can be
        // accessed by closures that are methods of that function..
        get: function() {
          const o = this, i = (...a2) => o[n].in(...a2);
          for (const a2 of e)
            i[a2.toLowerCase()] = function(...u2) {
              var p = o;
              u2 = Q2(u2), r && (p = r(p), u2 = r(u2));
              var h;
              return n === "keepif" ? (h = p["_op" + a2](u2, (y2) => (g2) => s2(y2, g2)), h = h.removeUndefineds()) : h = p["_op" + a2](u2, (y2) => (g2) => Pn(y2, g2, s2)), h;
            };
          return i.squeezein = i.squeeze, i;
        }
      });
      for (const o of e)
        f2.prototype[o.toLowerCase()] = function(...i) {
          return this.set[o.toLowerCase()](i);
        };
    }
    f2.prototype.struct = function(...n) {
      return this.keepif.out(...n);
    }, f2.prototype.structAll = function(...n) {
      return this.keep.out(...n);
    }, f2.prototype.mask = function(...n) {
      return this.keepif.in(...n);
    }, f2.prototype.maskAll = function(...n) {
      return this.keep.in(...n);
    }, f2.prototype.reset = function(...n) {
      return this.keepif.reset(...n);
    }, f2.prototype.resetAll = function(...n) {
      return this.keep.reset(...n);
    }, f2.prototype.restart = function(...n) {
      return this.keepif.restart(...n);
    }, f2.prototype.restartAll = function(...n) {
      return this.keep.restart(...n);
    };
  })();
  var gh = z;
  var bh = z;
  var _h = $t2;
  var pt2 = (t) => new f2(() => [], t);
  var q2 = pt2(1);
  var R = pt2(0);
  function C2(t) {
    function e(s2) {
      return s2.span.spanCycles.map((r) => new S2(m(r.begin).wholeCycle(), r, t));
    }
    const n = new f2(e, 1);
    return n.__pure = t, n;
  }
  function pe2(t) {
    return t instanceof f2 || t?._Pattern;
  }
  function d(t) {
    return pe2(t) ? t : Ct2 && typeof t == "string" ? Ct2(t) : C2(t);
  }
  function En(t) {
    let e = C2([]);
    for (const n of t)
      e = e.bind((s2) => n.fmap((r) => s2.concat([r])));
    return e;
  }
  function z(...t) {
    t = t.map((s2) => Array.isArray(s2) ? Q2(...s2) : d(s2));
    const e = (s2) => G(t.map((r) => r.query(s2))), n = new f2(e);
    return J2 && (n._steps = Y2(...t.map((s2) => s2._steps))), n;
  }
  function Et2(t, e) {
    if (e = e.map((o) => Array.isArray(o) ? Q2(...o) : d(o)), e.length === 0)
      return q2;
    if (e.length === 1)
      return e[0];
    const [n, ...s2] = e.map((o) => o._steps), r = J2 ? n.maximum(...s2) : void 0;
    return z(...t(r, e));
  }
  function jn(...t) {
    return Et2(
      (e, n) => n.map((s2) => s2._steps.eq(e) ? s2 : $2(s2, pt2(e.sub(s2._steps)))),
      t
    );
  }
  function Jn(...t) {
    return Et2(
      (e, n) => n.map((s2) => s2._steps.eq(e) ? s2 : $2(pt2(e.sub(s2._steps)), s2)),
      t
    );
  }
  function $n(...t) {
    return Et2(
      (e, n) => n.map((s2) => {
        if (s2._steps.eq(e))
          return s2;
        const r = pt2(e.sub(s2._steps).div(2));
        return $2(r, s2, r);
      }),
      t
    );
  }
  function vh(t, ...e) {
    const [n, ...s2] = e.map((i) => i._steps), r = n.maximum(...s2), o = {
      centre: $n,
      left: jn,
      right: Jn,
      expand: z,
      repeat: (...i) => $t2(...i).steps(r)
    };
    return t.inhabit(o).fmap((i) => i(...e)).innerJoin().setSteps(r);
  }
  function Z2(...t) {
    if (t = t.map((s2) => Array.isArray(s2) ? N2(...s2) : d(s2)), t.length == 1)
      return t[0];
    const e = function(s2) {
      const r = s2.span, o = bt2(r.begin.sam(), t.length), i = t[o];
      if (!i)
        return [];
      const a2 = r.begin.floor().sub(r.begin.div(t.length).floor());
      return i.withHapTime((u2) => u2.add(a2)).query(s2.setSpan(r.withTime((u2) => u2.sub(a2))));
    }, n = J2 ? Y2(...t.map((s2) => s2._steps)) : void 0;
    return new f2(e).splitQueries().setSteps(n);
  }
  function fe2(...t) {
    t = t.map(d);
    const e = function(n) {
      const s2 = Math.floor(n.span.begin) % t.length;
      return t[s2]?.query(n) || [];
    };
    return new f2(e).splitQueries();
  }
  function mt2(...t) {
    return Z2(...t);
  }
  function kh(...t) {
    const e = t.reduce((n, [s2]) => n + s2, 0);
    return t = t.map(([n, s2]) => [n, s2.fast(n)]), $2(...t).slow(e);
  }
  function qh(...t) {
    let e = m(0);
    for (let n of t)
      n.length == 2 && n.unshift(e), e = n[1];
    return z(
      ...t.map(
        ([n, s2, r]) => C2(d(r)).compress(m(n).div(e), m(s2).div(e))
      )
    ).slow(e).innerJoin();
  }
  function N2(...t) {
    let e = Z2(...t);
    return t.length > 1 && (e = e._fast(t.length), e._steps = t.length), t.length == 1 && t[0].__steps_source && (t._steps = t[0]._steps), e;
  }
  function Q2(...t) {
    return N2(...t);
  }
  function Nn(...t) {
    return N2(...t);
  }
  function xt2(t) {
    return Array.isArray(t) ? t.length == 0 ? [q2, 0] : t.length == 1 ? xt2(t[0]) : [N2(...t.map((e) => xt2(e)[0])), t.length] : [d(t), 1];
  }
  var Sh = w2((t, e) => d(e).mask(t));
  var Ah = w2((t, e) => d(e).struct(t));
  var Th = w2((t, e) => d(e).superimpose(...t));
  var Ch = w2((t, e) => d(e).withValue(t));
  var xh = w2((t, e) => d(e).bind(t));
  var Bh = w2((t, e) => d(e).innerBind(t));
  var Oh = w2((t, e) => d(e).outerBind(t));
  var zh = w2((t, e) => d(e).squeezeBind(t));
  var Mh = w2((t, e) => d(e).stepBind(t));
  var Ph = w2((t, e) => d(e).polyBind(t));
  var Eh = w2((t, e) => d(e).set(t));
  var jh = w2((t, e) => d(e).keep(t));
  var Jh = w2((t, e) => d(e).keepif(t));
  var $h = w2((t, e) => d(e).add(t));
  var Nh = w2((t, e) => d(e).sub(t));
  var Lh = w2((t, e) => d(e).mul(t));
  var Rh = w2((t, e) => d(e).div(t));
  var Wh = w2((t, e) => d(e).mod(t));
  var Fh = w2((t, e) => d(e).pow(t));
  var Ih = w2((t, e) => d(e).band(t));
  var Vh = w2((t, e) => d(e).bor(t));
  var Hh = w2((t, e) => d(e).bxor(t));
  var Dh = w2((t, e) => d(e).blshift(t));
  var Gh = w2((t, e) => d(e).brshift(t));
  var Qh = w2((t, e) => d(e).lt(t));
  var Uh = w2((t, e) => d(e).gt(t));
  var Xh = w2((t, e) => d(e).lte(t));
  var Kh = w2((t, e) => d(e).gte(t));
  var Yh = w2((t, e) => d(e).eq(t));
  var Zh = w2((t, e) => d(e).eqt(t));
  var td = w2((t, e) => d(e).ne(t));
  var ed = w2((t, e) => d(e).net(t));
  var nd = w2((t, e) => d(e).and(t));
  var sd = w2((t, e) => d(e).or(t));
  var rd = w2((t, e) => d(e).func(t));
  function l(t, e, n = true, s2 = false, r = (o) => o.innerJoin()) {
    if (Array.isArray(t)) {
      const u2 = {};
      for (const p of t)
        u2[p] = l(p, e, n, s2, r);
      return u2;
    }
    const o = e.length;
    var i;
    n ? i = function(...u2) {
      u2 = u2.map(d);
      const p = u2[u2.length - 1];
      let h;
      if (o === 1)
        h = e(p);
      else {
        const y2 = u2.slice(0, -1);
        if (y2.every((g2) => g2.__pure != null)) {
          const g2 = y2.map((_3) => _3.__pure), v = y2.filter((_3) => _3.__pure_loc).map((_3) => _3.__pure_loc);
          h = e(...g2, p), h = h.withContext((_3) => {
            const O2 = (_3.locations || []).concat(v);
            return { ..._3, locations: O2 };
          });
        } else {
          const [g2, ...v] = y2;
          let _3 = (...O2) => e(...O2, p);
          _3 = w2(_3, null, o - 1), h = r(v.reduce((O2, A4) => O2.appLeft(A4), g2.fmap(_3)));
        }
      }
      return s2 && (h._steps = p._steps), h;
    } : i = function(...u2) {
      u2 = u2.map(d);
      const p = e(...u2);
      return s2 && (p._steps = u2[u2.length - 1]._steps), p;
    }, f2.prototype[t] = function(...u2) {
      if (o === 2 && u2.length !== 1)
        u2 = [Q2(...u2)];
      else if (o !== u2.length + 1)
        throw new Error(`.${t}() expects ${o - 1} inputs but got ${u2.length}.`);
      return u2 = u2.map(d), i(...u2, this);
    }, o > 1 && (f2.prototype["_" + t] = function(...u2) {
      const p = e(...u2, this);
      return s2 && p.setSteps(this._steps), p;
    });
    const a2 = w2(i, null, o);
    return le[t] = a2, a2;
  }
  function et2(t, e, n = true, s2 = false, r = (o) => o.stepJoin()) {
    return l(t, e, n, s2, r);
  }
  var od = l("round", function(t) {
    return t.asNumber().fmap((e) => Math.round(e));
  });
  var cd = l("floor", function(t) {
    return t.asNumber().fmap((e) => Math.floor(e));
  });
  var id = l("ceil", function(t) {
    return t.asNumber().fmap((e) => Math.ceil(e));
  });
  var ud = l("toBipolar", function(t) {
    return t.fmap((e) => e * 2 - 1);
  });
  var ad = l("fromBipolar", function(t) {
    return t.fmap((e) => (e + 1) / 2);
  });
  var ld = l("range", function(t, e, n) {
    return n.mul(e - t).add(t);
  });
  var pd = l("rangex", function(t, e, n) {
    return n._range(Math.log(t), Math.log(e)).fmap(Math.exp);
  });
  var fd = l("range2", function(t, e, n) {
    return n.fromBipolar()._range(t, e);
  });
  var hd = l(
    "ratio",
    (t) => t.fmap((e) => Array.isArray(e) ? e.slice(1).reduce((n, s2) => n / s2, e[0]) : e)
  );
  var dd = l("compress", function(t, e, n) {
    return t = m(t), e = m(e), t.gt(e) || t.gt(1) || e.gt(1) || t.lt(0) || e.lt(0) ? q2 : n._fastGap(m(1).div(e.sub(t)))._late(t);
  });
  var { compressSpan: md, compressspan: yd } = l(["compressSpan", "compressspan"], function(t, e) {
    return e._compress(t.begin, t.end);
  });
  var { fastGap: wd, fastgap: gd } = l(["fastGap", "fastgap"], function(t, e) {
    const n = function(r) {
      const o = r.begin.sam(), i = r.begin.sub(o).mul(t).min(1), a2 = r.end.sub(o).mul(t).min(1);
      if (!(i >= 1))
        return new B2(o.add(i), o.add(a2));
    }, s2 = function(r) {
      const o = r.part.begin, i = r.part.end, a2 = o.sam(), u2 = o.sub(a2).div(t).min(1), p = i.sub(a2).div(t).min(1), h = new B2(a2.add(u2), a2.add(p)), y2 = r.whole ? new B2(
        h.begin.sub(o.sub(r.whole.begin).div(t)),
        h.end.add(r.whole.end.sub(i).div(t))
      ) : void 0;
      return new S2(y2, h, r.value, r.context);
    };
    return e.withQuerySpanMaybe(n).withHap(s2).splitQueries();
  });
  var bd = l("focus", function(t, e, n) {
    return t = m(t), e = m(e), n._early(t.sam())._fast(m(1).div(e.sub(t)))._late(t);
  });
  var { focusSpan: _d, focusspan: vd } = l(["focusSpan", "focusspan"], function(t, e) {
    return e._focus(t.begin, t.end);
  });
  var kd = l("ply", function(t, e) {
    const n = e.fmap((s2) => C2(s2)._fast(t)).squeezeJoin();
    return J2 && (n._steps = m(t).mulmaybe(e._steps)), n;
  });
  var { fast: qd, density: Sd } = l(
    ["fast", "density"],
    function(t, e) {
      return t === 0 ? q2 : (t = m(t), e.withQueryTime((s2) => s2.mul(t)).withHapTime((s2) => s2.div(t)).setSteps(e._steps));
    },
    true,
    true
  );
  var Ad = l("hurry", function(t, e) {
    return e._fast(t).mul(C2({ speed: t }));
  });
  var { slow: Td, sparsity: Cd } = l(["slow", "sparsity"], function(t, e) {
    return t === 0 ? q2 : e._fast(m(1).div(t));
  });
  var xd = l("inside", function(t, e, n) {
    return e(n._slow(t))._fast(t);
  });
  var Bd = l("outside", function(t, e, n) {
    return e(n._fast(t))._slow(t);
  });
  var Od = l("lastOf", function(t, e, n) {
    const s2 = Array(t - 1).fill(n);
    return s2.push(e(n)), fe2(...s2);
  });
  var { firstOf: zd, every: Md } = l(["firstOf", "every"], function(t, e, n) {
    const s2 = Array(t - 1).fill(n);
    return s2.unshift(e(n)), fe2(...s2);
  });
  var Pd = l("apply", function(t, e) {
    return t(e);
  });
  var Ed = l("cpm", function(t, e) {
    return e._fast(t / 60 / 1);
  });
  var jd = l(
    "early",
    function(t, e) {
      return t = m(t), e.withQueryTime((n) => n.add(t)).withHapTime((n) => n.sub(t));
    },
    true,
    true
  );
  var Ln = l(
    "late",
    function(t, e) {
      return t = m(t), e._early(m(0).sub(t));
    },
    true,
    true
  );
  var Jd = l("zoom", function(t, e, n) {
    if (e = m(e), t = m(t), t.gte(e))
      return R;
    const s2 = e.sub(t), r = J2 ? n._steps?.mulmaybe(s2) : void 0;
    return n.withQuerySpan((o) => o.withCycle((i) => i.mul(s2).add(t))).withHapSpan((o) => o.withCycle((i) => i.sub(t).div(s2))).splitQueries().setSteps(r);
  });
  var { zoomArc: $d, zoomarc: Nd } = l(["zoomArc", "zoomarc"], function(t, e) {
    return e.zoom(t.begin, t.end);
  });
  var Ld = l(
    "bite",
    (t, e, n) => e.fmap((s2) => (r) => {
      const o = m(s2).div(r).mod(1), i = o.add(m(1).div(r));
      return n.zoom(o, i);
    }).appLeft(t).squeezeJoin(),
    false
  );
  var Rd = l(
    "linger",
    function(t, e) {
      return t == 0 ? q2 : t < 0 ? e._zoom(t.add(1), 1)._slow(t) : e._zoom(0, t)._slow(t);
    },
    true,
    true
  );
  var { segment: Wd, seg: Fd } = l(["segment", "seg"], function(t, e) {
    return e.struct(C2(true)._fast(t)).setSteps(t);
  });
  var Id = l("swingBy", (t, e, n) => n.inside(e, Ln(Nn(0, t / 2))));
  var Vd = l("swing", (t, e) => e.swingBy(1 / 3, t));
  var { invert: Hd, inv: Dd } = l(
    ["invert", "inv"],
    function(t) {
      return t.fmap((e) => !e);
    },
    true,
    true
  );
  var Gd = l("when", function(t, e, n) {
    return t ? e(n) : n;
  });
  var Qd = l("off", function(t, e, n) {
    return z(n, e(n.late(t)));
  });
  var Ud = l("brak", function(t) {
    return t.when(Z2(false, true), (e) => N2(e, q2)._late(0.25));
  });
  var Rn = l(
    "rev",
    function(t) {
      const e = function(n) {
        const s2 = n.span, r = s2.begin.sam(), o = s2.begin.nextSam(), i = function(u2) {
          const p = u2.withTime((y2) => r.add(o.sub(y2))), h = p.begin;
          return p.begin = p.end, p.end = h, p;
        };
        return t.query(n.setSpan(i(s2))).map((u2) => u2.withSpan(i));
      };
      return new f2(e).splitQueries();
    },
    false,
    true
  );
  var Xd = l("revv", function(t) {
    const e = (n) => new B2(m(0).sub(n.end), m(0).sub(n.begin));
    return t.withQuerySpan(e).withHapSpan(e);
  });
  var Kd = l("pressBy", function(t, e) {
    return e.fmap((n) => C2(n).compress(t, 1)).squeezeJoin();
  });
  var Yd = l("press", function(t) {
    return t._pressBy(0.5);
  });
  f2.prototype.hush = function() {
    return q2;
  };
  var Zd = l(
    "palindrome",
    function(t) {
      return t.lastOf(2, Rn);
    },
    true,
    true
  );
  var { juxBy: tm, juxby: em } = l(["juxBy", "juxby"], function(t, e, n) {
    t /= 2;
    const s2 = function(i, a2, u2) {
      return a2 in i ? i[a2] : u2;
    }, r = n.withValue((i) => Object.assign({}, i, { pan: s2(i, "pan", 0.5) - t })), o = e(n.withValue((i) => Object.assign({}, i, { pan: s2(i, "pan", 0.5) + t })));
    return z(r, o).setSteps(J2 ? Y2(r._steps, o._steps) : void 0);
  });
  var nm = l("jux", function(t, e) {
    return e._juxBy(1, t, e);
  });
  var { echoWith: sm, echowith: rm, stutWith: om, stutwith: cm } = l(
    ["echoWith", "echowith", "stutWith", "stutwith"],
    function(t, e, n, s2) {
      return z(..._t2(0, t - 1).map((r) => n(s2.late(m(e).mul(r)), r)));
    }
  );
  var im = l("echo", function(t, e, n, s2) {
    return s2._echoWith(t, e, (r, o) => r.gain(Math.pow(n, o)));
  });
  var um = l("stut", function(t, e, n, s2) {
    return s2._echoWith(t, n, (r, o) => r.gain(Math.pow(e, o)));
  });
  var Wn = l("applyN", function(t, e, n) {
    let s2 = n;
    for (let r = 0; r < t; r++)
      s2 = e(s2);
    return s2;
  });
  var am = l(["plyWith", "plywith"], function(t, e, n) {
    const s2 = n.fmap((r) => mt2(..._t2(0, t - 1).map((o) => Wn(o, e, r)))._fast(t)).squeezeJoin();
    return J2 && (s2._steps = m(t).mulmaybe(n._steps)), s2;
  });
  var lm = l(["plyForEach", "plyforeach"], function(t, e, n) {
    const s2 = n.fmap((r) => mt2(mt2(C2(r), ..._t2(1, t - 1).map((o) => e(C2(r), o))))._fast(t)).squeezeJoin();
    return J2 && (s2._steps = m(t).mulmaybe(n._steps)), s2;
  });
  var jt2 = function(t, e, n = false) {
    return t = m(t), Z2(
      ..._t2(0, t.sub(1)).map(
        (s2) => n ? e.late(m(s2).div(t)) : e.early(m(s2).div(t))
      )
    );
  };
  var pm = l(
    "iter",
    function(t, e) {
      return jt2(t, e, false);
    },
    true,
    true
  );
  var { iterBack: fm, iterback: hm } = l(
    ["iterBack", "iterback"],
    function(t, e) {
      return jt2(t, e, true);
    },
    true,
    true
  );
  var { repeatCycles: dm } = l(
    "repeatCycles",
    function(t, e) {
      return new f2(function(n) {
        const s2 = n.span.begin.sam(), r = s2.div(t).sam(), o = s2.sub(r);
        return n = n.withSpan((i) => i.withTime((a2) => a2.sub(o))), e.query(n).map((i) => i.withSpan((a2) => a2.withTime((u2) => u2.add(o))));
      }).splitQueries();
    },
    true,
    true
  );
  var Jt2 = function(t, e, n, s2 = false, r = false) {
    const o = Array(t - 1).fill(false);
    o.unshift(true);
    const i = jt2(t, Q2(...o), !s2);
    return r || (n = n.repeatCycles(t)), n.when(i, e);
  };
  var { chunk: mm, slowchunk: ym, slowChunk: wm } = l(
    ["chunk", "slowchunk", "slowChunk"],
    function(t, e, n) {
      return Jt2(t, e, n, false, false);
    },
    true,
    true
  );
  var { chunkBack: gm, chunkback: bm } = l(
    ["chunkBack", "chunkback"],
    function(t, e, n) {
      return Jt2(t, e, n, true);
    },
    true,
    true
  );
  var { fastchunk: _m, fastChunk: vm } = l(
    ["fastchunk", "fastChunk"],
    function(t, e, n) {
      return Jt2(t, e, n, false, true);
    },
    true,
    true
  );
  var { chunkinto: km, chunkInto: qm } = l(["chunkinto", "chunkInto"], function(t, e, n) {
    return n.into(N2(true, ...Array(t - 1).fill(false))._iterback(t), e);
  });
  var { chunkbackinto: Sm, chunkBackInto: Am } = l(["chunkbackinto", "chunkBackInto"], function(t, e, n) {
    return n.into(
      N2(true, ...Array(t - 1).fill(false))._iter(t)._early(1),
      e
    );
  });
  var Tm = l(
    "bypass",
    function(t, e) {
      return t = !!parseInt(t), t ? q2 : e;
    },
    true,
    true
  );
  var { ribbon: Cm, rib: xm } = l(
    ["ribbon", "rib"],
    (t, e, n) => n.early(t).restart(C2(1).slow(e))
  );
  var Bm = l("hsla", (t, e, n, s2, r) => r.color(`hsla(${t}turn,${e * 100}%,${n * 100}%,${s2})`));
  var Om = l("hsl", (t, e, n, s2) => s2.color(`hsl(${t}turn,${e * 100}%,${n * 100}%)`));
  f2.prototype.tag = function(t) {
    return this.withContext((e) => ({ ...e, tags: (e.tags || []).concat([t]) }));
  };
  var zm = l("filter", (t, e) => e.withHaps((n) => n.filter(t)));
  var Mm = l("filterWhen", (t, e) => e.filter((n) => t(n.whole.begin)));
  var Pm = l(
    "within",
    (t, e, n, s2) => z(
      n(s2.filterWhen((r) => r.cyclePos() >= t && r.cyclePos() <= e)),
      s2.filterWhen((r) => r.cyclePos() < t || r.cyclePos() > e)
    )
  );
  f2.prototype.stepJoin = function() {
    const t = this, e = $2(...Yt2(Zt2(t.queryArc(0, 1))))._steps, n = function(s2) {
      const o = t.early(s2.span.begin.sam()).query(s2.setSpan(new B2(m(0), m(1))));
      return $2(...Yt2(Zt2(o))).query(s2);
    };
    return new f2(n, e);
  };
  f2.prototype.stepBind = function(t) {
    return this.fmap(t).stepJoin();
  };
  function Yt2(t) {
    const e = t.filter((o, i) => i.hasSteps).reduce((o, i) => o.add(i), m(0)), n = lt2(t.map((o, i) => i._steps)).reduce(
      (o, i) => o.add(i),
      m(0)
    ), s2 = e.eq(0) ? void 0 : n.div(e);
    function r(o, i) {
      return i._steps === void 0 ? [o.mulmaybe(s2), i] : [i._steps, i];
    }
    return t.map((o) => r(...o));
  }
  function Zt2(t) {
    const e = G(t.map((r) => [r.part.begin, r.part.end])), n = yn([m(0), m(1), ...e]);
    return un(n).map((r) => [
      r[1].sub(r[0]),
      z(...Fn(new B2(...r), t).map((o) => o.value.withHap((i) => i.setContext(i.combineContext(o)))))
    ]);
  }
  function Fn(t, e) {
    return lt2(e.map((n) => In(t, n)));
  }
  function In(t, e) {
    const n = t.intersection(e.part);
    if (n != null)
      return new S2(e.whole, n, e.value, e.context);
  }
  var Vn = l("pace", function(t, e) {
    return e._steps === void 0 ? e : e._steps.eq(m(0)) ? R : e._fast(m(t).div(e._steps)).setSteps(t);
  });
  function Hn(t, ...e) {
    const n = e.map((r) => xt2(r));
    if (n.length == 0)
      return q2;
    t == 0 && (t = n[0][1]);
    const s2 = [];
    for (const r of n)
      r[1] != 0 && (t == r[1] ? s2.push(r[0]) : s2.push(r[0]._fast(m(t).div(m(r[1])))));
    return z(...s2);
  }
  function $t2(...t) {
    if (Array.isArray(t[0]))
      return Hn(0, ...t);
    if (t = t.filter((s2) => s2.hasSteps), t.length == 0)
      return q2;
    const e = Y2(...t.map((s2) => s2._steps));
    if (e.eq(m(0)))
      return R;
    const n = z(...t.map((s2) => s2.pace(e)));
    return n._steps = e, n;
  }
  function $2(...t) {
    if (t.length === 0)
      return R;
    const e = (i) => Array.isArray(i) ? i : [i._steps ?? 1, i];
    if (t = t.map(e), t.find((i) => i[0] === void 0)) {
      const i = t.map((u2) => u2[0]).filter((u2) => u2 !== void 0);
      if (i.length === 0)
        return N2(...t.map((u2) => u2[1]));
      if (i.length === t.length)
        return R;
      const a2 = i.reduce((u2, p) => u2.add(p), m(0)).div(i.length);
      for (let u2 of t)
        u2[0] === void 0 && (u2[0] = a2);
    }
    if (t.length == 1)
      return d(t[0][1]).withSteps((a2) => t[0][0]);
    const n = t.map((i) => i[0]).reduce((i, a2) => i.add(a2), m(0));
    let s2 = m(0);
    const r = [];
    for (const [i, a2] of t) {
      if (m(i).eq(0))
        continue;
      const u2 = s2.add(i);
      r.push(d(a2)._compress(s2.div(n), u2.div(n))), s2 = u2;
    }
    const o = z(...r);
    return o._steps = n, o;
  }
  function Dn(...t) {
    t = t.map((r) => Array.isArray(r) ? r.map(d) : [d(r)]);
    const e = Y2(...t.map((r) => m(r.length)));
    let n = [];
    for (let r = 0; r < e; ++r)
      n.push(...t.map((o) => o.length == 0 ? q2 : o[r % o.length]));
    n = n.filter((r) => r.hasSteps && r._steps > 0);
    const s2 = n.reduce((r, o) => r.add(o._steps), m(0));
    return n = $2(...n), n._steps = s2, n;
  }
  var Gn = et2("take", function(t, e) {
    if (!e.hasSteps || e._steps.lte(0) || (t = m(t), t.eq(0)))
      return R;
    const n = t < 0;
    n && (t = t.abs());
    const s2 = t.div(e._steps);
    return s2.lte(0) ? R : s2.gte(1) ? e : n ? e.zoom(m(1).sub(s2), 1) : e.zoom(0, s2);
  });
  var Qn = et2("drop", function(t, e) {
    return e.hasSteps ? (t = m(t), t.lt(0) ? e.take(e._steps.add(t)) : e.take(m(0).sub(e._steps.sub(t)))) : R;
  });
  var Un = et2("extend", function(t, e) {
    return e.fast(t).expand(t);
  });
  var Em = et2("replicate", function(t, e) {
    return e.repeatCycles(t).fast(t).expand(t);
  });
  var Xn = et2("expand", function(t, e) {
    return e.withSteps((n) => n.mul(m(t)));
  });
  var Kn = et2("contract", function(t, e) {
    return e.withSteps((n) => n.div(m(t)));
  });
  f2.prototype.shrinklist = function(t) {
    const e = this;
    if (!e.hasSteps)
      return [e];
    let [n, s2] = Array.isArray(t) ? t : [t, e._steps];
    if (n = m(n), s2 === 0 || n === 0)
      return [e];
    const r = n > 0, o = [];
    if (r) {
      const i = m(1).div(e._steps).mul(n);
      for (let a2 = 0; a2 < s2; ++a2) {
        const u2 = i.mul(a2);
        if (u2.gt(1))
          break;
        o.push([u2, 1]);
      }
    } else {
      n = m(0).sub(n);
      const i = m(1).div(e._steps).mul(n);
      for (let a2 = 0; a2 < s2; ++a2) {
        const u2 = m(1).sub(i.mul(a2));
        if (u2.lt(0))
          break;
        o.push([m(0), u2]);
      }
    }
    return o.map((i) => e.zoom(...i));
  };
  var Yn = (t, e) => e.shrinklist(t);
  var Zn = l(
    "shrink",
    function(t, e) {
      if (!e.hasSteps)
        return R;
      const n = e.shrinklist(t), s2 = $2(...n);
      return s2._steps = n.reduce((r, o) => r.add(o._steps), m(0)), s2;
    },
    true,
    false,
    (t) => t.stepJoin()
  );
  var jm = l(
    "grow",
    function(t, e) {
      if (!e.hasSteps)
        return R;
      const n = e.shrinklist(m(0).sub(t));
      n.reverse();
      const s2 = $2(...n);
      return s2._steps = n.reduce((r, o) => r.add(o._steps), m(0)), s2;
    },
    true,
    false,
    (t) => t.stepJoin()
  );
  var ts = function(t, ...e) {
    return t.tour(...e);
  };
  f2.prototype.tour = function(...t) {
    return $2(
      ...[].concat(
        ...t.map((e, n) => [...t.slice(0, t.length - n), this, ...t.slice(t.length - n)]),
        this,
        ...t
      )
    );
  };
  var es = function(...t) {
    t = t.filter((s2) => s2.hasSteps);
    const e = Z2(...t.map((s2) => s2._slow(s2._steps))), n = Y2(...t.map((s2) => s2._steps));
    return e._fast(n).setSteps(n);
  };
  var Jm = $2;
  var ns = $2;
  var $m = $2;
  var Nm = Dn;
  var Lm = $t2;
  f2.prototype.s_polymeter = f2.prototype.polymeter;
  var Rm = Zn;
  f2.prototype.s_taper = f2.prototype.shrink;
  var Wm = Yn;
  f2.prototype.s_taperlist = f2.prototype.shrinklist;
  var Fm = Gn;
  f2.prototype.s_add = f2.prototype.take;
  var Im = Qn;
  f2.prototype.s_sub = f2.prototype.drop;
  var Vm = Xn;
  f2.prototype.s_expand = f2.prototype.expand;
  var Hm = Un;
  f2.prototype.s_extend = f2.prototype.extend;
  var Dm = Kn;
  f2.prototype.s_contract = f2.prototype.contract;
  var Gm = ts;
  f2.prototype.s_tour = f2.prototype.tour;
  var Qm = es;
  f2.prototype.s_zip = f2.prototype.zip;
  var Um = Vn;
  f2.prototype.steps = f2.prototype.pace;
  var Xm = l("chop", function(t, e) {
    const s2 = Array.from({ length: t }, (i, a2) => a2).map((i) => ({ begin: i / t, end: (i + 1) / t })), r = function(i, a2) {
      if ("begin" in i && "end" in i && i.begin !== void 0 && i.end !== void 0) {
        const u2 = i.end - i.begin;
        a2 = { begin: i.begin + a2.begin * u2, end: i.begin + a2.end * u2 };
      }
      return Object.assign({}, i, a2);
    }, o = function(i) {
      return Q2(s2.map((a2) => r(i, a2)));
    };
    return e.squeezeBind(o).setSteps(J2 ? m(t).mulmaybe(e._steps) : void 0);
  });
  var Km = l("striate", function(t, e) {
    const s2 = Array.from({ length: t }, (o, i) => i).map((o) => ({ begin: o / t, end: (o + 1) / t })), r = Z2(...s2);
    return e.set(r)._fast(t).setSteps(J2 ? m(t).mulmaybe(e._steps) : void 0);
  });
  var he2 = function(t, e, n = 0.5) {
    return e.speed(1 / t * n).unit("c").slow(t);
  };
  var ss = l(
    "slice",
    function(t, e, n) {
      return t.innerBind(
        (s2) => e.outerBind(
          (r) => n.outerBind((o) => {
            o = o instanceof Object ? o : { s: o };
            const i = Array.isArray(s2) ? s2[r] : r / s2, a2 = Array.isArray(s2) ? s2[r + 1] : (r + 1) / s2;
            return C2({ begin: i, end: a2, _slices: s2, ...o });
          })
        )
      ).setSteps(e._steps);
    },
    false
    // turns off auto-patternification
  );
  f2.prototype.onTriggerTime = function(t) {
    return this.onTrigger((e, n, s2, r) => {
      const o = r - n;
      window.setTimeout(() => {
        t(e);
      }, o * 1e3);
    }, false);
  };
  var Ym = l(
    "splice",
    function(t, e, n) {
      const s2 = ss(t, e, n);
      return new f2((r) => {
        const o = r.controls._cps || 1;
        return s2.query(r).map(
          (a2) => a2.withValue((u2) => ({
            speed: o / u2._slices / a2.whole.duration * (u2.speed || 1),
            unit: "c",
            ...u2
          }))
        );
      }).setSteps(e._steps);
    },
    false
    // turns off auto-patternification
  );
  var { loopAt: Zm, loopat: ty } = l(["loopAt", "loopat"], function(t, e) {
    const n = e._steps ? e._steps.div(t) : void 0;
    return new f2((s2) => he2(t, e, s2.controls._cps).query(s2), n);
  });
  var ey = l(
    "fit",
    (t) => t.withHaps(
      (e, n) => e.map(
        (s2) => s2.withValue((r) => {
          const o = ("end" in r ? r.end : 1) - ("begin" in r ? r.begin : 0);
          return {
            ...r,
            speed: (n.controls._cps || 1) / s2.whole.duration * o,
            unit: "c"
          };
        })
      )
    )
  );
  var { loopAtCps: ny, loopatcps: sy } = l(["loopAtCps", "loopatcps"], function(t, e, n) {
    return he2(t, n, e);
  });
  var ry = (t) => C2(1).withValue(() => d(t())).innerJoin();
  var te2 = (t) => t < 0.5 ? 1 : 1 - (t - 0.5) / 0.5;
  var rs = (t, e, n) => {
    e = d(e), t = d(t), n = d(n);
    let s2 = e.fmap((o) => ({ gain: te2(o) })), r = e.fmap((o) => ({ gain: te2(1 - o) }));
    return z(t.mul(s2), n.mul(r));
  };
  f2.prototype.xfade = function(t, e) {
    return rs(this, t, e);
  };
  var os = (t) => (e, n, s2) => {
    e = m(e).mod(n), n = m(n);
    const r = e.div(n), o = e.add(1).div(n);
    return t(s2.fmap((i) => C2(i)._compress(r, o)));
  };
  var { beat: oy } = l(
    ["beat"],
    os((t) => t.innerJoin())
  );
  var de2 = (t, e, n) => {
    n = m(n);
    const s2 = m(1).div(t.length), r = (a2) => {
      const u2 = [];
      for (const [p, h] of a2.entries())
        h && u2.push([m(p).div(a2.length), h]);
      return u2;
    }, o = Pt2(
      ([a2, u2], [p, h]) => {
        const y2 = n.mul(p - a2).add(a2), g2 = y2.add(s2);
        return new B2(y2, g2);
      },
      r(t),
      r(e)
    );
    function i(a2) {
      const u2 = a2.span.begin.sam(), p = a2.span.cycleArc(), h = [];
      for (const y2 of o) {
        const g2 = y2.intersection(p);
        g2 !== void 0 && h.push(
          new S2(
            y2.withTime((v) => v.add(u2)),
            g2.withTime((v) => v.add(u2)),
            true
          )
        );
      }
      return h;
    }
    return new f2(i).splitQueries();
  };
  var cy = (t, e, n) => (t = d(t), e = d(e), n = d(n), t.innerBind((s2) => e.innerBind((r) => n.innerBind((o) => de2(s2, r, o)))));
  var U2 = function(t) {
    const e = function(n, s2) {
      const r = d(n).fmap((o) => Array.isArray(o) ? [...o, t] : [o, 1, t]);
      return s2 ? s2.distort(r) : C2({}).distort(r);
    };
    return f2.prototype[t] = function(n) {
      return e(n, this);
    }, e;
  };
  var iy = U2("soft");
  var uy = U2("hard");
  var ay = U2("cubic");
  var ly = U2("diode");
  var py = U2("asym");
  var fy = U2("fold");
  var hy = U2("sinefold");
  var dy = U2("chebyshev");
  var me2 = (t) => {
    let n = C2(w2((...s2) => s2, null, t.length));
    for (const s2 of t) n = n.appBoth(d(s2));
    return n;
  };
  var vt2 = (t) => Array.isArray(t) ? me2(t) : d(t);
  f2.prototype.partials = function(t) {
    return this.withValue((e) => (n) => ({ ...e, partials: n })).appLeft(vt2(t));
  };
  var my = (t) => vt2(t).as("partials");
  f2.prototype.phases = function(t) {
    return this.withValue((e) => (n) => ({ ...e, phases: n })).appLeft(vt2(t));
  };
  var yy = (t) => vt2(t).as("phases");
  f2.prototype.FX = function(...t) {
    return t = t.map(d), this.withValue((e) => (n) => {
      const s2 = e.FX ?? [];
      return { ...e, FX: s2.concat(n) };
    }).appLeft(me2(t));
  };
  var cs = (t) => {
    let n = C2(w2((...s2) => s2, null, t.length));
    for (const s2 of t) n = n.appLeft(s2);
    return n;
  };
  f2.prototype.worklet = function(t, ...e) {
    return e = e.map(d), this.outerBind((n) => cs(e).withValue((s2) => {
      const r = n.workletInputs ?? [];
      return { ...n, workletSrc: t, workletInputs: r.concat(s2) };
    }));
  };
  var wy = (...t) => C2({}).worklet(...t);
  function Nt2(t) {
    let e = Array.isArray(t);
    t = e ? t : [t];
    const n = t[0], s2 = (o) => {
      let i;
      if (typeof o == "object" && o.value !== void 0 && (i = { ...o }, o = o.value, delete i.value), e && Array.isArray(o)) {
        const a2 = i || {};
        return o.forEach((u2, p) => {
          p < t.length && (a2[t[p]] = u2);
        }), a2;
      } else return i ? (i[n] = o, i) : { [n]: o };
    }, r = function(o, i) {
      return i ? typeof o > "u" ? i.fmap(s2) : i.set(d(o).withValue(s2)) : d(o).withValue(s2);
    };
    return f2.prototype[n] = function(o) {
      return r(o, this);
    }, r;
  }
  var at2 = /* @__PURE__ */ new Map();
  function is(t) {
    return at2.has(t);
  }
  function c2(t, ...e) {
    const n = Array.isArray(t) ? t[0] : t;
    let s2 = {};
    return s2[n] = Nt2(t), at2.set(n, n), e.forEach((r) => {
      s2[r] = s2[n], at2.set(r, n), f2.prototype[r] = f2.prototype[n];
    }), s2;
  }
  function V2(t, e, ...n) {
    t = Array.isArray(t) ? t : [t];
    let s2 = {};
    for (let r = 1; r <= e; r++) {
      let o = [...n], i = [...t];
      if (r === 1) {
        const u2 = o.map((h) => `${h}1`), p = i.map((h) => `${h}1`);
        o = o.concat(u2).concat(p);
      } else
        o = o.map((u2) => `${u2}${r}`), i = i.map((u2) => `${u2}${r}`);
      const a2 = c2(i, ...o);
      s2 = { ...s2, ...a2 };
    }
    return s2;
  }
  var { s: us, sound: as } = c2(["s", "n", "gain"], "sound");
  var { wt: ls, wavetablePosition: ps } = c2("wt", "wavetablePosition");
  var { wtenv: fs } = c2("wtenv");
  var { wtattack: hs, wtatt: ds } = c2("wtattack", "wtatt");
  var { wtdecay: ms, wtdec: ys } = c2("wtdecay", "wtdec");
  var { wtsustain: ws, wtsus: gs } = c2("wtsustain", "wtsus");
  var { wtrelease: bs, wtrel: _s } = c2("wtrelease", "wtrel");
  var { wtrate: vs } = c2("wtrate");
  var { wtsync: ks } = c2("wtsync");
  var { wtdepth: qs } = c2("wtdepth");
  var { wtshape: Ss } = c2("wtshape");
  var { wtdc: As } = c2("wtdc");
  var { wtskew: Ts } = c2("wtskew");
  var { warp: Cs, wavetableWarp: xs } = c2("warp", "wavetableWarp");
  var { warpattack: Bs, warpatt: Os } = c2("warpattack", "warpatt");
  var { warpdecay: zs, warpdec: Ms } = c2("warpdecay", "warpdec");
  var { warpsustain: Ps, warpsus: Es } = c2("warpsustain", "warpsus");
  var { warprelease: js, warprel: Js } = c2("warprelease", "warprel");
  var { warprate: $s } = c2("warprate");
  var { warpdepth: Ns } = c2("warpdepth");
  var { warpshape: Ls } = c2("warpshape");
  var { warpdc: Rs } = c2("warpdc");
  var { warpskew: Ws } = c2("warpskew");
  var { warpmode: Fs, wavetableWarpMode: Is } = c2("warpmode", "wavetableWarpMode");
  var { wtphaserand: Vs, wavetablePhaseRand: Hs } = c2("wtphaserand", "wavetablePhaseRand");
  var { warpenv: Ds } = c2("warpenv");
  var { warpsync: Gs } = c2("warpsync");
  var { source: Qs, src: Us } = c2("source", "src");
  var { n: Xs } = c2("n");
  var { note: Ks } = c2(["note", "n"]);
  var { accelerate: Ys } = c2("accelerate");
  var { velocity: Zs, vel: tr } = c2("velocity", "vel");
  var { gain: er } = c2("gain");
  var { postgain: nr } = c2("postgain");
  var { amp: sr } = c2("amp");
  var { attack: rr, att: or } = c2("attack", "att");
  var { fmh: cr, fmh1: ir, fmh2: ur, fmh3: ar, fmh4: lr, fmh5: pr, fmh6: fr, fmh7: hr, fmh8: dr } = V2(["fmh", "fmi"], 8, "fmh");
  var { fmi: mr, fmi1: yr, fmi2: wr, fmi3: gr, fmi4: br, fmi5: _r, fmi6: vr, fmi7: kr, fmi8: qr, fm: Sr, fm1: Ar, fm2: Tr, fm3: Cr, fm4: xr, fm5: Br, fm6: Or, fm7: zr, fm8: Mr } = V2(["fmi", "fmh"], 8, "fm");
  var { fmenv: Pr, fmenv1: Er, fmenv2: jr, fmenv3: Jr, fmenv4: $r, fmenv5: Nr, fmenv6: Lr, fmenv7: Rr, fmenv8: Wr } = V2(
    "fmenv",
    8
  );
  var {
    fmattack: Fr,
    fmattack1: Ir,
    fmattack2: Vr,
    fmattack3: Hr,
    fmattack4: Dr,
    fmattack5: Gr,
    fmattack6: Qr,
    fmattack7: Ur,
    fmattack8: Xr,
    fmatt: Kr,
    fmatt1: Yr,
    fmatt2: Zr,
    fmatt3: to,
    fmatt4: eo,
    fmatt5: no,
    fmatt6: so,
    fmatt7: ro,
    fmatt8: oo
  } = V2("fmattack", 8, "fmatt");
  var { fmwave: co, fmwave1: io, fmwave2: uo, fmwave3: ao, fmwave4: lo, fmwave5: po, fmwave6: fo, fmwave7: ho, fmwave8: mo } = V2(
    "fmwave",
    8
  );
  var {
    fmdecay: yo,
    fmdecay1: wo,
    fmdecay2: go,
    fmdecay3: bo,
    fmdecay4: _o,
    fmdecay5: vo,
    fmdecay6: ko,
    fmdecay7: qo,
    fmdecay8: So,
    fmdec: Ao,
    fmdec1: To,
    fmdec2: Co,
    fmdec3: xo,
    fmdec4: Bo,
    fmdec5: Oo,
    fmdec6: zo,
    fmdec7: Mo,
    fmdec8: Po
  } = V2("fmdecay", 8, "fmdec");
  var {
    fmsustain: Eo,
    fmsustain1: jo,
    fmsustain2: Jo,
    fmsustain3: $o,
    fmsustain4: No,
    fmsustain5: Lo,
    fmsustain6: Ro,
    fmsustain7: Wo,
    fmsustain8: Fo,
    fmsus: Io,
    fmsus1: Vo,
    fmsus2: Ho,
    fmsus3: Do,
    fmsus4: Go,
    fmsus5: Qo,
    fmsus6: Uo,
    fmsus7: Xo,
    fmsus8: Ko
  } = V2("fmsustain", 8, "fmsus");
  var {
    fmrelease: Yo,
    fmrelease1: Zo,
    fmrelease2: tc,
    fmrelease3: ec,
    fmrelease4: nc,
    fmrelease5: sc,
    fmrelease6: rc,
    fmrelease7: oc,
    fmrelease8: cc,
    fmrel: ic,
    fmrel1: uc,
    fmrel2: ac,
    fmrel3: lc,
    fmrel4: pc,
    fmrel5: fc,
    fmrel6: hc,
    fmrel7: dc,
    fmrel8: mc
  } = V2("fmrelease", 8, "fmrel");
  for (let t = 0; t <= 8; t++)
    for (let e = 0; e <= 8; e++)
      c2(`fmi${t}${e}`, `fm${t}${e}`);
  var { bank: yc } = c2("bank");
  var { chorus: wc } = c2("chorus");
  var { analyze: gc } = c2("analyze");
  var { fft: bc } = c2("fft");
  var { decay: _c, dec: vc } = c2("decay", "dec");
  var { sustain: kc, sus: qc } = c2("sustain", "sus");
  var { release: Sc, rel: Ac } = c2("release", "rel");
  var { hold: Tc } = c2("hold");
  var { bandf: Cc, bpf: xc, bp: Bc } = c2(["bandf", "bandq", "bpenv"], "bpf", "bp");
  var { bandq: Oc, bpq: zc } = c2("bandq", "bpq");
  var { begin: Mc } = c2("begin");
  var { end: Pc } = c2("end");
  var { loop: Ec } = c2("loop");
  var { loopBegin: jc, loopb: Jc } = c2("loopBegin", "loopb");
  var { loopEnd: $c, loope: Nc } = c2("loopEnd", "loope");
  var { crush: Lc } = c2("crush");
  var { coarse: Rc } = c2("coarse");
  var { tremolo: Wc, trem: Fc } = c2(["tremolo", "tremolodepth", "tremoloskew", "tremolophase"], "trem");
  var { tremolosync: Ic } = c2(
    ["tremolosync", "tremolodepth", "tremoloskew", "tremolophase"],
    "tremsync"
  );
  var { tremolodepth: Vc } = c2("tremolodepth", "tremdepth");
  var { tremoloskew: Hc } = c2("tremoloskew", "tremskew");
  var { tremolophase: Dc } = c2("tremolophase", "tremphase");
  var { tremoloshape: Gc } = c2("tremoloshape", "tremshape");
  var { drive: Qc } = c2("drive");
  var { duck: Uc } = c2("duckorbit", "duck");
  var { duckdepth: Xc } = c2("duckdepth");
  var { duckonset: Kc } = c2("duckonset", "duckons");
  var { duckattack: Yc } = c2("duckattack", "duckatt");
  var { byteBeatExpression: Zc, bbexpr: ti2 } = c2("byteBeatExpression", "bbexpr");
  var { byteBeatStartTime: ei2, bbst: ni2 } = c2("byteBeatStartTime", "bbst");
  var { channels: si2, ch: ri2 } = c2("channels", "ch");
  var { pw: oi2 } = c2(["pw", "pwrate", "pwsweep"]);
  var { pwrate: ci2 } = c2("pwrate");
  var { pwsweep: ii2 } = c2("pwsweep");
  var { phaserrate: ui2, ph: ai2, phaser: li2 } = c2(
    ["phaserrate", "phaserdepth", "phasercenter", "phasersweep"],
    "ph",
    "phaser"
  );
  var { phasersweep: pi2, phs: fi2 } = c2("phasersweep", "phs");
  var { phasercenter: hi2, phc: di2 } = c2("phasercenter", "phc");
  var { phaserdepth: mi2, phd: yi2, phasdp: wi2 } = c2("phaserdepth", "phd", "phasdp");
  var { channel: gi2 } = c2("channel");
  var { cut: bi2 } = c2("cut");
  var { cutoff: _i2, ctf: vi2, lpf: ki2, lp: qi2 } = c2(["cutoff", "resonance", "lpenv"], "ctf", "lpf", "lp");
  var { lpenv: Si2, lpe: Ai2 } = c2("lpenv", "lpe");
  var { hpenv: Ti2, hpe: Ci2 } = c2("hpenv", "hpe");
  var { bpenv: xi2, bpe: Bi2 } = c2("bpenv", "bpe");
  var { lpattack: Oi2, lpa: zi2 } = c2("lpattack", "lpa");
  var { hpattack: Mi2, hpa: Pi2 } = c2("hpattack", "hpa");
  var { bpattack: Ei2, bpa: ji2 } = c2("bpattack", "bpa");
  var { lpdecay: Ji2, lpd: $i2 } = c2("lpdecay", "lpd");
  var { hpdecay: Ni2, hpd: Li2 } = c2("hpdecay", "hpd");
  var { bpdecay: Ri2, bpd: Wi2 } = c2("bpdecay", "bpd");
  var { lpsustain: Fi2, lps: Ii2 } = c2("lpsustain", "lps");
  var { hpsustain: Vi2, hps: Hi2 } = c2("hpsustain", "hps");
  var { bpsustain: Di2, bps: Gi2 } = c2("bpsustain", "bps");
  var { lprelease: Qi2, lpr: Ui2 } = c2("lprelease", "lpr");
  var { hprelease: Xi2, hpr: Ki2 } = c2("hprelease", "hpr");
  var { bprelease: Yi2, bpr: Zi2 } = c2("bprelease", "bpr");
  var { ftype: tu } = c2("ftype");
  var { fanchor: eu } = c2("fanchor");
  var { lprate: nu } = c2("lprate");
  var { lpsync: su } = c2("lpsync");
  var { lpdepth: ru } = c2("lpdepth");
  var { lpdepthfrequency: ou, lpdepthfreq: cu } = c2("lpdepthfrequency", "lpdepthfreq");
  var { lpshape: iu } = c2("lpshape");
  var { lpdc: uu } = c2("lpdc");
  var { lpskew: au } = c2("lpskew");
  var { bprate: lu } = c2("bprate");
  var { bpsync: pu } = c2("bpsync");
  var { bpdepth: fu } = c2("bpdepth");
  var { bpdepthfrequency: hu, bpdepthfreq: du } = c2("bpdepthfrequency", "bpdepthfreq");
  var { bpshape: mu } = c2("bpshape");
  var { bpdc: yu } = c2("bpdc");
  var { bpskew: wu } = c2("bpskew");
  var { hprate: gu } = c2("hprate");
  var { hpsync: bu } = c2("hpsync");
  var { hpdepth: _u } = c2("hpdepth");
  var { hpdepthfrequency: vu, hpdepthfreq: ku } = c2("hpdepthfrequency", "hpdepthfreq");
  var { hpshape: qu } = c2("hpshape");
  var { hpdc: Su } = c2("hpdc");
  var { hpskew: Au } = c2("hpskew");
  var { vib: Tu, vibrato: Cu, v: xu } = c2(["vib", "vibmod"], "vibrato", "v");
  var { noise: Bu } = c2("noise");
  var { vibmod: Ou, vmod: zu } = c2(["vibmod", "vib"], "vmod");
  var { hcutoff: Mu, hpf: Pu, hp: Eu } = c2(["hcutoff", "hresonance", "hpenv"], "hpf", "hp");
  var { hresonance: ju, hpq: Ju } = c2("hresonance", "hpq");
  var { resonance: $u, lpq: Nu } = c2("resonance", "lpq");
  var { djf: Lu } = c2("djf");
  var { delay: Ru } = c2(["delay", "delaytime", "delayfeedback"]);
  var { delayfeedback: Wu, delayfb: Fu, dfb: Iu } = c2("delayfeedback", "delayfb", "dfb");
  var { delayspeed: Vu } = c2("delayspeed");
  var { delaytime: Hu, delayt: Du, dt: Gu } = c2("delaytime", "delayt", "dt");
  var { delaysync: Qu } = c2("delaysync");
  var { lock: Uu } = c2("lock");
  var { detune: Xu, det: Ku } = c2("detune", "det");
  var { unison: Yu } = c2("unison");
  var { spread: Zu } = c2("spread");
  var { dry: ta } = c2("dry");
  var { fadeTime: ea, fadeOutTime: na } = c2("fadeTime", "fadeOutTime");
  var { fadeInTime: sa } = c2("fadeInTime");
  var { freq: ra } = c2("freq");
  var { pattack: oa, patt: ca } = c2("pattack", "patt");
  var { pdecay: ia, pdec: ua } = c2("pdecay", "pdec");
  var { psustain: aa, psus: la } = c2("psustain", "psus");
  var { prelease: pa, prel: fa } = c2("prelease", "prel");
  var { penv: ha } = c2("penv");
  var { pcurve: da } = c2("pcurve");
  var { panchor: ma } = c2("panchor");
  var { gate: ya, gat: wa } = c2("gate", "gat");
  var { leslie: ga } = c2("leslie");
  var { lrate: ba } = c2("lrate");
  var { lsize: _a } = c2("lsize");
  var { activeLabel: va } = c2("activeLabel");
  var { label: ka } = c2(["label", "activeLabel"]);
  var { degree: qa } = c2("degree");
  var { mtranspose: Sa } = c2("mtranspose");
  var { ctranspose: Aa } = c2("ctranspose");
  var { harmonic: Ta } = c2("harmonic");
  var { stepsPerOctave: Ca } = c2("stepsPerOctave");
  var { octaveR: xa } = c2("octaveR");
  var { nudge: Ba } = c2("nudge");
  var { octave: Oa, oct: za } = c2("octave", "oct");
  var { orbit: Ma } = c2("orbit", "o");
  var { bus: Pa } = c2("bus");
  var { busgain: Ea, bgain: ja } = c2("busgain", "bgain");
  var { overgain: Ja } = c2("overgain");
  var { overshape: $a } = c2("overshape");
  var { pan: Na } = c2("pan");
  var { panspan: La } = c2("panspan");
  var { pansplay: Ra } = c2("pansplay");
  var { panwidth: Wa } = c2("panwidth");
  var { panorient: Fa } = c2("panorient");
  var { slide: Ia } = c2("slide");
  var { semitone: Va } = c2("semitone");
  var { voice: Ha } = c2("voice");
  var { chord: Da } = c2("chord");
  var { dictionary: Ga, dict: Qa } = c2("dictionary", "dict");
  var { anchor: Ua } = c2("anchor");
  var { offset: Xa } = c2("offset");
  var { octaves: Ka } = c2("octaves");
  var { mode: Ya } = c2(["mode", "anchor"]);
  var { room: Za } = c2(["room", "size"]);
  var { roomlp: tl, rlp: el } = c2("roomlp", "rlp");
  var { roomdim: nl, rdim: sl } = c2("roomdim", "rdim");
  var { roomfade: rl, rfade: ol } = c2("roomfade", "rfade");
  var { ir: cl, iresponse: il } = c2(["ir", "i"], "iresponse");
  var { irspeed: ul } = c2("irspeed");
  var { irbegin: al } = c2("irbegin");
  var { roomsize: ll, size: pl, sz: fl, rsize: hl } = c2("roomsize", "size", "sz", "rsize");
  var { shape: dl } = c2(["shape", "shapevol"]);
  var { distort: ml, dist: yl } = c2(["distort", "distortvol", "distorttype"], "dist");
  var { distortvol: wl } = c2("distortvol", "distvol");
  var { distorttype: gl } = c2("distorttype", "disttype");
  var { compressor: bl } = c2([
    "compressor",
    "compressorRatio",
    "compressorKnee",
    "compressorAttack",
    "compressorRelease"
  ]);
  var { compressorKnee: _l } = c2("compressorKnee");
  var { compressorRatio: vl } = c2("compressorRatio");
  var { compressorAttack: kl } = c2("compressorAttack");
  var { compressorRelease: ql } = c2("compressorRelease");
  var { speed: ye2 } = c2("speed");
  var { stretch: Sl } = c2("stretch");
  var { unit: Al } = c2("unit");
  var { squiz: Tl } = c2("squiz");
  var { vowel: Cl } = c2("vowel");
  var { waveloss: xl } = c2("waveloss");
  var { density: Bl } = c2("density");
  var { expression: Ol } = c2("expression");
  var { sustainpedal: zl } = c2("sustainpedal");
  var { fshift: Ml } = c2("fshift");
  var { fshiftnote: Pl } = c2("fshiftnote");
  var { fshiftphase: El } = c2("fshiftphase");
  var { triode: jl } = c2("triode");
  var { krush: Jl } = c2("krush");
  var { kcutoff: $l } = c2("kcutoff");
  var { octer: Nl } = c2("octer");
  var { octersub: Ll } = c2("octersub");
  var { octersubsub: Rl } = c2("octersubsub");
  var { ring: Wl } = c2("ring");
  var { ringf: Fl } = c2("ringf");
  var { ringdf: Il } = c2("ringdf");
  var { freeze: Vl } = c2("freeze");
  var { xsdelay: Hl } = c2("xsdelay");
  var { tsdelay: Dl } = c2("tsdelay");
  var { real: Gl } = c2("real");
  var { imag: Ql } = c2("imag");
  var { enhance: Ul } = c2("enhance");
  var { comb: Xl } = c2("comb");
  var { smear: Kl } = c2("smear");
  var { scram: Yl } = c2("scram");
  var { binshift: Zl } = c2("binshift");
  var { hbrick: tp } = c2("hbrick");
  var { lbrick: ep } = c2("lbrick");
  var { frameRate: np } = c2("frameRate");
  var { frames: sp } = c2("frames");
  var { hours: rp } = c2("hours");
  var { minutes: op } = c2("minutes");
  var { seconds: cp } = c2("seconds");
  var { songPtr: ip } = c2("songPtr");
  var { uid: up } = c2("uid");
  var { val: ap } = c2("val");
  var { cps: lp } = c2("cps");
  var { clip: pp, legato: fp } = c2("clip", "legato");
  var { duration: hp, dur: dp } = c2("duration", "dur");
  var { zrand: mp } = c2("zrand");
  var { curve: yp } = c2("curve");
  var { deltaSlide: wp } = c2("deltaSlide");
  var { pitchJump: gp } = c2("pitchJump");
  var { pitchJumpTime: bp } = c2("pitchJumpTime");
  var { znoise: _p } = c2("znoise");
  var { zmod: vp } = c2("zmod");
  var { zcrush: kp } = c2("zcrush");
  var { zdelay: qp } = c2("zdelay");
  var { zzfx: Sp } = c2("zzfx");
  var { color: Ap, colour: Tp } = c2(["color", "colour"]);
  var Cp = (...t) => t.reduce((e, n) => Object.assign(e, { [n]: Nt2(n) }), {});
  var xp = l("adsr", (t, e) => {
    t = Array.isArray(t) ? t : [t];
    const [n, s2, r, o] = t;
    return e.set({ attack: n, decay: s2, sustain: r, release: o });
  });
  var Bp = l("ad", (t, e) => {
    t = Array.isArray(t) ? t : [t];
    const [n, s2 = n] = t;
    return e.attack(n).decay(s2);
  });
  var Op = l("ds", (t, e) => {
    t = Array.isArray(t) ? t : [t];
    const [n, s2 = 0] = t;
    return e.set({ decay: n, sustain: s2 });
  });
  var zp = l("ar", (t, e) => {
    t = Array.isArray(t) ? t : [t];
    const [n, s2 = n] = t;
    return e.set({ attack: n, release: s2 });
  });
  var { midichan: Mp } = c2("midichan");
  var { midimap: Pp } = c2("midimap");
  var { midiport: Ep } = c2("midiport");
  var { midicmd: jp } = c2("midicmd");
  var Jp = l("control", (t, e) => {
    if (!Array.isArray(t))
      throw new Error("control expects an array of [ccn, ccv]");
    const [n, s2] = t;
    return e.ccn(n).ccv(s2);
  });
  var { ccn: $p } = c2("ccn");
  var { ccv: Np } = c2("ccv");
  var { ctlNum: Lp } = c2("ctlNum");
  var { nrpnn: Rp } = c2("nrpnn");
  var { nrpv: Wp } = c2("nrpv");
  var { progNum: Fp } = c2("progNum");
  var Ip = l("sysex", (t, e) => {
    if (!Array.isArray(t))
      throw new Error("sysex expects an array of [id, data]");
    const [n, s2] = t;
    return e.sysexid(n).sysexdata(s2);
  });
  var { sysexid: Vp } = c2("sysexid");
  var { sysexdata: Hp } = c2("sysexdata");
  var { midibend: Dp } = c2("midibend");
  var { miditouch: Gp } = c2("miditouch");
  var { polyTouch: Qp } = c2("polyTouch");
  var { oschost: Up } = c2("oschost");
  var { oscport: Xp } = c2("oscport");
  var yt2 = (t) => at2.has(t) ? at2.get(t) : t;
  var Kp = l("as", (t, e) => (t = Array.isArray(t) ? t : [t], e.fmap((n) => {
    n = Array.isArray(n) ? n : [n];
    const s2 = [];
    for (let r = 0; r < t.length; ++r)
      n[r] !== void 0 && s2.push([yt2(t[r]), n[r]]);
    return Object.fromEntries(s2);
  })));
  var Yp = l(
    "scrub",
    (t, e) => t.outerBind((n) => {
      Array.isArray(n) || (n = [n]);
      const [s2, r = 1] = n;
      return e.begin(s2).mul(ye2(r)).clip(1);
    }),
    false
  );
  var Bt2 = /* @__PURE__ */ new Map();
  var Zp = (t, e, ...n) => {
    const s2 = Bt2.get(t) ?? /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set([e, ...n]);
    for (const o of r)
      s2.set(String(o).toLowerCase(), e);
    Bt2.set(t, s2);
  };
  var Lt2 = (t, e = []) => {
    for (const [n, ...s2] of e)
      Zp(t, n, ...s2);
  };
  var tf = (t, e) => {
    const n = Bt2.get(t);
    return n ? n.get(String(e).toLowerCase()) ?? e : e;
  };
  Lt2("lfo", [
    ["control", "c"],
    ["subControl", "sc"],
    ["rate", "r"],
    ["depth", "dep", "dr"],
    ["depthabs", "da"],
    ["dcoffset", "dc"],
    ["shape", "sh"],
    ["skew", "sk"],
    ["curve", "cu"],
    ["sync", "s"],
    ["fxi"]
  ]);
  Lt2("env", [
    ["control", "c"],
    ["subControl", "sc"],
    ["attack", "att", "a"],
    ["decay", "dec", "d"],
    ["sustain", "sus", "s"],
    ["release", "rel", "r"],
    ["depth", "dep", "dr"],
    ["depthabs", "da"],
    ["acurve", "ac"],
    ["dcurve", "dc"],
    ["rcurve", "rc"],
    ["fxi"]
  ]);
  Lt2("bmod", [
    ["bus", "b"],
    ["control", "c"],
    ["subControl", "sc"],
    ["depth", "dep", "dr"],
    ["depthabs", "da"],
    ["dc"],
    ["fxi"]
  ]);
  f2.prototype.modulate = function(t, e, n) {
    e = { control: void 0, ...e };
    const s2 = ["lfo", "env", "bmod"];
    if (!s2.includes(t))
      return E2(`[core] Modulation type ${t} not found. Please use one of 'lfo', 'env', 'bmod'`), this;
    let r = this, o;
    r = r.fmap((i) => (a2) => ({ v: i, id: a2 })).appLeft(d(n));
    for (const [i, a2] of Object.entries(e)) {
      const u2 = tf(t, i), p = d(a2);
      r = r.fmap(({ v: h, id: y2 }) => (g2) => {
        if (o === void 0) {
          let _3 = yt2(Object.keys(h).at(-1));
          s2.includes(_3) && (_3 = `${_3}_${[...h[_3].__ids].at(-1)}`), o = _3;
        }
        h[t] ?? (h[t] = { __ids: /* @__PURE__ */ new Set() });
        const v = h[t];
        return y2 ?? (y2 = v.__ids.size), v[y2] ?? (v[y2] = { control: o }), v.__ids.add(y2), g2 === void 0 ? { v: h, id: y2 } : (u2 === "control" || u2 === "subControl" ? v[y2][u2] = yt2(g2) : v[y2][u2] = g2, { v: h, id: y2 });
      }).appLeft(p);
    }
    return r.fmap(({ v: i }) => i);
  };
  f2.prototype.lfo = function(t, e) {
    return this.modulate("lfo", t, e);
  };
  var ef = (t) => C2({}).lfo(t);
  f2.prototype.env = function(t, e) {
    return this.modulate("env", t, e);
  };
  var nf = (t) => C2({}).env(t);
  f2.prototype.bmod = function(t, e) {
    return this.modulate("bmod", t, e);
  };
  var sf = (t) => C2({}).bmod(t);
  var { transient: rf } = c2(["transient", "transsustain"]);
  var { FXrelease: of, FXrel: cf, FXr: uf, fxr: af } = c2("FXrelease", "FXrel", "FXr", "fxr");
  var gy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    FXr: uf,
    FXrel: cf,
    FXrelease: of,
    accelerate: Ys,
    activeLabel: va,
    ad: Bp,
    adsr: xp,
    amp: sr,
    analyze: gc,
    anchor: Ua,
    ar: zp,
    as: Kp,
    att: or,
    attack: rr,
    bandf: Cc,
    bandq: Oc,
    bank: yc,
    bbexpr: ti2,
    bbst: ni2,
    begin: Mc,
    bgain: ja,
    binshift: Zl,
    bmod: sf,
    bp: Bc,
    bpa: ji2,
    bpattack: Ei2,
    bpd: Wi2,
    bpdc: yu,
    bpdecay: Ri2,
    bpdepth: fu,
    bpdepthfreq: du,
    bpdepthfrequency: hu,
    bpe: Bi2,
    bpenv: xi2,
    bpf: xc,
    bpq: zc,
    bpr: Zi2,
    bprate: lu,
    bprelease: Yi2,
    bps: Gi2,
    bpshape: mu,
    bpskew: wu,
    bpsustain: Di2,
    bpsync: pu,
    bus: Pa,
    busgain: Ea,
    byteBeatExpression: Zc,
    byteBeatStartTime: ei2,
    ccn: $p,
    ccv: Np,
    ch: ri2,
    channel: gi2,
    channels: si2,
    chord: Da,
    chorus: wc,
    clip: pp,
    coarse: Rc,
    color: Ap,
    colour: Tp,
    comb: Xl,
    compressor: bl,
    compressorAttack: kl,
    compressorKnee: _l,
    compressorRatio: vl,
    compressorRelease: ql,
    control: Jp,
    cps: lp,
    createParam: Nt2,
    createParams: Cp,
    crush: Lc,
    ctf: vi2,
    ctlNum: Lp,
    ctranspose: Aa,
    curve: yp,
    cut: bi2,
    cutoff: _i2,
    dec: vc,
    decay: _c,
    degree: qa,
    delay: Ru,
    delayfb: Fu,
    delayfeedback: Wu,
    delayspeed: Vu,
    delaysync: Qu,
    delayt: Du,
    delaytime: Hu,
    deltaSlide: wp,
    density: Bl,
    det: Ku,
    detune: Xu,
    dfb: Iu,
    dict: Qa,
    dictionary: Ga,
    dist: yl,
    distort: ml,
    distorttype: gl,
    distortvol: wl,
    djf: Lu,
    drive: Qc,
    dry: ta,
    ds: Op,
    dt: Gu,
    duck: Uc,
    duckattack: Yc,
    duckdepth: Xc,
    duckonset: Kc,
    dur: dp,
    duration: hp,
    end: Pc,
    enhance: Ul,
    env: nf,
    expression: Ol,
    fadeInTime: sa,
    fadeOutTime: na,
    fadeTime: ea,
    fanchor: eu,
    fft: bc,
    fm: Sr,
    fm1: Ar,
    fm2: Tr,
    fm3: Cr,
    fm4: xr,
    fm5: Br,
    fm6: Or,
    fm7: zr,
    fm8: Mr,
    fmatt: Kr,
    fmatt1: Yr,
    fmatt2: Zr,
    fmatt3: to,
    fmatt4: eo,
    fmatt5: no,
    fmatt6: so,
    fmatt7: ro,
    fmatt8: oo,
    fmattack: Fr,
    fmattack1: Ir,
    fmattack2: Vr,
    fmattack3: Hr,
    fmattack4: Dr,
    fmattack5: Gr,
    fmattack6: Qr,
    fmattack7: Ur,
    fmattack8: Xr,
    fmdec: Ao,
    fmdec1: To,
    fmdec2: Co,
    fmdec3: xo,
    fmdec4: Bo,
    fmdec5: Oo,
    fmdec6: zo,
    fmdec7: Mo,
    fmdec8: Po,
    fmdecay: yo,
    fmdecay1: wo,
    fmdecay2: go,
    fmdecay3: bo,
    fmdecay4: _o,
    fmdecay5: vo,
    fmdecay6: ko,
    fmdecay7: qo,
    fmdecay8: So,
    fmenv: Pr,
    fmenv1: Er,
    fmenv2: jr,
    fmenv3: Jr,
    fmenv4: $r,
    fmenv5: Nr,
    fmenv6: Lr,
    fmenv7: Rr,
    fmenv8: Wr,
    fmh: cr,
    fmh1: ir,
    fmh2: ur,
    fmh3: ar,
    fmh4: lr,
    fmh5: pr,
    fmh6: fr,
    fmh7: hr,
    fmh8: dr,
    fmi: mr,
    fmi1: yr,
    fmi2: wr,
    fmi3: gr,
    fmi4: br,
    fmi5: _r,
    fmi6: vr,
    fmi7: kr,
    fmi8: qr,
    fmrel: ic,
    fmrel1: uc,
    fmrel2: ac,
    fmrel3: lc,
    fmrel4: pc,
    fmrel5: fc,
    fmrel6: hc,
    fmrel7: dc,
    fmrel8: mc,
    fmrelease: Yo,
    fmrelease1: Zo,
    fmrelease2: tc,
    fmrelease3: ec,
    fmrelease4: nc,
    fmrelease5: sc,
    fmrelease6: rc,
    fmrelease7: oc,
    fmrelease8: cc,
    fmsus: Io,
    fmsus1: Vo,
    fmsus2: Ho,
    fmsus3: Do,
    fmsus4: Go,
    fmsus5: Qo,
    fmsus6: Uo,
    fmsus7: Xo,
    fmsus8: Ko,
    fmsustain: Eo,
    fmsustain1: jo,
    fmsustain2: Jo,
    fmsustain3: $o,
    fmsustain4: No,
    fmsustain5: Lo,
    fmsustain6: Ro,
    fmsustain7: Wo,
    fmsustain8: Fo,
    fmwave: co,
    fmwave1: io,
    fmwave2: uo,
    fmwave3: ao,
    fmwave4: lo,
    fmwave5: po,
    fmwave6: fo,
    fmwave7: ho,
    fmwave8: mo,
    frameRate: np,
    frames: sp,
    freeze: Vl,
    freq: ra,
    fshift: Ml,
    fshiftnote: Pl,
    fshiftphase: El,
    ftype: tu,
    fxr: af,
    gain: er,
    gat: wa,
    gate: ya,
    getControlName: yt2,
    harmonic: Ta,
    hbrick: tp,
    hcutoff: Mu,
    hold: Tc,
    hours: rp,
    hp: Eu,
    hpa: Pi2,
    hpattack: Mi2,
    hpd: Li2,
    hpdc: Su,
    hpdecay: Ni2,
    hpdepth: _u,
    hpdepthfreq: ku,
    hpdepthfrequency: vu,
    hpe: Ci2,
    hpenv: Ti2,
    hpf: Pu,
    hpq: Ju,
    hpr: Ki2,
    hprate: gu,
    hprelease: Xi2,
    hps: Hi2,
    hpshape: qu,
    hpskew: Au,
    hpsustain: Vi2,
    hpsync: bu,
    hresonance: ju,
    imag: Ql,
    ir: cl,
    irbegin: al,
    iresponse: il,
    irspeed: ul,
    isControlName: is,
    kcutoff: $l,
    krush: Jl,
    label: ka,
    lbrick: ep,
    legato: fp,
    leslie: ga,
    lfo: ef,
    lock: Uu,
    loop: Ec,
    loopBegin: jc,
    loopEnd: $c,
    loopb: Jc,
    loope: Nc,
    lp: qi2,
    lpa: zi2,
    lpattack: Oi2,
    lpd: $i2,
    lpdc: uu,
    lpdecay: Ji2,
    lpdepth: ru,
    lpdepthfreq: cu,
    lpdepthfrequency: ou,
    lpe: Ai2,
    lpenv: Si2,
    lpf: ki2,
    lpq: Nu,
    lpr: Ui2,
    lprate: nu,
    lprelease: Qi2,
    lps: Ii2,
    lpshape: iu,
    lpskew: au,
    lpsustain: Fi2,
    lpsync: su,
    lrate: ba,
    lsize: _a,
    midibend: Dp,
    midichan: Mp,
    midicmd: jp,
    midimap: Pp,
    midiport: Ep,
    miditouch: Gp,
    minutes: op,
    mode: Ya,
    mtranspose: Sa,
    n: Xs,
    noise: Bu,
    note: Ks,
    nrpnn: Rp,
    nrpv: Wp,
    nudge: Ba,
    oct: za,
    octave: Oa,
    octaveR: xa,
    octaves: Ka,
    octer: Nl,
    octersub: Ll,
    octersubsub: Rl,
    offset: Xa,
    orbit: Ma,
    oschost: Up,
    oscport: Xp,
    overgain: Ja,
    overshape: $a,
    pan: Na,
    panchor: ma,
    panorient: Fa,
    panspan: La,
    pansplay: Ra,
    panwidth: Wa,
    patt: ca,
    pattack: oa,
    pcurve: da,
    pdec: ua,
    pdecay: ia,
    penv: ha,
    ph: ai2,
    phasdp: wi2,
    phaser: li2,
    phasercenter: hi2,
    phaserdepth: mi2,
    phaserrate: ui2,
    phasersweep: pi2,
    phc: di2,
    phd: yi2,
    phs: fi2,
    pitchJump: gp,
    pitchJumpTime: bp,
    polyTouch: Qp,
    postgain: nr,
    prel: fa,
    prelease: pa,
    progNum: Fp,
    psus: la,
    psustain: aa,
    pw: oi2,
    pwrate: ci2,
    pwsweep: ii2,
    rdim: sl,
    real: Gl,
    registerControl: c2,
    registerMultiControl: V2,
    rel: Ac,
    release: Sc,
    resonance: $u,
    rfade: ol,
    ring: Wl,
    ringdf: Il,
    ringf: Fl,
    rlp: el,
    room: Za,
    roomdim: nl,
    roomfade: rl,
    roomlp: tl,
    roomsize: ll,
    rsize: hl,
    s: us,
    scram: Yl,
    scrub: Yp,
    seconds: cp,
    semitone: Va,
    shape: dl,
    size: pl,
    slide: Ia,
    smear: Kl,
    songPtr: ip,
    sound: as,
    source: Qs,
    speed: ye2,
    spread: Zu,
    squiz: Tl,
    src: Us,
    stepsPerOctave: Ca,
    stretch: Sl,
    sus: qc,
    sustain: kc,
    sustainpedal: zl,
    sysex: Ip,
    sysexdata: Hp,
    sysexid: Vp,
    sz: fl,
    transient: rf,
    trem: Fc,
    tremolo: Wc,
    tremolodepth: Vc,
    tremolophase: Dc,
    tremoloshape: Gc,
    tremoloskew: Hc,
    tremolosync: Ic,
    triode: jl,
    tsdelay: Dl,
    uid: up,
    unison: Yu,
    unit: Al,
    v: xu,
    val: ap,
    vel: tr,
    velocity: Zs,
    vib: Tu,
    vibmod: Ou,
    vibrato: Cu,
    vmod: zu,
    voice: Ha,
    vowel: Cl,
    warp: Cs,
    warpatt: Os,
    warpattack: Bs,
    warpdc: Rs,
    warpdec: Ms,
    warpdecay: zs,
    warpdepth: Ns,
    warpenv: Ds,
    warpmode: Fs,
    warprate: $s,
    warprel: Js,
    warprelease: js,
    warpshape: Ls,
    warpskew: Ws,
    warpsus: Es,
    warpsustain: Ps,
    warpsync: Gs,
    waveloss: xl,
    wavetablePhaseRand: Hs,
    wavetablePosition: ps,
    wavetableWarp: xs,
    wavetableWarpMode: Is,
    wt: ls,
    wtatt: ds,
    wtattack: hs,
    wtdc: As,
    wtdec: ys,
    wtdecay: ms,
    wtdepth: qs,
    wtenv: fs,
    wtphaserand: Vs,
    wtrate: vs,
    wtrel: _s,
    wtrelease: bs,
    wtshape: Ss,
    wtskew: Ts,
    wtsus: gs,
    wtsustain: ws,
    wtsync: ks,
    xsdelay: Hl,
    zcrush: kp,
    zdelay: qp,
    zmod: vp,
    znoise: _p,
    zrand: mp,
    zzfx: Sp
  }, Symbol.toStringTag, { value: "Module" }));
  var lf = function(t, e) {
    const [n, s2] = t, [r, o] = e, [i, a2] = ue2(s2, r);
    return [
      [s2, n - s2],
      [Pt2((u2, p) => u2.concat(p), i, o), a2]
    ];
  };
  var pf = function(t, e) {
    const [n, s2] = t, [r, o] = e, [i, a2] = ue2(n, o);
    return [
      [n, s2 - n],
      [Pt2((p, h) => p.concat(h), r, i), a2]
    ];
  };
  var we2 = function(t, e) {
    const [n, s2] = t;
    return Math.min(n, s2) <= 1 ? [t, e] : we2(...n > s2 ? lf(t, e) : pf(t, e));
  };
  var ge2 = function(t, e) {
    const n = t < 0, s2 = Math.abs(t), r = e - s2, o = Array(s2).fill([1]), i = Array(r).fill([0]), a2 = we2([s2, r], [o, i]), u2 = G(a2[1][0]).concat(G(a2[1][1]));
    return n ? u2.map((p) => 1 - p) : u2;
  };
  var kt2 = function(t, e, n) {
    const s2 = ge2(t, e);
    return n ? rn(s2, -n) : s2;
  };
  var by = l("euclid", function(t, e, n) {
    return n.struct(kt2(t, e, 0));
  });
  var _y = l("bjork", function(t, e) {
    Array.isArray(t) || (t = [t]);
    const [n, s2 = n, r = 0] = t;
    return e.struct(kt2(n, s2, r));
  });
  var { euclidrot: vy, euclidRot: ky } = l(["euclidrot", "euclidRot"], function(t, e, n, s2) {
    return s2.struct(kt2(t, e, n));
  });
  var be2 = function(t, e, n, s2) {
    if (t < 1)
      return q2;
    const o = kt2(t, e, 0).join("").split("1").slice(1).map((i) => [i.length + 1, true]);
    return s2.struct(ns(...o)).late(m(n).div(e));
  };
  var qy = l(["euclidLegato"], function(t, e, n) {
    return be2(t, e, 0, n);
  });
  var Sy = l(["euclidLegatoRot"], function(t, e, n, s2) {
    return be2(t, e, n, s2);
  });
  var { euclidish: Ay, eish: Ty } = l(["euclidish", "eish"], function(t, e, n, s2) {
    const r = de2(ge2(t, e), new Array(t).fill(1), n);
    return s2.struct(r).setSteps(e);
  });
  function ff(t, e, n = 0.05, s2 = 0.1, r = 0.1, o = globalThis.setInterval, i = globalThis.clearInterval, a2 = true) {
    let u2 = 0, p = 0, h = 10 ** 4, y2 = 0.01;
    const g2 = (x2) => n = x2(n);
    r = r || s2 / 2;
    const v = () => {
      const x2 = t(), D3 = x2 + s2 + r;
      for (p === 0 && (p = x2 + y2); p < D3; )
        p = a2 ? Math.round(p * h) / h : p, e(p, n, u2, x2), p += n, u2++;
    };
    let _3;
    const O2 = () => {
      A4(), v(), _3 = o(v, s2 * 1e3);
    }, A4 = () => {
      _3 !== void 0 && i(_3), _3 = void 0;
    };
    return { setDuration: g2, start: O2, stop: () => {
      u2 = 0, p = 0, A4();
    }, pause: () => A4(), duration: n, interval: s2, getPhase: () => p, minLatency: y2 };
  }
  var hf = class {
    constructor({
      interval: e,
      onTrigger: n,
      onToggle: s2,
      onError: r,
      getTime: o,
      latency: i = 0.1,
      setInterval: a2,
      clearInterval: u2,
      beforeStart: p
    }) {
      this.started = false, this.beforeStart = p, this.cps = 0.5, this.num_ticks_since_cps_change = 0, this.lastTick = 0, this.lastBegin = 0, this.lastEnd = 0, this.getTime = o, this.num_cycles_at_cps_change = 0, this.seconds_at_cps_change, this.onToggle = s2, this.latency = i, this.clock = ff(
        o,
        // called slightly before each cycle
        (h, y2, g2, v) => {
          this.num_ticks_since_cps_change === 0 && (this.num_cycles_at_cps_change = this.lastEnd, this.seconds_at_cps_change = h), this.num_ticks_since_cps_change++;
          const O2 = this.num_ticks_since_cps_change * y2 * this.cps;
          try {
            const A4 = this.lastEnd;
            this.lastBegin = A4;
            const I3 = this.num_cycles_at_cps_change + O2;
            if (this.lastEnd = I3, this.lastTick = h, h < v) {
              console.log("skip query: too late");
              return;
            }
            this.pattern.queryArc(A4, I3, { _cps: this.cps, cyclist: "cyclist" }).forEach((P4) => {
              if (P4.hasOnset()) {
                const x2 = (P4.whole.begin - this.num_cycles_at_cps_change) / this.cps + this.seconds_at_cps_change + i, D3 = P4.duration / this.cps, nt2 = x2 - h;
                n?.(P4, nt2, D3, this.cps, x2), P4.value.cps !== void 0 && this.cps != P4.value.cps && (this.cps = P4.value.cps, this.num_ticks_since_cps_change = 0);
              }
            });
          } catch (A4) {
            zt2(A4), r?.(A4);
          }
        },
        e,
        // duration of each cycle
        0.1,
        0.1,
        a2,
        u2
      );
    }
    now() {
      if (!this.started)
        return 0;
      const e = this.getTime() - this.lastTick - this.clock.duration;
      return this.lastBegin + e * this.cps;
    }
    setStarted(e) {
      this.started = e, this.onToggle?.(e);
    }
    async start() {
      if (await this.beforeStart?.(), this.num_ticks_since_cps_change = 0, this.num_cycles_at_cps_change = 0, !this.pattern)
        throw new Error("Scheduler: no pattern set! call .setPattern first.");
      E2("[cyclist] start"), this.clock.start(), this.setStarted(true);
    }
    pause() {
      E2("[cyclist] pause"), this.clock.pause(), this.setStarted(false);
    }
    stop() {
      E2("[cyclist] stop"), this.clock.stop(), this.lastEnd = 0, this.setStarted(false);
    }
    async setPattern(e, n = false) {
      this.pattern = e, n && !this.started && await this.start();
    }
    setCps(e = 0.5) {
      this.cps !== e && (this.cps = e, this.num_ticks_since_cps_change = 0);
    }
    log(e, n, s2) {
      const r = s2.filter((o) => o.hasOnset());
      console.log(`${e.toFixed(4)} - ${n.toFixed(4)} ${Array(r.length).fill("I").join("")}`);
    }
  };
  var ct2 = {};
  var df = function() {
    mf();
  };
  var mf = function() {
    ct2 = {};
  };
  var Cy = l(
    "timeline",
    function(t, e) {
      t = d(t);
      const n = function(s2) {
        const r = !!s2.controls.cyclist, o = t.query(s2), i = [];
        for (const a2 of o) {
          const u2 = a2.value;
          let p;
          if (u2 === 0)
            p = 0;
          else if (u2 in ct2)
            p = ct2[u2];
          else {
            const y2 = a2.wholeOrPart();
            !r || s2.span.begin.lt(y2.midpoint()) ? p = y2.begin : p = y2.end;
          }
          r && (ct2[u2] = p, u2 !== 0 && delete ct2[-u2]);
          const h = e.late(p).query(s2.setSpan(a2.part)).map((y2) => y2.setContext(y2.combineContext(a2)));
          i.push(...h);
        }
        return i;
      };
      return new f2(n, e._steps);
    },
    false
  );
  var F2 = function(t, e, n = true) {
    const s2 = Array.isArray(t), r = Object.keys(t).length;
    return t = bn(t, d), r === 0 ? q2 : e.fmap((o) => {
      let i = o;
      return s2 && (i = n ? Math.round(i) % r : an(Math.round(i), 0, t.length - 1)), t[i];
    });
  };
  var yf = function(t, e) {
    return Array.isArray(e) && ([e, t] = [t, e]), wf(t, e);
  };
  var wf = l("pick", function(t, e) {
    return F2(t, e, false).innerJoin();
  });
  var gf = l("pickmod", function(t, e) {
    return F2(t, e, true).innerJoin();
  });
  var xy = l("pickF", function(t, e, n) {
    return n.apply(yf(t, e));
  });
  var By = l("pickmodF", function(t, e, n) {
    return n.apply(gf(t, e));
  });
  var Oy = l("pickOut", function(t, e) {
    return F2(t, e, false).outerJoin();
  });
  var zy = l("pickmodOut", function(t, e) {
    return F2(t, e, true).outerJoin();
  });
  var My = l("pickRestart", function(t, e) {
    return F2(t, e, false).restartJoin();
  });
  var Py = l("pickmodRestart", function(t, e) {
    return F2(t, e, true).restartJoin();
  });
  var Ey = l("pickReset", function(t, e) {
    return F2(t, e, false).resetJoin();
  });
  var jy = l("pickmodReset", function(t, e) {
    return F2(t, e, true).resetJoin();
  });
  var { inhabit: Jy, pickSqueeze: $y } = l(["inhabit", "pickSqueeze"], function(t, e) {
    return F2(t, e, false).squeezeJoin();
  });
  var { inhabitmod: Ny, pickmodSqueeze: Ly } = l(["inhabitmod", "pickmodSqueeze"], function(t, e) {
    return F2(t, e, true).squeezeJoin();
  });
  var Ry = (t, e) => (e = e.map(d), e.length == 0 ? q2 : t.fmap((n) => {
    const s2 = bt2(Math.round(n), e.length);
    return e[s2];
  }).squeezeJoin());
  var bf = class {
    constructor({ onTrigger: e, onToggle: n, getTime: s2 }) {
      this.started = false, this.cps = 0.5, this.getTime = s2, this.time_at_last_tick_message = 0, this.collator = new _n({ getTargetClockTime: s2 }), this.onToggle = n, this.latency = 0.1, this.cycle = 0, this.id = Math.round(Date.now() * Math.random()), this.worker = new SharedWorker(new URL(
        /* @vite-ignore */
        "" + new URL("assets/clockworker-ZDiUtESR.js", import_meta.url).href,
        import_meta.url
      )), this.worker.port.start(), this.channel = new BroadcastChannel("strudeltick");
      const r = (i) => {
        const { cps: a2, begin: u2, end: p, cycle: h, time: y2 } = i;
        this.cps = a2, this.cycle = h;
        const g2 = this.collator.calculateOffset(y2) + y2;
        o(u2, p, g2), this.time_at_last_tick_message = g2;
      }, o = (i, a2, u2) => {
        if (this.started === false)
          return;
        this.pattern.queryArc(i, a2, { _cps: this.cps, cyclist: "neocyclist" }).forEach((h) => {
          if (h.hasOnset()) {
            const g2 = Kt2(h.whole.begin - this.cycle, this.cps) + u2 + this.latency, v = Kt2(h.duration, this.cps);
            e?.(h, 0, v, this.cps, g2);
          }
        });
      };
      this.channel.onmessage = (i) => {
        if (!this.started)
          return;
        const { payload: a2, type: u2 } = i.data;
        switch (u2) {
          case "tick":
            r(a2);
        }
      };
    }
    sendMessage(e, n) {
      this.worker.port.postMessage({ type: e, payload: n, id: this.id });
    }
    now() {
      const e = (this.getTime() - this.time_at_last_tick_message) * this.cps;
      return this.cycle + e;
    }
    setCps(e = 1) {
      this.sendMessage("cpschange", { cps: e });
    }
    setCycle(e) {
      this.sendMessage("setcycle", { cycle: e });
    }
    setStarted(e) {
      this.sendMessage("toggle", { started: e }), this.started = e, this.onToggle?.(e);
    }
    start() {
      E2("[cyclist] start"), this.setStarted(true);
    }
    stop() {
      E2("[cyclist] stop"), this.collator.reset(), this.setStarted(false);
    }
    setPattern(e, n = false) {
      this.pattern = e, n && !this.started && this.start();
    }
    log(e, n, s2) {
      const r = s2.filter((o) => o.hasOnset());
      console.log(`${e.toFixed(4)} - ${n.toFixed(4)} ${Array(r.length).fill("I").join("")}`);
    }
  };
  var Ot2;
  var _e2;
  var ve2;
  var ke2;
  var qe2;
  function Wy() {
    if (!Ot2)
      throw new Error("no time set! use setTime to define a time source");
    return Ot2();
  }
  function ee2(t) {
    Ot2 = t;
  }
  function _f(t) {
    _e2 = t;
  }
  function Fy() {
    return _e2?.();
  }
  function vf(t) {
    ve2 = t;
  }
  function Iy() {
    return ve2;
  }
  function kf(t) {
    ke2 = t;
  }
  function Vy() {
    return ke2;
  }
  function qf(t) {
    qe2 = !!t;
  }
  function Hy() {
    return qe2;
  }
  function Dy({
    defaultOutput: t,
    onEvalError: e,
    beforeEval: n,
    beforeStart: s2,
    afterEval: r,
    getTime: o,
    transpiler: i,
    onToggle: a2,
    editPattern: u2,
    onUpdateState: p,
    sync: h = false,
    setInterval: y2,
    clearInterval: g2,
    id: v,
    mondo: _3 = false
  }) {
    const O2 = new en({ localScope: true }), A4 = {
      schedulerError: void 0,
      evalError: void 0,
      code: "// LOADING",
      activeCode: "// LOADING",
      pattern: void 0,
      miniLocations: [],
      widgets: [],
      pending: false,
      started: false
    }, I3 = {
      id: v
    }, H3 = (b2) => {
      Object.assign(A4, b2), A4.isDirty = A4.code !== A4.activeCode, A4.error = A4.evalError || A4.schedulerError, p?.(A4);
    }, P4 = {
      onTrigger: Sf({ defaultOutput: t, getTime: o }),
      getTime: o,
      onToggle: (b2) => {
        H3({ started: b2 }), qf(b2), a2?.(b2), b2 || df();
      },
      setInterval: y2,
      clearInterval: g2,
      beforeStart: s2
    }, x2 = h && typeof SharedWorker < "u" ? new bf(P4) : new hf(P4);
    kf(P4.onTrigger), _f(() => x2.cps);
    let D3 = {}, nt2 = 0, tt2;
    const Vt2 = function() {
      return D3 = {}, nt2 = 0, tt2 = void 0, q2;
    }, Je2 = (b2) => O2.evaluate(b2).compile({ log: false });
    function Ht2(b2) {
      return b2._Pattern ? b2.__pure : b2;
    }
    const Dt2 = async (b2, k3 = true) => (b2 = u2?.(b2) || b2, await x2.setPattern(b2, k3), vf(b2), b2);
    ee2(() => x2.now());
    const $e2 = () => x2.stop(), Ne2 = () => x2.start(), Le2 = () => x2.pause(), Re2 = () => x2.toggle(), St2 = (b2) => (x2.setCps(Ht2(b2)), q2), Gt2 = (b2) => (x2.setCps(Ht2(b2) / 60), q2);
    let ft2 = [];
    const We2 = function(b2) {
      return ft2.push(b2), q2;
    }, Fe2 = function(b2) {
      return tt2 = b2, q2;
    }, Ie2 = () => {
      f2.prototype.p = function(k3) {
        return typeof k3 == "string" && (k3.startsWith("_") || k3.endsWith("_")) ? q2 : (k3.includes("$") && (k3 = `${k3}${nt2}`, nt2++), D3[k3] = this, this);
      }, f2.prototype.q = function(k3) {
        return q2;
      };
      try {
        for (let k3 = 1; k3 < 10; ++k3)
          Object.defineProperty(f2.prototype, `d${k3}`, {
            get() {
              return this.p(k3);
            },
            configurable: true
          }), Object.defineProperty(f2.prototype, `p${k3}`, {
            get() {
              return this.p(k3);
            },
            configurable: true
          }), f2.prototype[`q${k3}`] = q2;
      } catch (k3) {
        console.warn("injectPatternMethods: error:", k3);
      }
      const b2 = l("cpm", function(k3, At2) {
        return At2._fast(k3 / 60 / x2.cps);
      });
      return xn({
        all: We2,
        each: Fe2,
        hush: Vt2,
        cpm: b2,
        setCps: St2,
        setcps: St2,
        setCpm: Gt2,
        setcpm: Gt2,
        compileKabel: Je2
      });
    };
    return { scheduler: x2, evaluate: async (b2, k3 = true, At2 = true) => {
      if (!b2)
        throw new Error("no code to evaluate");
      try {
        H3({ code: b2, pending: true }), await Ie2(), ee2(() => x2.now()), await n?.({ code: b2 }), ft2 = [], At2 && Vt2(), _3 && (b2 = `mondolang\`${b2}\``);
        let { pattern: M2, meta: Tt2 } = await On(b2, i, I3);
        if (Object.keys(D3).length) {
          let X2 = [], ht2 = false;
          for (const [st2, Ve2] of Object.entries(D3)) {
            const Qt2 = st2.length > 1 && st2.startsWith("S");
            if (Qt2 && ht2 === false && (X2 = [], ht2 = true), !ht2 || ht2 && Qt2) {
              const He2 = Ve2.withState((De2) => De2.setControls({ id: st2 }));
              X2.push(He2);
            }
          }
          tt2 && (X2 = X2.map((st2) => tt2(st2))), M2 = z(...X2);
        } else tt2 && (M2 = tt2(M2));
        if (ft2.length)
          for (const X2 of ft2)
            M2 = X2(M2);
        return pe2(M2) || (M2 = q2), E2("[eval] code updated"), M2 = await Dt2(M2, k3), H3({
          miniLocations: Tt2?.miniLocations || [],
          widgets: Tt2?.widgets || [],
          activeCode: b2,
          pattern: M2,
          evalError: void 0,
          schedulerError: void 0,
          pending: false
        }), r?.({ code: b2, pattern: M2, meta: Tt2 }), M2;
      } catch (M2) {
        E2(`[eval] error: ${M2.message}`, "error"), console.error(M2), H3({ evalError: M2, pending: false }), e?.(M2);
      }
    }, start: Ne2, stop: $e2, pause: Le2, setCps: St2, setPattern: Dt2, setCode: (b2) => H3({ code: b2 }), toggle: Re2, state: A4 };
  }
  var Sf = ({ getTime: t, defaultOutput: e }) => async (n, s2, r, o, i) => {
    try {
      (!n.context.onTrigger || !n.context.dominantTrigger) && await e(n, s2, r, o, i), n.context.onTrigger && await n.context.onTrigger(n, t(), o, i);
    } catch (a2) {
      zt2(a2, "getTrigger");
    }
  };
  function Gy(t) {
    return new f2((e) => [new S2(void 0, e.span, t)]);
  }
  var j2 = (t) => {
    const e = (n) => [new S2(void 0, n.span, t(n.span.begin, n.controls))];
    return new f2(e);
  };
  var qt2 = j2((t) => t % 1);
  var Se2 = qt2.toBipolar();
  var Rt2 = j2((t) => 1 - t % 1);
  var Ae2 = Rt2.toBipolar();
  var Te2 = j2((t) => Math.sin(Math.PI * 2 * t));
  var Af = Te2.fromBipolar();
  var Qy = Af._early(m(1).div(4));
  var Uy = Te2._early(m(1).div(4));
  var Tf = j2((t) => Math.floor(t * 2 % 2));
  var Xy = Tf.toBipolar();
  var Ky = N2(qt2, Rt2);
  var Yy = N2(Se2, Ae2);
  var Zy = N2(Rt2, qt2);
  var tw = N2(Ae2, Se2);
  var ew = j2(ot2);
  var Wt2 = 0;
  var Ft2 = 0;
  typeof window < "u" && document.addEventListener("mousemove", (t) => {
    Wt2 = t.clientY / document.body.clientHeight, Ft2 = t.clientX / document.body.clientWidth;
  });
  var nw = j2(() => Wt2);
  var sw = j2(() => Wt2);
  var rw = j2(() => Ft2);
  var ow = j2(() => Ft2);
  var Cf = (t) => (t |= 0, t ^= t >>> 16, t = Math.imul(t, 2246822507), t ^= t >>> 13, t = Math.imul(t, 3266489909), t ^= t >>> 16, t >>> 0);
  var xf = (t) => Math.floor(t * 536870912);
  var Bf = (t, e = 0, n = 0) => {
    const s2 = t >>> 0 >>> 0, r = Math.floor(t / 4294967296) >>> 0;
    let o = s2 ^ Math.imul(r ^ 2246822507, 3266489909);
    return o ^= Math.imul(e ^ 2135587861, 2654435769), o ^= Math.imul(n ^ 374761393, 668265261), o >>> 0;
  };
  var ne2 = (t, e = 0, n = 0) => Cf(Bf(t, e, n)) / 4294967296;
  var Of = (t, e, n = 0) => {
    const s2 = xf(t);
    if (e === 1)
      return ne2(s2, 0, n);
    const r = new Array(e);
    for (let o = 0; o < e; o++) r[o] = ne2(s2, o, n);
    return r;
  };
  var Ce2 = (t) => {
    const e = t << 13 ^ t, n = e >> 17 ^ e;
    return n << 5 ^ n;
  };
  var zf = (t) => t - Math.trunc(t);
  var Mf = (t) => Ce2(Math.trunc(zf(t / 300) * 536870912));
  var se = (t) => t % 536870912 / 536870912;
  var Pf = (t, e) => {
    if (e === 1)
      return Math.abs(se(t));
    const n = [];
    for (let s2 = 0; s2 < e; s2++)
      n.push(se(t)), t = Ce2(t);
    return n;
  };
  var Ef = (t, e) => Pf(Mf(t), e);
  var xe2 = "legacy";
  var K2 = (t, e = 1, n = 0) => xe2 === "legacy" ? Ef(t + n, e) : Of(t, e, n);
  var cw = (t = "legacy") => xe2 = t;
  var jf = (t) => qt2.range(0, t).round().segment(t);
  var iw = (t) => {
    const e = d(t).log2(0).floor().add(1);
    return Jf(t, e);
  };
  var Jf = (t, e = 16) => {
    e = d(e);
    const n = jf(e).mul(-1).add(e.sub(1));
    return d(t).segment(e).brshift(n).band(C2(1));
  };
  var uw = (t) => {
    const e = d(t).log2(0).floor().add(1);
    return $f(t, e);
  };
  var $f = (t, e = 16) => d(t).withValue((n) => (s2) => {
    const r = [];
    for (let o = s2 - 1; o >= 0; o--)
      r.push(n >> o & 1);
    return r;
  }).appLeft(d(e));
  var aw = (t) => j2((e) => (n) => K2(e, n).map(Math.abs)).appLeft(d(t));
  var Nf = (t) => j2((e, n) => {
    const r = K2(e.floor().add(0.5), t, n.randSeed).map((i, a2) => [i, a2]).sort((i, a2) => (i[0] > a2[0]) - (i[0] < a2[0])).map((i) => i[1]), o = e.cyclePos().mul(t).floor() % t;
    return r[o];
  })._segment(t);
  var Be2 = (t, e, n) => {
    const s2 = [...Array(e).keys()].map((r) => n.zoom(m(r).div(e), m(r + 1).div(e)));
    return t.fmap((r) => s2[r].repeatCycles(e)._fast(e)).innerJoin();
  };
  var lw = l("shuffle", (t, e) => Be2(Nf(t), t, e));
  var pw = l("scramble", (t, e) => Be2(ze2(t)._segment(t), t, e));
  var Lf = (t, e) => new f2((n) => {
    let { randSeed: s2, ...r } = n.controls;
    return s2 = t(s2), e.query(n.setControls({ ...r, randSeed: s2 }));
  }, e._steps);
  var fw = l("seed", (t, e) => Lf(() => t, e));
  var W2 = j2((t, e) => K2(t, 1, e.randSeed));
  var hw = W2.toBipolar();
  var Oe2 = (t) => W2.fmap((e) => e < t);
  var dw = (t) => d(t).fmap(Oe2).innerJoin();
  var mw = Oe2(0.5);
  var ze2 = (t) => W2.fmap((e) => Math.trunc(e * t));
  var yw = (t) => d(t).fmap(ze2).innerJoin();
  var Me2 = (t, e) => (e = e.map(d), e.length == 0 ? q2 : t.range(0, e.length).fmap((n) => {
    const s2 = Math.min(Math.max(Math.floor(n), 0), e.length - 1);
    return e[s2];
  }));
  var It2 = (t, e) => Me2(t, e).outerJoin();
  var Pe2 = (t, e) => Me2(t, e).innerJoin();
  var Rf = (...t) => It2(W2, t);
  var ww = (...t) => Pe2(W2, t);
  var gw = Rf;
  f2.prototype.choose = function(...t) {
    return It2(this, t);
  };
  f2.prototype.choose2 = function(...t) {
    return It2(this.fromBipolar(), t);
  };
  var Wf = (...t) => Pe2(W2.segment(1), t);
  var bw = Wf;
  var Ee2 = function(t, ...e) {
    const n = e.map((a2) => d(a2[0])), s2 = [];
    let r = C2(0);
    for (const a2 of e)
      r = r.add(a2[1]), s2.push(r);
    const o = En(s2), i = function(a2) {
      const u2 = r.mul(a2);
      return o.fmap((p) => (h) => n[p.findIndex((y2) => y2 > h, p)]).appLeft(u2);
    };
    return t.bind(i);
  };
  var Ff = (...t) => Ee2(...t).outerJoin();
  var _w = (...t) => Ff(W2, ...t);
  var If = (...t) => Ee2(W2.segment(1), ...t).innerJoin();
  var vw = If;
  function Vf(t, e = 0) {
    let n = Math.floor(t), s2 = n + 1;
    const r = (p) => 6 * p ** 5 - 15 * p ** 4 + 10 * p ** 3, o = (p) => (h) => (y2) => h + r(p) * (y2 - h), i = K2(n, 1, e), a2 = K2(s2, 1, e);
    return o(t - n)(i)(a2);
  }
  function Hf(t, e = 0) {
    const n = Math.floor(t), s2 = n + 1, r = K2(n, 1, e), o = K2(s2, 1, e), i = r + o, a2 = (t - n) / (s2 - n);
    return ((p, h, y2) => p + y2 * (h - p))(r, i, a2) / 2;
  }
  var kw = j2((t, e) => Vf(t, e.randSeed));
  var qw = j2((t, e) => Hf(t, e.randSeed));
  var Sw = l(
    "degradeByWith",
    (t, e, n) => n.fmap((s2) => (r) => s2).appLeft(t.filterValues((s2) => s2 > e)),
    true,
    true
  );
  var Aw = l(
    "degradeBy",
    function(t, e) {
      return e._degradeByWith(W2, t);
    },
    true,
    true
  );
  var Tw = l("degrade", (t) => t._degradeBy(0.5), true, true);
  var Cw = l(
    "undegradeBy",
    function(t, e) {
      return e._degradeByWith(
        W2.fmap((n) => 1 - n),
        t
      );
    },
    true,
    true
  );
  var xw = l("undegrade", (t) => t._undegradeBy(0.5), true, true);
  var Bw = l("sometimesBy", function(t, e, n) {
    return d(t).fmap((s2) => z(n._degradeBy(s2), e(n._undegradeBy(1 - s2)))).innerJoin();
  });
  var Ow = l("sometimes", function(t, e) {
    return e._sometimesBy(0.5, t);
  });
  var zw = l("someCyclesBy", function(t, e, n) {
    return d(t).fmap(
      (s2) => z(
        n._degradeByWith(W2._segment(1), s2),
        e(n._degradeByWith(W2.fmap((r) => 1 - r)._segment(1), 1 - s2))
      )
    ).innerJoin();
  });
  var Mw = l("someCycles", function(t, e) {
    return e._someCyclesBy(0.5, t);
  });
  var Pw = l("often", function(t, e) {
    return e.sometimesBy(0.75, t);
  });
  var Ew = l("rarely", function(t, e) {
    return e.sometimesBy(0.25, t);
  });
  var jw = l("almostNever", function(t, e) {
    return e.sometimesBy(0.1, t);
  });
  var Jw = l("almostAlways", function(t, e) {
    return e.sometimesBy(0.9, t);
  });
  var $w = l("never", function(t, e) {
    return e;
  });
  var Nw = l("always", function(t, e) {
    return t(e);
  });
  function je2(t) {
    Array.isArray(t) === false && (t = [t]);
    const e = qn();
    return t.every((n) => {
      const s2 = kn.get(n) ?? n;
      return e[s2];
    });
  }
  var Lw = l("whenKey", function(t, e, n) {
    return n.when(je2(t), e);
  });
  var Rw = l("keyDown", function(t) {
    return t.fmap(je2);
  });
  var Ww = new f2(function(t) {
    return [new S2(void 0, t.span, t.span.duration)];
  });
  var Df = new f2(function(t) {
    return [new S2(void 0, t.span, m(1).div(t.span.duration))];
  });
  var Fw = Df;
  var Iw = new f2(function(t) {
    const e = m(1).div(t.span.duration);
    return [new S2(void 0, t.span, Math.log(e) / Math.log(2) + 1)];
  });
  var wt2;
  try {
    wt2 = window?.speechSynthesis;
  } catch {
    console.warn("cannot use window: not in browser?");
  }
  var re2 = wt2?.getVoices();
  function Gf(t, e, n) {
    wt2.cancel();
    const s2 = new SpeechSynthesisUtterance(t);
    s2.lang = e, re2 = wt2.getVoices();
    const r = re2.filter((o) => o.lang.includes(e));
    typeof n == "number" ? s2.voice = r[n % r.length] : typeof n == "string" && (s2.voice = r.find((o) => o.name === o)), speechSynthesis.speak(s2);
  }
  var Vw = l("speak", function(t, e, n) {
    return n.onTrigger((s2) => {
      Gf(s2.value, t, e);
    });
  });
  var Hw = function(t, e = {}) {
    const n = document.getElementById("code"), s2 = "background-image:url(" + t + ");background-size:contain;";
    n.style = s2;
    const { className: r } = n, o = (u2, p) => {
      ({
        style: () => n.style = s2 + ";" + p,
        className: () => n.className = p + " " + r
      })[u2]();
    }, i = Object.entries(e).filter(([u2, p]) => typeof p == "function");
    Object.entries(e).filter(([u2, p]) => typeof p == "string").forEach(([u2, p]) => o(u2, p)), i.length;
  };
  var Dw = () => {
    const t = document.getElementById("code");
    t && (t.style = "");
  };
  E2("\u{1F300} @strudel/core loaded \u{1F300}");
  globalThis._strudelLoaded && console.warn(
    `@strudel/core was loaded more than once...
This might happen when you have multiple versions of strudel installed. 
Please check with "npm ls @strudel/core".`
  );
  globalThis._strudelLoaded = true;

  // node_modules/@strudel/mini/dist/index.mjs
  var dist_exports2 = {};
  __export(dist_exports2, {
    StartRules: () => Gr2,
    SyntaxError: () => uu2,
    getLeafLocation: () => ee3,
    getLeafLocations: () => Yr2,
    getLeaves: () => Xr2,
    h: () => Jr2,
    m: () => Hr2,
    mini: () => te3,
    mini2ast: () => Au2,
    miniAllStrings: () => Qr2,
    minify: () => Kr2,
    parse: () => Mr2,
    patternifyAST: () => nu2
  });
  function Or2(t, i) {
    function e() {
      this.constructor = t;
    }
    e.prototype = i.prototype, t.prototype = new e();
  }
  function uu2(t, i, e, f3) {
    var l2 = Error.call(this, t);
    return Object.setPrototypeOf && Object.setPrototypeOf(l2, uu2.prototype), l2.expected = i, l2.found = e, l2.location = f3, l2.name = "SyntaxError", l2;
  }
  Or2(uu2, Error);
  function Cu2(t, i, e) {
    return e = e || " ", t.length > i ? t : (i -= t.length, e += e.repeat(i), t + e.slice(0, i));
  }
  uu2.prototype.format = function(t) {
    var i = "Error: " + this.message;
    if (this.location) {
      var e = null, f3;
      for (f3 = 0; f3 < t.length; f3++)
        if (t[f3].source === this.location.source) {
          e = t[f3].text.split(/\r\n|\n|\r/g);
          break;
        }
      var l2 = this.location.start, a2 = this.location.source && typeof this.location.source.offset == "function" ? this.location.source.offset(l2) : l2, D3 = this.location.source + ":" + a2.line + ":" + a2.column;
      if (e) {
        var v = this.location.end, g2 = Cu2("", a2.line.toString().length, " "), c3 = e[l2.line - 1], F4 = l2.line === v.line ? v.column : c3.length + 1, p = F4 - l2.column || 1;
        i += `
 --> ` + D3 + `
` + g2 + ` |
` + a2.line + " | " + c3 + `
` + g2 + " | " + Cu2("", l2.column - 1, " ") + Cu2("", p, "^");
      } else
        i += `
 at ` + D3;
    }
    return i;
  };
  uu2.buildMessage = function(t, i) {
    var e = {
      literal: function(c3) {
        return '"' + l2(c3.text) + '"';
      },
      class: function(c3) {
        var F4 = c3.parts.map(function(p) {
          return Array.isArray(p) ? a2(p[0]) + "-" + a2(p[1]) : a2(p);
        });
        return "[" + (c3.inverted ? "^" : "") + F4.join("") + "]";
      },
      any: function() {
        return "any character";
      },
      end: function() {
        return "end of input";
      },
      other: function(c3) {
        return c3.description;
      }
    };
    function f3(c3) {
      return c3.charCodeAt(0).toString(16).toUpperCase();
    }
    function l2(c3) {
      return c3.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(F4) {
        return "\\x0" + f3(F4);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(F4) {
        return "\\x" + f3(F4);
      });
    }
    function a2(c3) {
      return c3.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(F4) {
        return "\\x0" + f3(F4);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(F4) {
        return "\\x" + f3(F4);
      });
    }
    function D3(c3) {
      return e[c3.type](c3);
    }
    function v(c3) {
      var F4 = c3.map(D3), p, w3;
      if (F4.sort(), F4.length > 0) {
        for (p = 1, w3 = 1; p < F4.length; p++)
          F4[p - 1] !== F4[p] && (F4[w3] = F4[p], w3++);
        F4.length = w3;
      }
      switch (F4.length) {
        case 1:
          return F4[0];
        case 2:
          return F4[0] + " or " + F4[1];
        default:
          return F4.slice(0, -1).join(", ") + ", or " + F4[F4.length - 1];
      }
    }
    function g2(c3) {
      return c3 ? '"' + l2(c3) + '"' : "end of input";
    }
    return "Expected " + v(t) + " but " + g2(i) + " found.";
  };
  function Mr2(t, i) {
    i = i !== void 0 ? i : {};
    var e = {}, f3 = i.grammarSource, l2 = { start: Uu2 }, a2 = Uu2, D3 = ".", v = "-", g2 = "0", c3 = ",", F4 = "|", p = "[", w3 = "]", P4 = "{", R3 = "}", su2 = "%", iu2 = "<", re4 = ">", ne4 = "!", se3 = "(", ie4 = ")", fe3 = "/", oe4 = "*", ae3 = "?", le3 = ":", Eu2 = "..", ce4 = "^", vu2 = "struct", $u2 = "target", mu2 = "euclid", _u2 = "slow", yu2 = "rotL", wu2 = "rotR", bu2 = "fast", xu2 = "scale", Iu2 = "//", ku2 = "cat", Ae3 = "$", Nu2 = "setcps", Pu2 = "setbpm", qu2 = "hush", pe4 = /^[1-9]/, ge3 = /^[eE]/, Fe2 = /^[+\-]/, he3 = /^[0-9]/, ju2 = /^[ \n\r\t\xA0]/, Be3 = /^["']/, Ce3 = /^[#\--.0-9A-Z\^-_a-z~\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376-\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E-\u066F\u0671-\u06D3\u06D5\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4-\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC-\u09DD\u09DF-\u09E1\u09F0-\u09F1\u09FC\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0-\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3D\u0B5C-\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60-\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0-\u0CE1\u0CF1-\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32-\u0E33\u0E40-\u0E46\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065-\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE-\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5-\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7B9\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD-\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5-\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/, De2 = /^[@_]/, Su2 = /^[^\n]/, de3 = pu2("number"), Ru2 = _3(".", false), Ee3 = O2([["1", "9"]], false, false), ve3 = O2(["e", "E"], false, false), $e2 = O2(["+", "-"], false, false), me3 = _3("-", false), _e3 = _3("0", false), ye3 = O2([["0", "9"]], false, false), we3 = pu2("whitespace"), Lu2 = O2([" ", `
`, "\r", "	", "\xA0"], false, false), be3 = _3(",", false), xe3 = _3("|", false), Ie2 = O2(['"', "'"], false, false), ke3 = pu2('a letter, a number, "-", "#", ".", "^", "_"'), Ne2 = O2(["#", ["-", "."], ["0", "9"], ["A", "Z"], ["^", "_"], ["a", "z"], "~", "\xAA", "\xB5", "\xBA", ["\xC0", "\xD6"], ["\xD8", "\xF6"], ["\xF8", "\u02C1"], ["\u02C6", "\u02D1"], ["\u02E0", "\u02E4"], "\u02EC", "\u02EE", ["\u0370", "\u0374"], ["\u0376", "\u0377"], ["\u037A", "\u037D"], "\u037F", "\u0386", ["\u0388", "\u038A"], "\u038C", ["\u038E", "\u03A1"], ["\u03A3", "\u03F5"], ["\u03F7", "\u0481"], ["\u048A", "\u052F"], ["\u0531", "\u0556"], "\u0559", ["\u0560", "\u0588"], ["\u05D0", "\u05EA"], ["\u05EF", "\u05F2"], ["\u0620", "\u064A"], ["\u066E", "\u066F"], ["\u0671", "\u06D3"], "\u06D5", ["\u06E5", "\u06E6"], ["\u06EE", "\u06EF"], ["\u06FA", "\u06FC"], "\u06FF", "\u0710", ["\u0712", "\u072F"], ["\u074D", "\u07A5"], "\u07B1", ["\u07CA", "\u07EA"], ["\u07F4", "\u07F5"], "\u07FA", ["\u0800", "\u0815"], "\u081A", "\u0824", "\u0828", ["\u0840", "\u0858"], ["\u0860", "\u086A"], ["\u08A0", "\u08B4"], ["\u08B6", "\u08BD"], ["\u0904", "\u0939"], "\u093D", "\u0950", ["\u0958", "\u0961"], ["\u0971", "\u0980"], ["\u0985", "\u098C"], ["\u098F", "\u0990"], ["\u0993", "\u09A8"], ["\u09AA", "\u09B0"], "\u09B2", ["\u09B6", "\u09B9"], "\u09BD", "\u09CE", ["\u09DC", "\u09DD"], ["\u09DF", "\u09E1"], ["\u09F0", "\u09F1"], "\u09FC", ["\u0A05", "\u0A0A"], ["\u0A0F", "\u0A10"], ["\u0A13", "\u0A28"], ["\u0A2A", "\u0A30"], ["\u0A32", "\u0A33"], ["\u0A35", "\u0A36"], ["\u0A38", "\u0A39"], ["\u0A59", "\u0A5C"], "\u0A5E", ["\u0A72", "\u0A74"], ["\u0A85", "\u0A8D"], ["\u0A8F", "\u0A91"], ["\u0A93", "\u0AA8"], ["\u0AAA", "\u0AB0"], ["\u0AB2", "\u0AB3"], ["\u0AB5", "\u0AB9"], "\u0ABD", "\u0AD0", ["\u0AE0", "\u0AE1"], "\u0AF9", ["\u0B05", "\u0B0C"], ["\u0B0F", "\u0B10"], ["\u0B13", "\u0B28"], ["\u0B2A", "\u0B30"], ["\u0B32", "\u0B33"], ["\u0B35", "\u0B39"], "\u0B3D", ["\u0B5C", "\u0B5D"], ["\u0B5F", "\u0B61"], "\u0B71", "\u0B83", ["\u0B85", "\u0B8A"], ["\u0B8E", "\u0B90"], ["\u0B92", "\u0B95"], ["\u0B99", "\u0B9A"], "\u0B9C", ["\u0B9E", "\u0B9F"], ["\u0BA3", "\u0BA4"], ["\u0BA8", "\u0BAA"], ["\u0BAE", "\u0BB9"], "\u0BD0", ["\u0C05", "\u0C0C"], ["\u0C0E", "\u0C10"], ["\u0C12", "\u0C28"], ["\u0C2A", "\u0C39"], "\u0C3D", ["\u0C58", "\u0C5A"], ["\u0C60", "\u0C61"], "\u0C80", ["\u0C85", "\u0C8C"], ["\u0C8E", "\u0C90"], ["\u0C92", "\u0CA8"], ["\u0CAA", "\u0CB3"], ["\u0CB5", "\u0CB9"], "\u0CBD", "\u0CDE", ["\u0CE0", "\u0CE1"], ["\u0CF1", "\u0CF2"], ["\u0D05", "\u0D0C"], ["\u0D0E", "\u0D10"], ["\u0D12", "\u0D3A"], "\u0D3D", "\u0D4E", ["\u0D54", "\u0D56"], ["\u0D5F", "\u0D61"], ["\u0D7A", "\u0D7F"], ["\u0D85", "\u0D96"], ["\u0D9A", "\u0DB1"], ["\u0DB3", "\u0DBB"], "\u0DBD", ["\u0DC0", "\u0DC6"], ["\u0E01", "\u0E30"], ["\u0E32", "\u0E33"], ["\u0E40", "\u0E46"], ["\u0E81", "\u0E82"], "\u0E84", ["\u0E87", "\u0E88"], "\u0E8A", "\u0E8D", ["\u0E94", "\u0E97"], ["\u0E99", "\u0E9F"], ["\u0EA1", "\u0EA3"], "\u0EA5", "\u0EA7", ["\u0EAA", "\u0EAB"], ["\u0EAD", "\u0EB0"], ["\u0EB2", "\u0EB3"], "\u0EBD", ["\u0EC0", "\u0EC4"], "\u0EC6", ["\u0EDC", "\u0EDF"], "\u0F00", ["\u0F40", "\u0F47"], ["\u0F49", "\u0F6C"], ["\u0F88", "\u0F8C"], ["\u1000", "\u102A"], "\u103F", ["\u1050", "\u1055"], ["\u105A", "\u105D"], "\u1061", ["\u1065", "\u1066"], ["\u106E", "\u1070"], ["\u1075", "\u1081"], "\u108E", ["\u10A0", "\u10C5"], "\u10C7", "\u10CD", ["\u10D0", "\u10FA"], ["\u10FC", "\u1248"], ["\u124A", "\u124D"], ["\u1250", "\u1256"], "\u1258", ["\u125A", "\u125D"], ["\u1260", "\u1288"], ["\u128A", "\u128D"], ["\u1290", "\u12B0"], ["\u12B2", "\u12B5"], ["\u12B8", "\u12BE"], "\u12C0", ["\u12C2", "\u12C5"], ["\u12C8", "\u12D6"], ["\u12D8", "\u1310"], ["\u1312", "\u1315"], ["\u1318", "\u135A"], ["\u1380", "\u138F"], ["\u13A0", "\u13F5"], ["\u13F8", "\u13FD"], ["\u1401", "\u166C"], ["\u166F", "\u167F"], ["\u1681", "\u169A"], ["\u16A0", "\u16EA"], ["\u16EE", "\u16F8"], ["\u1700", "\u170C"], ["\u170E", "\u1711"], ["\u1720", "\u1731"], ["\u1740", "\u1751"], ["\u1760", "\u176C"], ["\u176E", "\u1770"], ["\u1780", "\u17B3"], "\u17D7", "\u17DC", ["\u1820", "\u1878"], ["\u1880", "\u1884"], ["\u1887", "\u18A8"], "\u18AA", ["\u18B0", "\u18F5"], ["\u1900", "\u191E"], ["\u1950", "\u196D"], ["\u1970", "\u1974"], ["\u1980", "\u19AB"], ["\u19B0", "\u19C9"], ["\u1A00", "\u1A16"], ["\u1A20", "\u1A54"], "\u1AA7", ["\u1B05", "\u1B33"], ["\u1B45", "\u1B4B"], ["\u1B83", "\u1BA0"], ["\u1BAE", "\u1BAF"], ["\u1BBA", "\u1BE5"], ["\u1C00", "\u1C23"], ["\u1C4D", "\u1C4F"], ["\u1C5A", "\u1C7D"], ["\u1C80", "\u1C88"], ["\u1C90", "\u1CBA"], ["\u1CBD", "\u1CBF"], ["\u1CE9", "\u1CEC"], ["\u1CEE", "\u1CF1"], ["\u1CF5", "\u1CF6"], ["\u1D00", "\u1DBF"], ["\u1E00", "\u1F15"], ["\u1F18", "\u1F1D"], ["\u1F20", "\u1F45"], ["\u1F48", "\u1F4D"], ["\u1F50", "\u1F57"], "\u1F59", "\u1F5B", "\u1F5D", ["\u1F5F", "\u1F7D"], ["\u1F80", "\u1FB4"], ["\u1FB6", "\u1FBC"], "\u1FBE", ["\u1FC2", "\u1FC4"], ["\u1FC6", "\u1FCC"], ["\u1FD0", "\u1FD3"], ["\u1FD6", "\u1FDB"], ["\u1FE0", "\u1FEC"], ["\u1FF2", "\u1FF4"], ["\u1FF6", "\u1FFC"], "\u2071", "\u207F", ["\u2090", "\u209C"], "\u2102", "\u2107", ["\u210A", "\u2113"], "\u2115", ["\u2119", "\u211D"], "\u2124", "\u2126", "\u2128", ["\u212A", "\u212D"], ["\u212F", "\u2139"], ["\u213C", "\u213F"], ["\u2145", "\u2149"], "\u214E", ["\u2160", "\u2188"], ["\u2C00", "\u2C2E"], ["\u2C30", "\u2C5E"], ["\u2C60", "\u2CE4"], ["\u2CEB", "\u2CEE"], ["\u2CF2", "\u2CF3"], ["\u2D00", "\u2D25"], "\u2D27", "\u2D2D", ["\u2D30", "\u2D67"], "\u2D6F", ["\u2D80", "\u2D96"], ["\u2DA0", "\u2DA6"], ["\u2DA8", "\u2DAE"], ["\u2DB0", "\u2DB6"], ["\u2DB8", "\u2DBE"], ["\u2DC0", "\u2DC6"], ["\u2DC8", "\u2DCE"], ["\u2DD0", "\u2DD6"], ["\u2DD8", "\u2DDE"], "\u2E2F", ["\u3005", "\u3007"], ["\u3021", "\u3029"], ["\u3031", "\u3035"], ["\u3038", "\u303C"], ["\u3041", "\u3096"], ["\u309D", "\u309F"], ["\u30A1", "\u30FA"], ["\u30FC", "\u30FF"], ["\u3105", "\u312F"], ["\u3131", "\u318E"], ["\u31A0", "\u31BA"], ["\u31F0", "\u31FF"], ["\u3400", "\u4DB5"], ["\u4E00", "\u9FEF"], ["\uA000", "\uA48C"], ["\uA4D0", "\uA4FD"], ["\uA500", "\uA60C"], ["\uA610", "\uA61F"], ["\uA62A", "\uA62B"], ["\uA640", "\uA66E"], ["\uA67F", "\uA69D"], ["\uA6A0", "\uA6EF"], ["\uA717", "\uA71F"], ["\uA722", "\uA788"], ["\uA78B", "\uA7B9"], ["\uA7F7", "\uA801"], ["\uA803", "\uA805"], ["\uA807", "\uA80A"], ["\uA80C", "\uA822"], ["\uA840", "\uA873"], ["\uA882", "\uA8B3"], ["\uA8F2", "\uA8F7"], "\uA8FB", ["\uA8FD", "\uA8FE"], ["\uA90A", "\uA925"], ["\uA930", "\uA946"], ["\uA960", "\uA97C"], ["\uA984", "\uA9B2"], "\uA9CF", ["\uA9E0", "\uA9E4"], ["\uA9E6", "\uA9EF"], ["\uA9FA", "\uA9FE"], ["\uAA00", "\uAA28"], ["\uAA40", "\uAA42"], ["\uAA44", "\uAA4B"], ["\uAA60", "\uAA76"], "\uAA7A", ["\uAA7E", "\uAAAF"], "\uAAB1", ["\uAAB5", "\uAAB6"], ["\uAAB9", "\uAABD"], "\uAAC0", "\uAAC2", ["\uAADB", "\uAADD"], ["\uAAE0", "\uAAEA"], ["\uAAF2", "\uAAF4"], ["\uAB01", "\uAB06"], ["\uAB09", "\uAB0E"], ["\uAB11", "\uAB16"], ["\uAB20", "\uAB26"], ["\uAB28", "\uAB2E"], ["\uAB30", "\uAB5A"], ["\uAB5C", "\uAB65"], ["\uAB70", "\uABE2"], ["\uAC00", "\uD7A3"], ["\uD7B0", "\uD7C6"], ["\uD7CB", "\uD7FB"], ["\uF900", "\uFA6D"], ["\uFA70", "\uFAD9"], ["\uFB00", "\uFB06"], ["\uFB13", "\uFB17"], "\uFB1D", ["\uFB1F", "\uFB28"], ["\uFB2A", "\uFB36"], ["\uFB38", "\uFB3C"], "\uFB3E", ["\uFB40", "\uFB41"], ["\uFB43", "\uFB44"], ["\uFB46", "\uFBB1"], ["\uFBD3", "\uFD3D"], ["\uFD50", "\uFD8F"], ["\uFD92", "\uFDC7"], ["\uFDF0", "\uFDFB"], ["\uFE70", "\uFE74"], ["\uFE76", "\uFEFC"], ["\uFF21", "\uFF3A"], ["\uFF41", "\uFF5A"], ["\uFF66", "\uFFBE"], ["\uFFC2", "\uFFC7"], ["\uFFCA", "\uFFCF"], ["\uFFD2", "\uFFD7"], ["\uFFDA", "\uFFDC"]], false, false), Ou2 = _3("[", false), Mu2 = _3("]", false), Pe3 = _3("{", false), qe3 = _3("}", false), je3 = _3("%", false), Se3 = _3("<", false), Re2 = _3(">", false), Le2 = O2(["@", "_"], false, false), Oe3 = _3("!", false), Me3 = _3("(", false), ze3 = _3(")", false), Te3 = _3("/", false), Ze3 = _3("*", false), We2 = _3("?", false), Ue3 = _3(":", false), Ve2 = _3("..", false), Xe3 = _3("^", false), Ge2 = _3("struct", false), Ye3 = _3("target", false), He2 = _3("euclid", false), Je2 = _3("slow", false), Ke3 = _3("rotL", false), Qe3 = _3("rotR", false), ut3 = _3("fast", false), et3 = _3("scale", false), tt2 = _3("//", false), zu2 = O2([`
`], true, false), rt3 = _3("cat", false), nt2 = _3("$", false), st2 = _3("setcps", false), it3 = _3("setbpm", false), ft2 = _3("hush", false), ot3 = function() {
      return parseFloat(Xt3());
    }, at4 = function(u2) {
      const r = u2.join("");
      return r === "." || r === "_";
    }, lt3 = function(u2) {
      return new Sr2(u2.join(""));
    }, ct3 = function(u2) {
      return u2;
    }, At2 = function(u2, r) {
      return u2.arguments_.stepsPerCycle = r, u2;
    }, pt3 = function(u2) {
      return u2;
    }, gt3 = function(u2) {
      return u2.arguments_.alignment = "polymeter_slowcat", u2;
    }, Ft3 = function(u2) {
      return (r) => r.options_.weight = (r.options_.weight ?? 1) + (u2 ?? 2) - 1;
    }, ht2 = function(u2) {
      return (r) => {
        const s2 = (r.options_.reps ?? 1) + (u2 ?? 2) - 1;
        r.options_.reps = s2, r.options_.ops = r.options_.ops.filter((o) => o.type_ !== "replicate"), r.options_.ops.push({ type_: "replicate", arguments_: { amount: s2 } }), r.options_.weight = s2;
      };
    }, Bt3 = function(u2, r, s2) {
      return (o) => o.options_.ops.push({ type_: "bjorklund", arguments_: { pulse: u2, step: r, rotation: s2 } });
    }, Ct3 = function(u2) {
      return (r) => r.options_.ops.push({ type_: "stretch", arguments_: { amount: u2, type: "slow" } });
    }, Dt2 = function(u2) {
      return (r) => r.options_.ops.push({ type_: "stretch", arguments_: { amount: u2, type: "fast" } });
    }, dt3 = function(u2) {
      return (r) => r.options_.ops.push({ type_: "degradeBy", arguments_: { amount: u2, seed: Bu2++ } });
    }, Et3 = function(u2) {
      return (r) => r.options_.ops.push({ type_: "tail", arguments_: { element: u2 } });
    }, vt3 = function(u2) {
      return (r) => r.options_.ops.push({ type_: "range", arguments_: { element: u2 } });
    }, $t3 = function(u2, r) {
      const s2 = new Lr2(u2, { ops: [], weight: 1, reps: 1 });
      for (const o of r)
        o(s2);
      return s2;
    }, mt3 = function(u2, r) {
      return new lu2(r, "fastcat", void 0, !!u2);
    }, _t3 = function(u2) {
      return { alignment: "stack", list: u2 };
    }, yt3 = function(u2) {
      return { alignment: "rand", list: u2, seed: Bu2++ };
    }, wt3 = function(u2) {
      return { alignment: "feet", list: u2, seed: Bu2++ };
    }, bt3 = function(u2, r) {
      return r && r.list.length > 0 ? new lu2([u2, ...r.list], r.alignment, r.seed) : u2;
    }, xt3 = function(u2, r) {
      return new lu2(r ? [u2, ...r.list] : [u2], "polymeter");
    }, It3 = function(u2) {
      return u2;
    }, kt3 = function(u2) {
      return { name: "struct", args: { mini: u2 } };
    }, Nt3 = function(u2) {
      return { name: "target", args: { name: u2 } };
    }, Pt3 = function(u2, r, s2) {
      return { name: "bjorklund", args: { pulse: u2, step: parseInt(r) } };
    }, qt3 = function(u2) {
      return { name: "stretch", args: { amount: u2 } };
    }, jt3 = function(u2) {
      return { name: "shift", args: { amount: "-" + u2 } };
    }, St2 = function(u2) {
      return { name: "shift", args: { amount: u2 } };
    }, Rt3 = function(u2) {
      return { name: "stretch", args: { amount: "1/" + u2 } };
    }, Lt3 = function(u2) {
      return { name: "scale", args: { scale: u2.join("") } };
    }, Tu2 = function(u2, r) {
      return r;
    }, Ot3 = function(u2, r) {
      return r.unshift(u2), new lu2(r, "slowcat");
    }, Mt3 = function(u2) {
      return u2;
    }, zt3 = function(u2, r) {
      return new Rr2(u2.name, u2.args, r);
    }, Tt2 = function(u2) {
      return u2;
    }, Zt3 = function(u2) {
      return u2;
    }, Wt3 = function(u2) {
      return new hu2("setcps", { value: u2 });
    }, Ut3 = function(u2) {
      return new hu2("setcps", { value: u2 / 120 / 2 });
    }, Vt2 = function() {
      return new hu2("hush");
    }, n = i.peg$currPos | 0, $3 = n, V4 = [{ line: 1, column: 1 }], q4 = n, fu2 = i.peg$maxFailExpected || [], h = i.peg$silentFails | 0, eu2;
    if (i.startRule) {
      if (!(i.startRule in l2))
        throw new Error(`Can't start parsing from rule "` + i.startRule + '".');
      a2 = l2[i.startRule];
    }
    function Xt3() {
      return t.substring($3, n);
    }
    function Zu2() {
      return gu2($3, n);
    }
    function _3(u2, r) {
      return { type: "literal", text: u2, ignoreCase: r };
    }
    function O2(u2, r, s2) {
      return { type: "class", parts: u2, inverted: r, ignoreCase: s2 };
    }
    function Gt2() {
      return { type: "end" };
    }
    function pu2(u2) {
      return { type: "other", description: u2 };
    }
    function Wu2(u2) {
      var r = V4[u2], s2;
      if (r)
        return r;
      if (u2 >= V4.length)
        s2 = V4.length - 1;
      else
        for (s2 = u2; !V4[--s2]; )
          ;
      for (r = V4[s2], r = {
        line: r.line,
        column: r.column
      }; s2 < u2; )
        t.charCodeAt(s2) === 10 ? (r.line++, r.column = 1) : r.column++, s2++;
      return V4[u2] = r, r;
    }
    function gu2(u2, r, s2) {
      var o = Wu2(u2), B4 = Wu2(r), x2 = {
        source: f3,
        start: {
          offset: u2,
          line: o.line,
          column: o.column
        },
        end: {
          offset: r,
          line: B4.line,
          column: B4.column
        }
      };
      return x2;
    }
    function d2(u2) {
      n < q4 || (n > q4 && (q4 = n, fu2 = []), fu2.push(u2));
    }
    function Yt3(u2, r, s2) {
      return new uu2(
        uu2.buildMessage(u2, r),
        u2,
        r,
        s2
      );
    }
    function Uu2() {
      var u2;
      return u2 = jr2(), u2;
    }
    function M2() {
      var u2, r;
      return h++, u2 = n, er2(), r = ou2(), r !== e ? (ur2(), Qt2(), $3 = u2, u2 = ot3()) : (n = u2, u2 = e), h--, u2 === e && h === 0 && d2(de3), u2;
    }
    function Ht2() {
      var u2;
      return t.charCodeAt(n) === 46 ? (u2 = D3, n++) : (u2 = e, h === 0 && d2(Ru2)), u2;
    }
    function Jt3() {
      var u2;
      return u2 = t.charAt(n), pe4.test(u2) ? n++ : (u2 = e, h === 0 && d2(Ee3)), u2;
    }
    function Kt3() {
      var u2;
      return u2 = t.charAt(n), ge3.test(u2) ? n++ : (u2 = e, h === 0 && d2(ve3)), u2;
    }
    function Qt2() {
      var u2, r, s2, o, B4;
      if (u2 = n, r = Kt3(), r !== e) {
        if (s2 = t.charAt(n), Fe2.test(s2) ? n++ : (s2 = e, h === 0 && d2($e2)), s2 === e && (s2 = null), o = [], B4 = X2(), B4 !== e)
          for (; B4 !== e; )
            o.push(B4), B4 = X2();
        else
          o = e;
        o !== e ? (r = [r, s2, o], u2 = r) : (n = u2, u2 = e);
      } else
        n = u2, u2 = e;
      return u2;
    }
    function ur2() {
      var u2, r, s2, o;
      if (u2 = n, r = Ht2(), r !== e) {
        if (s2 = [], o = X2(), o !== e)
          for (; o !== e; )
            s2.push(o), o = X2();
        else
          s2 = e;
        s2 !== e ? (r = [r, s2], u2 = r) : (n = u2, u2 = e);
      } else
        n = u2, u2 = e;
      return u2;
    }
    function ou2() {
      var u2, r, s2, o;
      if (u2 = tr2(), u2 === e)
        if (u2 = n, r = Jt3(), r !== e) {
          for (s2 = [], o = X2(); o !== e; )
            s2.push(o), o = X2();
          r = [r, s2], u2 = r;
        } else
          n = u2, u2 = e;
      return u2;
    }
    function er2() {
      var u2;
      return t.charCodeAt(n) === 45 ? (u2 = v, n++) : (u2 = e, h === 0 && d2(me3)), u2;
    }
    function tr2() {
      var u2;
      return t.charCodeAt(n) === 48 ? (u2 = g2, n++) : (u2 = e, h === 0 && d2(_e3)), u2;
    }
    function X2() {
      var u2;
      return u2 = t.charAt(n), he3.test(u2) ? n++ : (u2 = e, h === 0 && d2(ye3)), u2;
    }
    function E4() {
      var u2, r;
      for (h++, u2 = [], r = t.charAt(n), ju2.test(r) ? n++ : (r = e, h === 0 && d2(Lu2)); r !== e; )
        u2.push(r), r = t.charAt(n), ju2.test(r) ? n++ : (r = e, h === 0 && d2(Lu2));
      return h--, r = e, h === 0 && d2(we3), u2;
    }
    function G3() {
      var u2, r, s2, o;
      return u2 = n, r = E4(), t.charCodeAt(n) === 44 ? (s2 = c3, n++) : (s2 = e, h === 0 && d2(be3)), s2 !== e ? (o = E4(), r = [r, s2, o], u2 = r) : (n = u2, u2 = e), u2;
    }
    function Vu2() {
      var u2, r, s2, o;
      return u2 = n, r = E4(), t.charCodeAt(n) === 124 ? (s2 = F4, n++) : (s2 = e, h === 0 && d2(xe3)), s2 !== e ? (o = E4(), r = [r, s2, o], u2 = r) : (n = u2, u2 = e), u2;
    }
    function Xu2() {
      var u2, r, s2, o;
      return u2 = n, r = E4(), t.charCodeAt(n) === 46 ? (s2 = D3, n++) : (s2 = e, h === 0 && d2(Ru2)), s2 !== e ? (o = E4(), r = [r, s2, o], u2 = r) : (n = u2, u2 = e), u2;
    }
    function Y4() {
      var u2;
      return u2 = t.charAt(n), Be3.test(u2) ? n++ : (u2 = e, h === 0 && d2(Ie2)), u2;
    }
    function au2() {
      var u2;
      return h++, u2 = t.charAt(n), Ce3.test(u2) ? n++ : (u2 = e, h === 0 && d2(Ne2)), h--, u2 === e && h === 0 && d2(ke3), u2;
    }
    function Gu2() {
      var u2, r, s2, o;
      if (u2 = n, E4(), r = [], s2 = au2(), s2 !== e)
        for (; s2 !== e; )
          r.push(s2), s2 = au2();
      else
        r = e;
      return r !== e ? (s2 = E4(), $3 = n, o = at4(r), o ? o = e : o = void 0, o !== e ? ($3 = u2, u2 = lt3(r)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function rr2() {
      var u2, r, s2, o;
      return u2 = n, E4(), t.charCodeAt(n) === 91 ? (r = p, n++) : (r = e, h === 0 && d2(Ou2)), r !== e ? (E4(), s2 = Ju2(), s2 !== e ? (E4(), t.charCodeAt(n) === 93 ? (o = w3, n++) : (o = e, h === 0 && d2(Mu2)), o !== e ? (E4(), $3 = u2, u2 = ct3(s2)) : (n = u2, u2 = e)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function nr2() {
      var u2, r, s2, o, B4;
      return u2 = n, E4(), t.charCodeAt(n) === 123 ? (r = P4, n++) : (r = e, h === 0 && d2(Pe3)), r !== e ? (E4(), s2 = Ku2(), s2 !== e ? (E4(), t.charCodeAt(n) === 125 ? (o = R3, n++) : (o = e, h === 0 && d2(qe3)), o !== e ? (B4 = sr2(), B4 === e && (B4 = null), E4(), $3 = u2, u2 = At2(s2, B4)) : (n = u2, u2 = e)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function sr2() {
      var u2, r, s2;
      return u2 = n, t.charCodeAt(n) === 37 ? (r = su2, n++) : (r = e, h === 0 && d2(je3)), r !== e ? (s2 = H3(), s2 !== e ? ($3 = u2, u2 = pt3(s2)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function ir2() {
      var u2, r, s2, o;
      return u2 = n, E4(), t.charCodeAt(n) === 60 ? (r = iu2, n++) : (r = e, h === 0 && d2(Se3)), r !== e ? (E4(), s2 = Ku2(), s2 !== e ? (E4(), t.charCodeAt(n) === 62 ? (o = re4, n++) : (o = e, h === 0 && d2(Re2)), o !== e ? (E4(), $3 = u2, u2 = gt3(s2)) : (n = u2, u2 = e)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function H3() {
      var u2;
      return u2 = Gu2(), u2 === e && (u2 = rr2(), u2 === e && (u2 = nr2(), u2 === e && (u2 = ir2()))), u2;
    }
    function Yu2() {
      var u2;
      return u2 = fr2(), u2 === e && (u2 = ar2(), u2 === e && (u2 = lr2(), u2 === e && (u2 = cr2(), u2 === e && (u2 = or2(), u2 === e && (u2 = Ar2(), u2 === e && (u2 = pr2(), u2 === e && (u2 = gr2()))))))), u2;
    }
    function fr2() {
      var u2, r, s2;
      return u2 = n, E4(), r = t.charAt(n), De2.test(r) ? n++ : (r = e, h === 0 && d2(Le2)), r !== e ? (s2 = M2(), s2 === e && (s2 = null), $3 = u2, u2 = Ft3(s2)) : (n = u2, u2 = e), u2;
    }
    function or2() {
      var u2, r, s2;
      return u2 = n, E4(), t.charCodeAt(n) === 33 ? (r = ne4, n++) : (r = e, h === 0 && d2(Oe3)), r !== e ? (s2 = M2(), s2 === e && (s2 = null), $3 = u2, u2 = ht2(s2)) : (n = u2, u2 = e), u2;
    }
    function ar2() {
      var u2, r, s2, o, B4, x2, j4;
      return u2 = n, t.charCodeAt(n) === 40 ? (r = se3, n++) : (r = e, h === 0 && d2(Me3)), r !== e ? (E4(), s2 = tu2(), s2 !== e ? (E4(), o = G3(), o !== e ? (E4(), B4 = tu2(), B4 !== e ? (E4(), G3(), E4(), x2 = tu2(), x2 === e && (x2 = null), E4(), t.charCodeAt(n) === 41 ? (j4 = ie4, n++) : (j4 = e, h === 0 && d2(ze3)), j4 !== e ? ($3 = u2, u2 = Bt3(s2, B4, x2)) : (n = u2, u2 = e)) : (n = u2, u2 = e)) : (n = u2, u2 = e)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function lr2() {
      var u2, r, s2;
      return u2 = n, t.charCodeAt(n) === 47 ? (r = fe3, n++) : (r = e, h === 0 && d2(Te3)), r !== e ? (s2 = H3(), s2 !== e ? ($3 = u2, u2 = Ct3(s2)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function cr2() {
      var u2, r, s2;
      return u2 = n, t.charCodeAt(n) === 42 ? (r = oe4, n++) : (r = e, h === 0 && d2(Ze3)), r !== e ? (s2 = H3(), s2 !== e ? ($3 = u2, u2 = Dt2(s2)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function Ar2() {
      var u2, r, s2;
      return u2 = n, t.charCodeAt(n) === 63 ? (r = ae3, n++) : (r = e, h === 0 && d2(We2)), r !== e ? (s2 = M2(), s2 === e && (s2 = null), $3 = u2, u2 = dt3(s2)) : (n = u2, u2 = e), u2;
    }
    function pr2() {
      var u2, r, s2;
      return u2 = n, t.charCodeAt(n) === 58 ? (r = le3, n++) : (r = e, h === 0 && d2(Ue3)), r !== e ? (s2 = H3(), s2 !== e ? ($3 = u2, u2 = Et3(s2)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function gr2() {
      var u2, r, s2;
      return u2 = n, t.substr(n, 2) === Eu2 ? (r = Eu2, n += 2) : (r = e, h === 0 && d2(Ve2)), r !== e ? (s2 = H3(), s2 !== e ? ($3 = u2, u2 = vt3(s2)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function tu2() {
      var u2, r, s2, o;
      if (u2 = n, r = H3(), r !== e) {
        for (s2 = [], o = Yu2(); o !== e; )
          s2.push(o), o = Yu2();
        $3 = u2, u2 = $t3(r, s2);
      } else
        n = u2, u2 = e;
      return u2;
    }
    function T3() {
      var u2, r, s2, o;
      if (u2 = n, t.charCodeAt(n) === 94 ? (r = ce4, n++) : (r = e, h === 0 && d2(Xe3)), r === e && (r = null), s2 = [], o = tu2(), o !== e)
        for (; o !== e; )
          s2.push(o), o = tu2();
      else
        s2 = e;
      return s2 !== e ? ($3 = u2, u2 = mt3(r, s2)) : (n = u2, u2 = e), u2;
    }
    function Hu2() {
      var u2, r, s2, o, B4;
      if (u2 = n, r = [], s2 = n, o = G3(), o !== e ? (B4 = T3(), B4 !== e ? s2 = B4 : (n = s2, s2 = e)) : (n = s2, s2 = e), s2 !== e)
        for (; s2 !== e; )
          r.push(s2), s2 = n, o = G3(), o !== e ? (B4 = T3(), B4 !== e ? s2 = B4 : (n = s2, s2 = e)) : (n = s2, s2 = e);
      else
        r = e;
      return r !== e && ($3 = u2, r = _t3(r)), u2 = r, u2;
    }
    function Fr2() {
      var u2, r, s2, o, B4;
      if (u2 = n, r = [], s2 = n, o = Vu2(), o !== e ? (B4 = T3(), B4 !== e ? s2 = B4 : (n = s2, s2 = e)) : (n = s2, s2 = e), s2 !== e)
        for (; s2 !== e; )
          r.push(s2), s2 = n, o = Vu2(), o !== e ? (B4 = T3(), B4 !== e ? s2 = B4 : (n = s2, s2 = e)) : (n = s2, s2 = e);
      else
        r = e;
      return r !== e && ($3 = u2, r = yt3(r)), u2 = r, u2;
    }
    function hr2() {
      var u2, r, s2, o, B4;
      if (u2 = n, r = [], s2 = n, o = Xu2(), o !== e ? (B4 = T3(), B4 !== e ? s2 = B4 : (n = s2, s2 = e)) : (n = s2, s2 = e), s2 !== e)
        for (; s2 !== e; )
          r.push(s2), s2 = n, o = Xu2(), o !== e ? (B4 = T3(), B4 !== e ? s2 = B4 : (n = s2, s2 = e)) : (n = s2, s2 = e);
      else
        r = e;
      return r !== e && ($3 = u2, r = wt3(r)), u2 = r, u2;
    }
    function Ju2() {
      var u2, r, s2;
      return u2 = n, r = T3(), r !== e ? (s2 = Hu2(), s2 === e && (s2 = Fr2(), s2 === e && (s2 = hr2())), s2 === e && (s2 = null), $3 = u2, u2 = bt3(r, s2)) : (n = u2, u2 = e), u2;
    }
    function Ku2() {
      var u2, r, s2;
      return u2 = n, r = T3(), r !== e ? (s2 = Hu2(), s2 === e && (s2 = null), $3 = u2, u2 = xt3(r, s2)) : (n = u2, u2 = e), u2;
    }
    function Br2() {
      var u2, r, s2, o;
      return u2 = n, E4(), r = Y4(), r !== e ? (E4(), s2 = Ju2(), s2 !== e ? (E4(), o = Y4(), o !== e ? ($3 = u2, u2 = It3(s2)) : (n = u2, u2 = e)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function Cr2() {
      var u2;
      return u2 = yr2(), u2 === e && (u2 = vr2(), u2 === e && (u2 = _r2(), u2 === e && (u2 = dr2(), u2 === e && (u2 = Er2(), u2 === e && (u2 = Dr2(), u2 === e && (u2 = mr2(), u2 === e && (u2 = $r2()))))))), u2;
    }
    function Dr2() {
      var u2, r, s2;
      return u2 = n, t.substr(n, 6) === vu2 ? (r = vu2, n += 6) : (r = e, h === 0 && d2(Ge2)), r !== e ? (E4(), s2 = J4(), s2 !== e ? ($3 = u2, u2 = kt3(s2)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function dr2() {
      var u2, r, s2, o, B4;
      return u2 = n, t.substr(n, 6) === $u2 ? (r = $u2, n += 6) : (r = e, h === 0 && d2(Ye3)), r !== e ? (E4(), s2 = Y4(), s2 !== e ? (o = Gu2(), o !== e ? (B4 = Y4(), B4 !== e ? ($3 = u2, u2 = Nt3(o)) : (n = u2, u2 = e)) : (n = u2, u2 = e)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function Er2() {
      var u2, r, s2, o;
      return u2 = n, t.substr(n, 6) === mu2 ? (r = mu2, n += 6) : (r = e, h === 0 && d2(He2)), r !== e ? (E4(), s2 = ou2(), s2 !== e ? (E4(), o = ou2(), o !== e ? (E4(), ou2(), $3 = u2, u2 = Pt3(s2, o)) : (n = u2, u2 = e)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function vr2() {
      var u2, r, s2;
      return u2 = n, t.substr(n, 4) === _u2 ? (r = _u2, n += 4) : (r = e, h === 0 && d2(Je2)), r !== e ? (E4(), s2 = M2(), s2 !== e ? ($3 = u2, u2 = qt3(s2)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function $r2() {
      var u2, r, s2;
      return u2 = n, t.substr(n, 4) === yu2 ? (r = yu2, n += 4) : (r = e, h === 0 && d2(Ke3)), r !== e ? (E4(), s2 = M2(), s2 !== e ? ($3 = u2, u2 = jt3(s2)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function mr2() {
      var u2, r, s2;
      return u2 = n, t.substr(n, 4) === wu2 ? (r = wu2, n += 4) : (r = e, h === 0 && d2(Qe3)), r !== e ? (E4(), s2 = M2(), s2 !== e ? ($3 = u2, u2 = St2(s2)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function _r2() {
      var u2, r, s2;
      return u2 = n, t.substr(n, 4) === bu2 ? (r = bu2, n += 4) : (r = e, h === 0 && d2(ut3)), r !== e ? (E4(), s2 = M2(), s2 !== e ? ($3 = u2, u2 = Rt3(s2)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function yr2() {
      var u2, r, s2, o, B4;
      if (u2 = n, t.substr(n, 5) === xu2 ? (r = xu2, n += 5) : (r = e, h === 0 && d2(et3)), r !== e)
        if (E4(), s2 = Y4(), s2 !== e) {
          if (o = [], B4 = au2(), B4 !== e)
            for (; B4 !== e; )
              o.push(B4), B4 = au2();
          else
            o = e;
          o !== e ? (B4 = Y4(), B4 !== e ? ($3 = u2, u2 = Lt3(o)) : (n = u2, u2 = e)) : (n = u2, u2 = e);
        } else
          n = u2, u2 = e;
      else
        n = u2, u2 = e;
      return u2;
    }
    function Fu2() {
      var u2, r, s2, o;
      if (u2 = n, t.substr(n, 2) === Iu2 ? (r = Iu2, n += 2) : (r = e, h === 0 && d2(tt2)), r !== e) {
        for (s2 = [], o = t.charAt(n), Su2.test(o) ? n++ : (o = e, h === 0 && d2(zu2)); o !== e; )
          s2.push(o), o = t.charAt(n), Su2.test(o) ? n++ : (o = e, h === 0 && d2(zu2));
        r = [r, s2], u2 = r;
      } else
        n = u2, u2 = e;
      return u2;
    }
    function wr2() {
      var u2, r, s2, o, B4, x2, j4, K3;
      if (u2 = n, t.substr(n, 3) === ku2 ? (r = ku2, n += 3) : (r = e, h === 0 && d2(rt3)), r !== e)
        if (E4(), t.charCodeAt(n) === 91 ? (s2 = p, n++) : (s2 = e, h === 0 && d2(Ou2)), s2 !== e)
          if (E4(), o = J4(), o !== e) {
            for (B4 = [], x2 = n, j4 = G3(), j4 !== e ? (K3 = J4(), K3 !== e ? ($3 = x2, x2 = Tu2(o, K3)) : (n = x2, x2 = e)) : (n = x2, x2 = e); x2 !== e; )
              B4.push(x2), x2 = n, j4 = G3(), j4 !== e ? (K3 = J4(), K3 !== e ? ($3 = x2, x2 = Tu2(o, K3)) : (n = x2, x2 = e)) : (n = x2, x2 = e);
            x2 = E4(), t.charCodeAt(n) === 93 ? (j4 = w3, n++) : (j4 = e, h === 0 && d2(Mu2)), j4 !== e ? ($3 = u2, u2 = Ot3(o, B4)) : (n = u2, u2 = e);
          } else
            n = u2, u2 = e;
        else
          n = u2, u2 = e;
      else
        n = u2, u2 = e;
      return u2;
    }
    function br2() {
      var u2;
      return u2 = wr2(), u2 === e && (u2 = Br2()), u2;
    }
    function J4() {
      var u2, r, s2, o, B4;
      if (u2 = n, r = br2(), r !== e) {
        for (E4(), s2 = [], o = Fu2(); o !== e; )
          s2.push(o), o = Fu2();
        $3 = u2, u2 = Mt3(r);
      } else
        n = u2, u2 = e;
      return u2 === e && (u2 = n, r = Cr2(), r !== e ? (E4(), t.charCodeAt(n) === 36 ? (s2 = Ae3, n++) : (s2 = e, h === 0 && d2(nt2)), s2 !== e ? (o = E4(), B4 = J4(), B4 !== e ? ($3 = u2, u2 = zt3(r, B4)) : (n = u2, u2 = e)) : (n = u2, u2 = e)) : (n = u2, u2 = e)), u2;
    }
    function xr2() {
      var u2, r;
      return u2 = n, r = J4(), r !== e && ($3 = u2, r = Tt2(r)), u2 = r, u2 === e && (u2 = Fu2()), u2;
    }
    function Ir2() {
      var u2;
      return u2 = xr2(), u2;
    }
    function kr2() {
      var u2, r;
      return u2 = n, E4(), r = Nr2(), r === e && (r = Pr2(), r === e && (r = qr2())), r !== e ? (E4(), $3 = u2, u2 = Zt3(r)) : (n = u2, u2 = e), u2;
    }
    function Nr2() {
      var u2, r, s2;
      return u2 = n, t.substr(n, 6) === Nu2 ? (r = Nu2, n += 6) : (r = e, h === 0 && d2(st2)), r !== e ? (E4(), s2 = M2(), s2 !== e ? ($3 = u2, u2 = Wt3(s2)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function Pr2() {
      var u2, r, s2;
      return u2 = n, t.substr(n, 6) === Pu2 ? (r = Pu2, n += 6) : (r = e, h === 0 && d2(it3)), r !== e ? (E4(), s2 = M2(), s2 !== e ? ($3 = u2, u2 = Ut3(s2)) : (n = u2, u2 = e)) : (n = u2, u2 = e), u2;
    }
    function qr2() {
      var u2, r;
      return u2 = n, t.substr(n, 4) === qu2 ? (r = qu2, n += 4) : (r = e, h === 0 && d2(ft2)), r !== e && ($3 = u2, r = Vt2()), u2 = r, u2;
    }
    function jr2() {
      var u2;
      return u2 = Ir2(), u2 === e && (u2 = kr2()), u2;
    }
    var Sr2 = function(u2) {
      this.type_ = "atom", this.source_ = u2, this.location_ = Zu2();
    }, lu2 = function(u2, r, s2, o) {
      this.type_ = "pattern", this.arguments_ = { alignment: r, _steps: o }, s2 !== void 0 && (this.arguments_.seed = s2), this.source_ = u2;
    }, Rr2 = function(u2, r, s2) {
      this.type_ = u2, this.arguments_ = r, this.source_ = s2;
    }, Lr2 = function(u2, r) {
      this.type_ = "element", this.source_ = u2, this.options_ = r, this.location_ = Zu2();
    }, hu2 = function(u2, r) {
      this.type_ = "command", this.name_ = u2, this.options_ = r;
    }, Bu2 = 0;
    if (eu2 = a2(), i.peg$library)
      return (
        /** @type {any} */
        {
          peg$result: eu2,
          peg$currPos: n,
          peg$FAILED: e,
          peg$maxFailExpected: fu2,
          peg$maxFailPos: q4
        }
      );
    if (eu2 !== e && n === t.length)
      return eu2;
    throw eu2 !== e && n < t.length && d2(Gt2()), Yt3(
      fu2,
      q4 < t.length ? t.charAt(q4) : null,
      q4 < t.length ? gu2(q4, q4 + 1) : gu2(q4, q4)
    );
  }
  var Gr2 = [
    "start"
  ];
  typeof BigInt > "u" && (BigInt = function(t) {
    if (isNaN(t)) throw new Error("");
    return t;
  });
  var C3 = BigInt(0);
  var m2 = BigInt(1);
  var ru2 = BigInt(2);
  var Du2 = BigInt(5);
  var N3 = BigInt(10);
  var zr2 = 2e3;
  var A2 = {
    s: m2,
    n: C3,
    d: m2
  };
  function z2(t, i) {
    try {
      t = BigInt(t);
    } catch {
      throw Z3();
    }
    return t * i;
  }
  function S3(t) {
    return typeof t == "bigint" ? t : Math.floor(t);
  }
  function I(t, i) {
    if (i === C3)
      throw du2();
    const e = Object.create(b.prototype);
    e.s = t < C3 ? -m2 : m2, t = t < C3 ? -t : t;
    const f3 = U3(t, i);
    return e.n = t / f3, e.d = i / f3, e;
  }
  function Q3(t) {
    const i = {};
    let e = t, f3 = ru2, l2 = Du2 - m2;
    for (; l2 <= e; ) {
      for (; e % f3 === C3; )
        e /= f3, i[f3] = (i[f3] || C3) + m2;
      l2 += m2 + ru2 * f3++;
    }
    return e !== t ? e > 1 && (i[e] = (i[e] || C3) + m2) : i[t] = (i[t] || C3) + m2, i;
  }
  var k2 = function(t, i) {
    let e = C3, f3 = m2, l2 = m2;
    if (t != null) if (i !== void 0) {
      if (typeof t == "bigint")
        e = t;
      else {
        if (isNaN(t))
          throw Z3();
        if (t % 1 !== 0)
          throw Qu2();
        e = BigInt(t);
      }
      if (typeof i == "bigint")
        f3 = i;
      else {
        if (isNaN(i))
          throw Z3();
        if (i % 1 !== 0)
          throw Qu2();
        f3 = BigInt(i);
      }
      l2 = e * f3;
    } else if (typeof t == "object") {
      if ("d" in t && "n" in t)
        e = BigInt(t.n), f3 = BigInt(t.d), "s" in t && (e *= BigInt(t.s));
      else if (0 in t)
        e = BigInt(t[0]), 1 in t && (f3 = BigInt(t[1]));
      else if (typeof t == "bigint")
        e = t;
      else
        throw Z3();
      l2 = e * f3;
    } else if (typeof t == "number") {
      if (isNaN(t))
        throw Z3();
      if (t < 0 && (l2 = -m2, t = -t), t % 1 === 0)
        e = BigInt(t);
      else if (t > 0) {
        let a2 = 1, D3 = 0, v = 1, g2 = 1, c3 = 1, F4 = 1e7;
        for (t >= 1 && (a2 = 10 ** Math.floor(1 + Math.log10(t)), t /= a2); v <= F4 && c3 <= F4; ) {
          let p = (D3 + g2) / (v + c3);
          if (t === p) {
            v + c3 <= F4 ? (e = D3 + g2, f3 = v + c3) : c3 > v ? (e = g2, f3 = c3) : (e = D3, f3 = v);
            break;
          } else
            t > p ? (D3 += g2, v += c3) : (g2 += D3, c3 += v), v > F4 ? (e = g2, f3 = c3) : (e = D3, f3 = v);
        }
        e = BigInt(e) * BigInt(a2), f3 = BigInt(f3);
      }
    } else if (typeof t == "string") {
      let a2 = 0, D3 = C3, v = C3, g2 = C3, c3 = m2, F4 = m2, p = t.replace(/_/g, "").match(/\d+|./g);
      if (p === null)
        throw Z3();
      if (p[a2] === "-" ? (l2 = -m2, a2++) : p[a2] === "+" && a2++, p.length === a2 + 1 ? v = z2(p[a2++], l2) : p[a2 + 1] === "." || p[a2] === "." ? (p[a2] !== "." && (D3 = z2(p[a2++], l2)), a2++, (a2 + 1 === p.length || p[a2 + 1] === "(" && p[a2 + 3] === ")" || p[a2 + 1] === "'" && p[a2 + 3] === "'") && (v = z2(p[a2], l2), c3 = N3 ** BigInt(p[a2].length), a2++), (p[a2] === "(" && p[a2 + 2] === ")" || p[a2] === "'" && p[a2 + 2] === "'") && (g2 = z2(p[a2 + 1], l2), F4 = N3 ** BigInt(p[a2 + 1].length) - m2, a2 += 3)) : p[a2 + 1] === "/" || p[a2 + 1] === ":" ? (v = z2(p[a2], l2), c3 = z2(p[a2 + 2], m2), a2 += 3) : p[a2 + 3] === "/" && p[a2 + 1] === " " && (D3 = z2(p[a2], l2), v = z2(p[a2 + 2], l2), c3 = z2(p[a2 + 4], m2), a2 += 5), p.length <= a2)
        f3 = c3 * F4, l2 = /* void */
        e = g2 + f3 * D3 + F4 * v;
      else
        throw Z3();
    } else if (typeof t == "bigint")
      e = t, l2 = t, f3 = m2;
    else
      throw Z3();
    if (f3 === C3)
      throw du2();
    A2.s = l2 < C3 ? -m2 : m2, A2.n = e < C3 ? -e : e, A2.d = f3 < C3 ? -f3 : f3;
  };
  function Tr2(t, i, e) {
    let f3 = m2;
    for (; i > C3; t = t * t % e, i >>= m2)
      i & m2 && (f3 = f3 * t % e);
    return f3;
  }
  function Zr2(t, i) {
    for (; i % ru2 === C3; i /= ru2)
      ;
    for (; i % Du2 === C3; i /= Du2)
      ;
    if (i === m2)
      return C3;
    let e = N3 % i, f3 = 1;
    for (; e !== m2; f3++)
      if (e = e * N3 % i, f3 > zr2)
        return C3;
    return BigInt(f3);
  }
  function Wr2(t, i, e) {
    let f3 = m2, l2 = Tr2(N3, e, i);
    for (let a2 = 0; a2 < 300; a2++) {
      if (f3 === l2)
        return BigInt(a2);
      f3 = f3 * N3 % i, l2 = l2 * N3 % i;
    }
    return 0;
  }
  function U3(t, i) {
    if (!t)
      return i;
    if (!i)
      return t;
    for (; ; ) {
      if (t %= i, !t)
        return i;
      if (i %= t, !i)
        return t;
    }
  }
  function b(t, i) {
    if (k2(t, i), this instanceof b)
      t = U3(A2.d, A2.n), this.s = A2.s, this.n = A2.n / t, this.d = A2.d / t;
    else
      return I(A2.s * A2.n, A2.d);
  }
  var du2 = function() {
    return new Error("Division by Zero");
  };
  var Z3 = function() {
    return new Error("Invalid argument");
  };
  var Qu2 = function() {
    return new Error("Parameters must be integer");
  };
  b.prototype = {
    s: m2,
    n: C3,
    d: m2,
    /**
     * Calculates the absolute value
     *
     * Ex: new Fraction(-4).abs() => 4
     **/
    abs: function() {
      return I(this.n, this.d);
    },
    /**
     * Inverts the sign of the current fraction
     *
     * Ex: new Fraction(-4).neg() => 4
     **/
    neg: function() {
      return I(-this.s * this.n, this.d);
    },
    /**
     * Adds two rational numbers
     *
     * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30
     **/
    add: function(t, i) {
      return k2(t, i), I(
        this.s * this.n * A2.d + A2.s * this.d * A2.n,
        this.d * A2.d
      );
    },
    /**
     * Subtracts two rational numbers
     *
     * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
     **/
    sub: function(t, i) {
      return k2(t, i), I(
        this.s * this.n * A2.d - A2.s * this.d * A2.n,
        this.d * A2.d
      );
    },
    /**
     * Multiplies two rational numbers
     *
     * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
     **/
    mul: function(t, i) {
      return k2(t, i), I(
        this.s * A2.s * this.n * A2.n,
        this.d * A2.d
      );
    },
    /**
     * Divides two rational numbers
     *
     * Ex: new Fraction("-17.(345)").inverse().div(3)
     **/
    div: function(t, i) {
      return k2(t, i), I(
        this.s * A2.s * this.n * A2.d,
        this.d * A2.n
      );
    },
    /**
     * Clones the actual object
     *
     * Ex: new Fraction("-17.(345)").clone()
     **/
    clone: function() {
      return I(this.s * this.n, this.d);
    },
    /**
     * Calculates the modulo of two rational numbers - a more precise fmod
     *
     * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)
     * Ex: new Fraction(20, 10).mod().equals(0) ? "is Integer"
     **/
    mod: function(t, i) {
      if (t === void 0)
        return I(this.s * this.n % this.d, m2);
      if (k2(t, i), C3 === A2.n * this.d)
        throw du2();
      return I(
        this.s * (A2.d * this.n) % (A2.n * this.d),
        A2.d * this.d
      );
    },
    /**
     * Calculates the fractional gcd of two rational numbers
     *
     * Ex: new Fraction(5,8).gcd(3,7) => 1/56
     */
    gcd: function(t, i) {
      return k2(t, i), I(U3(A2.n, this.n) * U3(A2.d, this.d), A2.d * this.d);
    },
    /**
     * Calculates the fractional lcm of two rational numbers
     *
     * Ex: new Fraction(5,8).lcm(3,7) => 15
     */
    lcm: function(t, i) {
      return k2(t, i), A2.n === C3 && this.n === C3 ? I(C3, m2) : I(A2.n * this.n, U3(A2.n, this.n) * U3(A2.d, this.d));
    },
    /**
     * Gets the inverse of the fraction, means numerator and denominator are exchanged
     *
     * Ex: new Fraction([-3, 4]).inverse() => -4 / 3
     **/
    inverse: function() {
      return I(this.s * this.d, this.n);
    },
    /**
     * Calculates the fraction to some integer exponent
     *
     * Ex: new Fraction(-1,2).pow(-3) => -8
     */
    pow: function(t, i) {
      if (k2(t, i), A2.d === m2)
        return A2.s < C3 ? I((this.s * this.d) ** A2.n, this.n ** A2.n) : I((this.s * this.n) ** A2.n, this.d ** A2.n);
      if (this.s < C3) return null;
      let e = Q3(this.n), f3 = Q3(this.d), l2 = m2, a2 = m2;
      for (let D3 in e)
        if (D3 !== "1") {
          if (D3 === "0") {
            l2 = C3;
            break;
          }
          if (e[D3] *= A2.n, e[D3] % A2.d === C3)
            e[D3] /= A2.d;
          else return null;
          l2 *= BigInt(D3) ** e[D3];
        }
      for (let D3 in f3)
        if (D3 !== "1") {
          if (f3[D3] *= A2.n, f3[D3] % A2.d === C3)
            f3[D3] /= A2.d;
          else return null;
          a2 *= BigInt(D3) ** f3[D3];
        }
      return A2.s < C3 ? I(a2, l2) : I(l2, a2);
    },
    /**
     * Calculates the logarithm of a fraction to a given rational base
     *
     * Ex: new Fraction(27, 8).log(9, 4) => 3/2
     */
    log: function(t, i) {
      if (k2(t, i), this.s <= C3 || A2.s <= C3) return null;
      const e = {}, f3 = Q3(A2.n), l2 = Q3(A2.d), a2 = Q3(this.n), D3 = Q3(this.d);
      for (const c3 in l2)
        f3[c3] = (f3[c3] || C3) - l2[c3];
      for (const c3 in D3)
        a2[c3] = (a2[c3] || C3) - D3[c3];
      for (const c3 in f3)
        c3 !== "1" && (e[c3] = true);
      for (const c3 in a2)
        c3 !== "1" && (e[c3] = true);
      let v = null, g2 = null;
      for (const c3 in e) {
        const F4 = f3[c3] || C3, p = a2[c3] || C3;
        if (F4 === C3) {
          if (p !== C3)
            return null;
          continue;
        }
        let w3 = p, P4 = F4;
        const R3 = U3(w3, P4);
        if (w3 /= R3, P4 /= R3, v === null && g2 === null)
          v = w3, g2 = P4;
        else if (w3 * g2 !== v * P4)
          return null;
      }
      return v !== null && g2 !== null ? I(v, g2) : null;
    },
    /**
     * Check if two rational numbers are the same
     *
     * Ex: new Fraction(19.6).equals([98, 5]);
     **/
    equals: function(t, i) {
      return k2(t, i), this.s * this.n * A2.d === A2.s * A2.n * this.d;
    },
    /**
     * Check if this rational number is less than another
     *
     * Ex: new Fraction(19.6).lt([98, 5]);
     **/
    lt: function(t, i) {
      return k2(t, i), this.s * this.n * A2.d < A2.s * A2.n * this.d;
    },
    /**
     * Check if this rational number is less than or equal another
     *
     * Ex: new Fraction(19.6).lt([98, 5]);
     **/
    lte: function(t, i) {
      return k2(t, i), this.s * this.n * A2.d <= A2.s * A2.n * this.d;
    },
    /**
     * Check if this rational number is greater than another
     *
     * Ex: new Fraction(19.6).lt([98, 5]);
     **/
    gt: function(t, i) {
      return k2(t, i), this.s * this.n * A2.d > A2.s * A2.n * this.d;
    },
    /**
     * Check if this rational number is greater than or equal another
     *
     * Ex: new Fraction(19.6).lt([98, 5]);
     **/
    gte: function(t, i) {
      return k2(t, i), this.s * this.n * A2.d >= A2.s * A2.n * this.d;
    },
    /**
     * Compare two rational numbers
     * < 0 iff this < that
     * > 0 iff this > that
     * = 0 iff this = that
     *
     * Ex: new Fraction(19.6).compare([98, 5]);
     **/
    compare: function(t, i) {
      k2(t, i);
      let e = this.s * this.n * A2.d - A2.s * A2.n * this.d;
      return (C3 < e) - (e < C3);
    },
    /**
     * Calculates the ceil of a rational number
     *
     * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
     **/
    ceil: function(t) {
      return t = N3 ** BigInt(t || 0), I(
        S3(this.s * t * this.n / this.d) + (t * this.n % this.d > C3 && this.s >= C3 ? m2 : C3),
        t
      );
    },
    /**
     * Calculates the floor of a rational number
     *
     * Ex: new Fraction('4.(3)').floor() => (4 / 1)
     **/
    floor: function(t) {
      return t = N3 ** BigInt(t || 0), I(
        S3(this.s * t * this.n / this.d) - (t * this.n % this.d > C3 && this.s < C3 ? m2 : C3),
        t
      );
    },
    /**
     * Rounds a rational numbers
     *
     * Ex: new Fraction('4.(3)').round() => (4 / 1)
     **/
    round: function(t) {
      return t = N3 ** BigInt(t || 0), I(
        S3(this.s * t * this.n / this.d) + this.s * ((this.s >= C3 ? m2 : C3) + ru2 * (t * this.n % this.d) > this.d ? m2 : C3),
        t
      );
    },
    /**
      * Rounds a rational number to a multiple of another rational number
      *
      * Ex: new Fraction('0.9').roundTo("1/8") => 7 / 8
      **/
    roundTo: function(t, i) {
      k2(t, i);
      const e = this.n * A2.d, f3 = this.d * A2.n, l2 = e % f3;
      let a2 = S3(e / f3);
      return l2 + l2 >= f3 && a2++, I(this.s * a2 * A2.n, A2.d);
    },
    /**
     * Check if two rational numbers are divisible
     *
     * Ex: new Fraction(19.6).divisible(1.5);
     */
    divisible: function(t, i) {
      return k2(t, i), !(!(A2.n * this.d) || this.n * A2.d % (A2.n * this.d));
    },
    /**
     * Returns a decimal representation of the fraction
     *
     * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183
     **/
    valueOf: function() {
      return Number(this.s * this.n) / Number(this.d);
    },
    /**
     * Creates a string representation of a fraction with all digits
     *
     * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
     **/
    toString: function(t) {
      let i = this.n, e = this.d;
      t = t || 15;
      let f3 = Zr2(i, e), l2 = Wr2(i, e, f3), a2 = this.s < C3 ? "-" : "";
      if (a2 += S3(i / e), i %= e, i *= N3, i && (a2 += "."), f3) {
        for (let D3 = l2; D3--; )
          a2 += S3(i / e), i %= e, i *= N3;
        a2 += "(";
        for (let D3 = f3; D3--; )
          a2 += S3(i / e), i %= e, i *= N3;
        a2 += ")";
      } else
        for (let D3 = t; i && D3--; )
          a2 += S3(i / e), i %= e, i *= N3;
      return a2;
    },
    /**
     * Returns a string-fraction representation of a Fraction object
     *
     * Ex: new Fraction("1.'3'").toFraction() => "4 1/3"
     **/
    toFraction: function(t) {
      let i = this.n, e = this.d, f3 = this.s < C3 ? "-" : "";
      if (e === m2)
        f3 += i;
      else {
        let l2 = S3(i / e);
        t && l2 > C3 && (f3 += l2, f3 += " ", i %= e), f3 += i, f3 += "/", f3 += e;
      }
      return f3;
    },
    /**
     * Returns a latex representation of a Fraction object
     *
     * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
     **/
    toLatex: function(t) {
      let i = this.n, e = this.d, f3 = this.s < C3 ? "-" : "";
      if (e === m2)
        f3 += i;
      else {
        let l2 = S3(i / e);
        t && l2 > C3 && (f3 += l2, i %= e), f3 += "\\frac{", f3 += i, f3 += "}{", f3 += e, f3 += "}";
      }
      return f3;
    },
    /**
     * Returns an array of continued fraction elements
     *
     * Ex: new Fraction("7/8").toContinued() => [0,1,7]
     */
    toContinued: function() {
      let t = this.n, i = this.d, e = [];
      do {
        e.push(S3(t / i));
        let f3 = t % i;
        t = i, i = f3;
      } while (t !== m2);
      return e;
    },
    simplify: function(t) {
      const i = BigInt(1 / (t || 1e-3) | 0), e = this.abs(), f3 = e.toContinued();
      for (let l2 = 1; l2 < f3.length; l2++) {
        let a2 = I(f3[l2 - 1], m2);
        for (let v = l2 - 2; v >= 0; v--)
          a2 = a2.inverse().add(f3[v]);
        let D3 = a2.sub(e);
        if (D3.n * i < D3.d)
          return a2.mul(this.s);
      }
      return this;
    }
  };
  var L3 = class _L {
    constructor(i, e) {
      this.begin = W3(i), this.end = W3(e);
    }
    get spanCycles() {
      const i = [];
      var e = this.begin;
      const f3 = this.end, l2 = f3.sam();
      if (e.equals(f3))
        return [new _L(e, f3)];
      for (; f3.gt(e); ) {
        if (e.sam().equals(l2)) {
          i.push(new _L(e, this.end));
          break;
        }
        const a2 = e.nextSam();
        i.push(new _L(e, a2)), e = a2;
      }
      return i;
    }
    get duration() {
      return this.end.sub(this.begin);
    }
    cycleArc() {
      const i = this.begin.cyclePos(), e = i.add(this.duration);
      return new _L(i, e);
    }
    withTime(i) {
      return new _L(i(this.begin), i(this.end));
    }
    withEnd(i) {
      return new _L(this.begin, i(this.end));
    }
    withCycle(i) {
      const e = this.begin.sam(), f3 = e.add(i(this.begin.sub(e))), l2 = e.add(i(this.end.sub(e)));
      return new _L(f3, l2);
    }
    intersection(i) {
      const e = this.begin.max(i.begin), f3 = this.end.min(i.end);
      if (!e.gt(f3) && !(e.equals(f3) && (e.equals(this.end) && this.begin.lt(this.end) || e.equals(i.end) && i.begin.lt(i.end))))
        return new _L(e, f3);
    }
    intersection_e(i) {
      const e = this.intersection(i);
      if (e == null)
        throw "TimeSpans do not intersect";
      return e;
    }
    midpoint() {
      return this.begin.add(this.duration.div(W3(2)));
    }
    equals(i) {
      return this.begin.equals(i.begin) && this.end.equals(i.end);
    }
    show() {
      return this.begin.show() + " \u2192 " + this.end.show();
    }
  };
  var Ur2 = (t) => t.filter((i) => i != null);
  b.prototype.sam = function() {
    return this.floor();
  };
  b.prototype.nextSam = function() {
    return this.sam().add(1);
  };
  b.prototype.wholeCycle = function() {
    return new L3(this.sam(), this.nextSam());
  };
  b.prototype.cyclePos = function() {
    return this.sub(this.sam());
  };
  b.prototype.lt = function(t) {
    return this.compare(t) < 0;
  };
  b.prototype.gt = function(t) {
    return this.compare(t) > 0;
  };
  b.prototype.lte = function(t) {
    return this.compare(t) <= 0;
  };
  b.prototype.gte = function(t) {
    return this.compare(t) >= 0;
  };
  b.prototype.eq = function(t) {
    return this.compare(t) == 0;
  };
  b.prototype.ne = function(t) {
    return this.compare(t) != 0;
  };
  b.prototype.max = function(t) {
    return this.gt(t) ? this : t;
  };
  b.prototype.maximum = function(...t) {
    return t = t.map((i) => new b(i)), t.reduce((i, e) => e.max(i), this);
  };
  b.prototype.min = function(t) {
    return this.lt(t) ? this : t;
  };
  b.prototype.mulmaybe = function(t) {
    return t !== void 0 ? this.mul(t) : void 0;
  };
  b.prototype.divmaybe = function(t) {
    return t !== void 0 ? this.div(t) : void 0;
  };
  b.prototype.addmaybe = function(t) {
    return t !== void 0 ? this.add(t) : void 0;
  };
  b.prototype.submaybe = function(t) {
    return t !== void 0 ? this.sub(t) : void 0;
  };
  b.prototype.show = function() {
    return this.s * this.n + "/" + this.d;
  };
  b.prototype.or = function(t) {
    return this.eq(0) ? t : this;
  };
  var W3 = (t) => b(t);
  var cu2 = (...t) => {
    if (t = Ur2(t), t.length === 0)
      return;
    const i = t.pop();
    return t.reduce(
      (e, f3) => e === void 0 || f3 === void 0 ? void 0 : e.lcm(f3),
      i
    );
  };
  W3._original = b;
  var ue3 = 3e-4;
  var Vr2 = (t, i) => (e, f3) => {
    const D3 = t.source_[f3].options_?.ops, v = e.__steps_source;
    if (D3)
      for (const g2 of D3)
        switch (g2.type_) {
          case "stretch": {
            const c3 = ["fast", "slow"], { type: F4, amount: p } = g2.arguments_;
            if (!c3.includes(F4))
              throw new Error(`mini: stretch: type must be one of ${c3.join("|")} but got ${F4}`);
            e = d(e)[F4](i(p));
            break;
          }
          case "replicate": {
            const { amount: c3 } = g2.arguments_;
            e = d(e), e = e._repeatCycles(c3)._fast(c3);
            break;
          }
          case "bjorklund": {
            g2.arguments_.rotation ? e = e.euclidRot(i(g2.arguments_.pulse), i(g2.arguments_.step), i(g2.arguments_.rotation)) : e = e.euclid(i(g2.arguments_.pulse), i(g2.arguments_.step));
            break;
          }
          case "degradeBy": {
            e = d(e)._degradeByWith(W2.early(ue3 * g2.arguments_.seed), g2.arguments_.amount ?? 0.5);
            break;
          }
          case "tail": {
            const c3 = i(g2.arguments_.element);
            e = e.fmap((F4) => (p) => Array.isArray(F4) ? [...F4, p] : [F4, p]).appLeft(c3);
            break;
          }
          case "range": {
            const c3 = i(g2.arguments_.element);
            e = d(e);
            const F4 = (w3, P4, R3 = 1) => Array.from(
              { length: Math.abs(P4 - w3) / R3 + 1 },
              (su2, iu2) => w3 < P4 ? w3 + iu2 * R3 : w3 - iu2 * R3
            );
            e = ((w3, P4) => w3.squeezeBind((R3) => P4.bind((su2) => N2(...F4(R3, su2)))))(e, c3);
            break;
          }
          default:
            console.warn(`operator "${g2.type_}" not implemented`);
        }
    return e.__steps_source = e.__steps_source || v, e;
  };
  function nu2(t, i, e, f3 = 0) {
    e?.(t);
    const l2 = (a2) => nu2(a2, i, e, f3);
    switch (t.type_) {
      case "pattern": {
        const a2 = t.source_.map((c3) => l2(c3)).map(Vr2(t, l2)), D3 = t.arguments_.alignment, v = a2.filter((c3) => c3.__steps_source);
        let g2;
        switch (D3) {
          case "stack": {
            g2 = z(...a2), v.length && (g2._steps = cu2(...v.map((c3) => W3(c3._steps))));
            break;
          }
          case "polymeter_slowcat": {
            g2 = z(...a2.map((c3) => c3._slow(c3.__weight))), v.length && (g2._steps = cu2(...v.map((c3) => W3(c3._steps))));
            break;
          }
          case "polymeter": {
            const c3 = t.arguments_.stepsPerCycle ? l2(t.arguments_.stepsPerCycle).fmap((p) => m(p)) : C2(m(a2.length > 0 ? a2[0].__weight : 1)), F4 = a2.map((p) => p.fast(c3.fmap((w3) => w3.div(p.__weight))));
            g2 = z(...F4);
            break;
          }
          case "rand": {
            g2 = Pe2(W2.early(ue3 * t.arguments_.seed).segment(1), a2), v.length && (g2._steps = cu2(...v.map((c3) => W3(c3._steps))));
            break;
          }
          case "feet": {
            g2 = N2(...a2);
            break;
          }
          default: {
            if (t.source_.some((F4) => !!F4.options_?.weight)) {
              const F4 = t.source_.reduce(
                (p, w3) => p.add(w3.options_?.weight || m(1)),
                m(0)
              );
              g2 = ns(
                ...t.source_.map((p, w3) => [p.options_?.weight || m(1), a2[w3]])
              ), g2.__weight = F4, g2._steps = F4, v.length && (g2._steps = g2._steps.mul(cu2(...v.map((p) => W3(p._steps)))));
            } else
              g2 = Q2(...a2), g2._steps = a2.length;
            t.arguments_._steps && (g2.__steps_source = true);
          }
        }
        return v.length && (g2.__steps_source = true), g2;
      }
      case "element":
        return l2(t.source_);
      case "atom": {
        if (t.source_ === "~" || t.source_ === "-")
          return q2;
        if (!t.location_)
          return console.warn("no location for", t), t.source_;
        const a2 = isNaN(Number(t.source_)) ? t.source_ : Number(t.source_);
        if (f3 === -1)
          return C2(a2);
        const [D3, v] = ee3(i, t, f3);
        return C2(a2).withLoc(D3, v);
      }
      case "stretch":
        return l2(t.source_).slow(l2(t.arguments_.amount));
      default:
        return console.warn(`node type "${t.type_}" not implemented -> returning silence`), q2;
    }
  }
  var ee3 = (t, i, e = 0) => {
    const { start: f3, end: l2 } = i.location_, a2 = t?.split("").slice(f3.offset, l2.offset).join(""), [D3 = 0, v = 0] = a2 ? a2.split(i.source_).map((g2) => g2.split("").filter((c3) => c3 === " ").length) : [];
    return [f3.offset + D3 + e, l2.offset - v + e];
  };
  var Au2 = (t, i = 0, e = t) => {
    try {
      return Mr2(t);
    } catch (f3) {
      const l2 = [f3.location.start.offset + i, f3.location.end.offset + i], a2 = e.slice(0, l2[0]).split(`
`).length;
      throw new Error(`[mini] parse error at line ${a2}: ${f3.message}`);
    }
  };
  var Xr2 = (t, i, e) => {
    const f3 = Au2(t, i, e);
    let l2 = [];
    return nu2(
      f3,
      t,
      (a2) => {
        a2.type_ === "atom" && l2.push(a2);
      },
      -1
    ), l2;
  };
  var Yr2 = (t, i = 0, e) => Xr2(t, i, e).map((f3) => ee3(t, f3, i));
  var te3 = (...t) => {
    const i = t.map((e) => {
      const f3 = `"${e}"`, l2 = Au2(f3);
      return nu2(l2, f3);
    });
    return Q2(...i);
  };
  var Hr2 = (t, i) => {
    const e = `"${t}"`, f3 = Au2(e);
    return nu2(f3, e, null, i);
  };
  var Jr2 = (t) => {
    const i = Au2(t);
    return nu2(i, t);
  };
  function Kr2(t) {
    return typeof t == "string" ? te3(t) : d(t);
  }
  function Qr2() {
    mh(te3);
  }

  // node_modules/acorn/dist/acorn.mjs
  var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 31, 4, 33, 15, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 199, 7, 137, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 55, 9, 7, 0, 259, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 481, 1, 61, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 12, 2, 9, 1, 3, 0, 33, 1, 1357, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 233, 0, 3, 0, 8, 1, 6, 0, 475, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
  var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 13, 65, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 7, 25, 39, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 5, 18, 21, 18, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 18, 0, 182, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 24, 43, 22, 0, 239, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 111, 6, 206, 13, 310, 2314, 96, 16, 1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 433, 44, 212, 63, 33, 24, 3, 24, 45, 74, 6, 0, 67, 12, 65, 1, 2, 0, 15, 4, 10, 7386, 37, 33, 96, 114, 14, 913, 15, 50, 7710, 3, 2, 6, 2, 1, 2, 296, 10, 0, 30, 2, 3, 0, 15, 4, 8, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 340, 2, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 129, 15, 6, 55, 50, 49, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 208, 30, 2, 2, 2, 1, 2, 6, 3, 4, 10, 1, 225, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4382, 2, 5773, 3, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 8489, 39815, 11327];
  var nonASCIIidentifierChars = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7-\u05C9\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B53-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1AF0\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65";
  var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0558\u0559\u0560-\u0588\u058B\u058C\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088F\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5C\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDC-\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u208F-\u209F\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7DD\uA7E2\uA7F1-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB6C\uAB6D\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
  var reservedWords = {
    3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
    5: "class enum extends super const export import",
    6: "enum",
    strict: "implements interface let package private protected public static yield",
    strictBind: "eval arguments"
  };
  var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";
  var keywords$1 = {
    5: ecma5AndLessKeywords,
    "5module": ecma5AndLessKeywords + " export import",
    6: ecma5AndLessKeywords + " const class extends export import super"
  };
  var keywordRelationalOperator = /^in(stanceof)?$/;
  var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
  var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
  function isInAstralSet(code, set) {
    var pos = 65536;
    for (var i = 0; i < set.length; i += 2) {
      pos += set[i];
      if (pos > code) {
        return false;
      }
      pos += set[i + 1];
      if (pos >= code) {
        return true;
      }
    }
    return false;
  }
  function isIdentifierStart(code, astral) {
    if (code < 65) {
      return code === 36;
    }
    if (code < 91) {
      return true;
    }
    if (code < 97) {
      return code === 95;
    }
    if (code < 123) {
      return true;
    }
    if (code <= 65535) {
      return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code));
    }
    if (astral === false) {
      return false;
    }
    return isInAstralSet(code, astralIdentifierStartCodes);
  }
  function isIdentifierChar(code, astral) {
    if (code < 48) {
      return code === 36;
    }
    if (code < 58) {
      return true;
    }
    if (code < 65) {
      return false;
    }
    if (code < 91) {
      return true;
    }
    if (code < 97) {
      return code === 95;
    }
    if (code < 123) {
      return true;
    }
    if (code <= 65535) {
      return code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code));
    }
    if (astral === false) {
      return false;
    }
    return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
  }
  var TokenType = function TokenType2(label, conf) {
    if (conf === void 0) conf = {};
    this.label = label;
    this.keyword = conf.keyword;
    this.beforeExpr = !!conf.beforeExpr;
    this.startsExpr = !!conf.startsExpr;
    this.isLoop = !!conf.isLoop;
    this.isAssign = !!conf.isAssign;
    this.prefix = !!conf.prefix;
    this.postfix = !!conf.postfix;
    this.binop = conf.binop || null;
    this.updateContext = null;
  };
  function binop(name, prec) {
    return new TokenType(name, { beforeExpr: true, binop: prec });
  }
  var beforeExpr = { beforeExpr: true };
  var startsExpr = { startsExpr: true };
  var keywords = {};
  function kw2(name, options) {
    if (options === void 0) options = {};
    options.keyword = name;
    return keywords[name] = new TokenType(name, options);
  }
  var types$1 = {
    num: new TokenType("num", startsExpr),
    regexp: new TokenType("regexp", startsExpr),
    string: new TokenType("string", startsExpr),
    name: new TokenType("name", startsExpr),
    privateId: new TokenType("privateId", startsExpr),
    eof: new TokenType("eof"),
    // Punctuation token types.
    bracketL: new TokenType("[", { beforeExpr: true, startsExpr: true }),
    bracketR: new TokenType("]"),
    braceL: new TokenType("{", { beforeExpr: true, startsExpr: true }),
    braceR: new TokenType("}"),
    parenL: new TokenType("(", { beforeExpr: true, startsExpr: true }),
    parenR: new TokenType(")"),
    comma: new TokenType(",", beforeExpr),
    semi: new TokenType(";", beforeExpr),
    colon: new TokenType(":", beforeExpr),
    dot: new TokenType("."),
    question: new TokenType("?", beforeExpr),
    questionDot: new TokenType("?."),
    arrow: new TokenType("=>", beforeExpr),
    template: new TokenType("template"),
    invalidTemplate: new TokenType("invalidTemplate"),
    ellipsis: new TokenType("...", beforeExpr),
    backQuote: new TokenType("`", startsExpr),
    dollarBraceL: new TokenType("${", { beforeExpr: true, startsExpr: true }),
    // Operators. These carry several kinds of properties to help the
    // parser use them properly (the presence of these properties is
    // what categorizes them as operators).
    //
    // `binop`, when present, specifies that this operator is a binary
    // operator, and will refer to its precedence.
    //
    // `prefix` and `postfix` mark the operator as a prefix or postfix
    // unary operator.
    //
    // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
    // binary operators with a very low precedence, that should result
    // in AssignmentExpression nodes.
    eq: new TokenType("=", { beforeExpr: true, isAssign: true }),
    assign: new TokenType("_=", { beforeExpr: true, isAssign: true }),
    incDec: new TokenType("++/--", { prefix: true, postfix: true, startsExpr: true }),
    prefix: new TokenType("!/~", { beforeExpr: true, prefix: true, startsExpr: true }),
    logicalOR: binop("||", 1),
    logicalAND: binop("&&", 2),
    bitwiseOR: binop("|", 3),
    bitwiseXOR: binop("^", 4),
    bitwiseAND: binop("&", 5),
    equality: binop("==/!=/===/!==", 6),
    relational: binop("</>/<=/>=", 7),
    bitShift: binop("<</>>/>>>", 8),
    plusMin: new TokenType("+/-", { beforeExpr: true, binop: 9, prefix: true, startsExpr: true }),
    modulo: binop("%", 10),
    star: binop("*", 10),
    slash: binop("/", 10),
    starstar: new TokenType("**", { beforeExpr: true }),
    coalesce: binop("??", 1),
    // Keyword token types.
    _break: kw2("break"),
    _case: kw2("case", beforeExpr),
    _catch: kw2("catch"),
    _continue: kw2("continue"),
    _debugger: kw2("debugger"),
    _default: kw2("default", beforeExpr),
    _do: kw2("do", { isLoop: true, beforeExpr: true }),
    _else: kw2("else", beforeExpr),
    _finally: kw2("finally"),
    _for: kw2("for", { isLoop: true }),
    _function: kw2("function", startsExpr),
    _if: kw2("if"),
    _return: kw2("return", beforeExpr),
    _switch: kw2("switch"),
    _throw: kw2("throw", beforeExpr),
    _try: kw2("try"),
    _var: kw2("var"),
    _const: kw2("const"),
    _while: kw2("while", { isLoop: true }),
    _with: kw2("with"),
    _new: kw2("new", { beforeExpr: true, startsExpr: true }),
    _this: kw2("this", startsExpr),
    _super: kw2("super", startsExpr),
    _class: kw2("class", startsExpr),
    _extends: kw2("extends", beforeExpr),
    _export: kw2("export"),
    _import: kw2("import", startsExpr),
    _null: kw2("null", startsExpr),
    _true: kw2("true", startsExpr),
    _false: kw2("false", startsExpr),
    _in: kw2("in", { beforeExpr: true, binop: 7 }),
    _instanceof: kw2("instanceof", { beforeExpr: true, binop: 7 }),
    _typeof: kw2("typeof", { beforeExpr: true, prefix: true, startsExpr: true }),
    _void: kw2("void", { beforeExpr: true, prefix: true, startsExpr: true }),
    _delete: kw2("delete", { beforeExpr: true, prefix: true, startsExpr: true })
  };
  var lineBreak = /\r\n?|\n|\u2028|\u2029/;
  var lineBreakG = new RegExp(lineBreak.source, "g");
  function isNewLine(code) {
    return code === 10 || code === 13 || code === 8232 || code === 8233;
  }
  function nextLineBreak(code, from, end) {
    if (end === void 0) end = code.length;
    for (var i = from; i < end; i++) {
      var next = code.charCodeAt(i);
      if (isNewLine(next)) {
        return i < end - 1 && next === 13 && code.charCodeAt(i + 1) === 10 ? i + 2 : i + 1;
      }
    }
    return -1;
  }
  var nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
  var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
  var ref = Object.prototype;
  var hasOwnProperty = ref.hasOwnProperty;
  var toString = ref.toString;
  var hasOwn = Object.hasOwn || (function(obj, propName) {
    return hasOwnProperty.call(obj, propName);
  });
  var isArray = Array.isArray || (function(obj) {
    return toString.call(obj) === "[object Array]";
  });
  var regexpCache = /* @__PURE__ */ Object.create(null);
  function wordsRegexp(words) {
    return regexpCache[words] || (regexpCache[words] = new RegExp("^(?:" + words.replace(/ /g, "|") + ")$"));
  }
  function codePointToString(code) {
    if (code <= 65535) {
      return String.fromCharCode(code);
    }
    code -= 65536;
    return String.fromCharCode((code >> 10) + 55296, (code & 1023) + 56320);
  }
  var loneSurrogate = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/;
  var Position = function Position2(line, col) {
    this.line = line;
    this.column = col;
  };
  Position.prototype.offset = function offset(n) {
    return new Position(this.line, this.column + n);
  };
  var SourceLocation = function SourceLocation2(p, start, end) {
    this.start = start;
    this.end = end;
    if (p.sourceFile !== null) {
      this.source = p.sourceFile;
    }
  };
  function getLineInfo(input, offset2) {
    for (var line = 1, cur = 0; ; ) {
      var nextBreak = nextLineBreak(input, cur, offset2);
      if (nextBreak < 0) {
        return new Position(line, offset2 - cur);
      }
      ++line;
      cur = nextBreak;
    }
  }
  var defaultOptions = {
    // `ecmaVersion` indicates the ECMAScript version to parse. Must be
    // either 3, 5, 6 (or 2015), 7 (2016), 8 (2017), 9 (2018), 10
    // (2019), 11 (2020), 12 (2021), 13 (2022), 14 (2023), or `"latest"`
    // (the latest version the library supports). This influences
    // support for strict mode, the set of reserved words, and support
    // for new syntax features.
    ecmaVersion: null,
    // `sourceType` indicates the mode the code should be parsed in.
    // Can be either `"script"`, `"module"` or `"commonjs"`. This influences global
    // strict mode and parsing of `import` and `export` declarations.
    sourceType: "script",
    // When set to true, enable strict parsing mode even if `sourceType`
    // is `"script"`.
    strict: false,
    // `onInsertedSemicolon` can be a callback that will be called when
    // a semicolon is automatically inserted. It will be passed the
    // position of the inserted semicolon as an offset, and if
    // `locations` is enabled, it is given the location as a `{line,
    // column}` object as second argument.
    onInsertedSemicolon: null,
    // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
    // trailing commas.
    onTrailingComma: null,
    // By default, reserved words are only enforced if ecmaVersion >= 5.
    // Set `allowReserved` to a boolean value to explicitly turn this on
    // an off. When this option has the value "never", reserved words
    // and keywords can also not be used as property names.
    allowReserved: null,
    // When enabled, a return at the top level is not considered an
    // error.
    allowReturnOutsideFunction: false,
    // When enabled, import/export statements are not constrained to
    // appearing at the top of the program, and an import.meta expression
    // in a script isn't considered an error.
    allowImportExportEverywhere: false,
    // By default, await identifiers are allowed to appear at the top-level scope only if ecmaVersion >= 2022.
    // When enabled, await identifiers are allowed to appear at the top-level scope,
    // but they are still not allowed in non-async functions.
    allowAwaitOutsideFunction: null,
    // When enabled, super identifiers are not constrained to
    // appearing in methods and do not raise an error when they appear elsewhere.
    allowSuperOutsideMethod: null,
    // When enabled, hashbang directive in the beginning of file is
    // allowed and treated as a line comment. Enabled by default when
    // `ecmaVersion` >= 2023.
    allowHashBang: false,
    // By default, the parser will verify that private properties are
    // only used in places where they are valid and have been declared.
    // Set this to false to turn such checks off.
    checkPrivateFields: true,
    // When `locations` is on, `loc` properties holding objects with
    // `start` and `end` properties in `{line, column}` form (with
    // line being 1-based and column 0-based) will be attached to the
    // nodes.
    locations: false,
    // Pass an optional `{line, column}` object to use for the start of
    // the parse. This is mostly useful when using `parseExpressionAt`
    // with `locations: true`, to prevent the parser from having to
    // determine the line position at the start position.
    startLocation: null,
    // A function can be passed as `onToken` option, which will
    // cause Acorn to call that function with object in the same
    // format as tokens returned from `tokenizer().getToken()`. Note
    // that you are not allowed to call the parser from the
    // callback—that will corrupt its internal state.
    onToken: null,
    // A function can be passed as `onComment` option, which will
    // cause Acorn to call that function with `(block, text, start,
    // end)` parameters whenever a comment is skipped. `block` is a
    // boolean indicating whether this is a block (`/* */`) comment,
    // `text` is the content of the comment, and `start` and `end` are
    // character offsets that denote the start and end of the comment.
    // When the `locations` option is on, two more parameters are
    // passed, the full `{line, column}` locations of the start and
    // end of the comments. Note that you are not allowed to call the
    // parser from the callback—that will corrupt its internal state.
    // When this option has an array as value, objects representing the
    // comments are pushed to it.
    onComment: null,
    // Nodes have their start and end characters offsets recorded in
    // `start` and `end` properties (directly on the node, rather than
    // the `loc` object, which holds line/column data. To also add a
    // [semi-standardized][range] `range` property holding a `[start,
    // end]` array with the same numbers, set the `ranges` option to
    // `true`.
    //
    // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
    ranges: false,
    // It is possible to parse multiple files into a single AST by
    // passing the tree produced by parsing the first file as
    // `program` option in subsequent parses. This will add the
    // toplevel forms of the parsed file to the `Program` (top) node
    // of an existing parse tree.
    program: null,
    // When `locations` is on, you can pass this to record the source
    // file in every node's `loc` object.
    sourceFile: null,
    // This value, if given, is stored in every node, whether
    // `locations` is on or off.
    directSourceFile: null,
    // When enabled, parenthesized expressions are represented by
    // (non-standard) ParenthesizedExpression nodes
    preserveParens: false
  };
  var warnedAboutEcmaVersion = false;
  function getOptions(opts) {
    var options = {};
    for (var opt in defaultOptions) {
      options[opt] = opts && hasOwn(opts, opt) ? opts[opt] : defaultOptions[opt];
    }
    if (options.ecmaVersion === "latest") {
      options.ecmaVersion = 1e8;
    } else if (options.ecmaVersion == null) {
      if (!warnedAboutEcmaVersion && typeof console === "object" && console.warn) {
        warnedAboutEcmaVersion = true;
        console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.");
      }
      options.ecmaVersion = 11;
    } else if (options.ecmaVersion >= 2015) {
      options.ecmaVersion -= 2009;
    }
    if (options.allowReserved == null) {
      options.allowReserved = options.ecmaVersion < 5;
    }
    if (!opts || opts.allowHashBang == null) {
      options.allowHashBang = options.ecmaVersion >= 14;
    }
    if (isArray(options.onToken)) {
      var tokens = options.onToken;
      options.onToken = function(token) {
        return tokens.push(token);
      };
    }
    if (isArray(options.onComment)) {
      options.onComment = pushComment(options, options.onComment);
    }
    if (options.sourceType === "commonjs" && options.allowAwaitOutsideFunction) {
      throw new Error("Cannot use allowAwaitOutsideFunction with sourceType: commonjs");
    }
    return options;
  }
  function pushComment(options, array) {
    return function(block, text, start, end, startLoc, endLoc) {
      var comment = {
        type: block ? "Block" : "Line",
        value: text,
        start,
        end
      };
      if (options.locations) {
        comment.loc = new SourceLocation(this, startLoc, endLoc);
      }
      if (options.ranges) {
        comment.range = [start, end];
      }
      array.push(comment);
    };
  }
  var SCOPE_TOP = 1;
  var SCOPE_FUNCTION = 2;
  var SCOPE_ASYNC = 4;
  var SCOPE_GENERATOR = 8;
  var SCOPE_ARROW = 16;
  var SCOPE_SIMPLE_CATCH = 32;
  var SCOPE_SUPER = 64;
  var SCOPE_DIRECT_SUPER = 128;
  var SCOPE_CLASS_STATIC_BLOCK = 256;
  var SCOPE_CLASS_FIELD_INIT = 512;
  var SCOPE_SWITCH = 1024;
  var SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK;
  function functionFlags(async, generator) {
    return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0);
  }
  var BIND_NONE = 0;
  var BIND_VAR = 1;
  var BIND_LEXICAL = 2;
  var BIND_FUNCTION = 3;
  var BIND_SIMPLE_CATCH = 4;
  var BIND_OUTSIDE = 5;
  var Parser = function Parser2(options, input, startPos) {
    this.options = options = getOptions(options);
    this.sourceFile = options.sourceFile;
    this.keywords = wordsRegexp(keywords$1[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
    var reserved = "";
    if (options.allowReserved !== true) {
      reserved = reservedWords[options.ecmaVersion >= 6 ? 6 : options.ecmaVersion === 5 ? 5 : 3];
      if (options.sourceType === "module") {
        reserved += " await";
      }
    }
    this.reservedWords = wordsRegexp(reserved);
    var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
    this.reservedWordsStrict = wordsRegexp(reservedStrict);
    this.reservedWordsStrictBind = wordsRegexp(reservedStrict + " " + reservedWords.strictBind);
    this.input = String(input);
    this.containsEsc = false;
    this.pos = startPos || 0;
    this.curLine = 1;
    if (options.startLocation) {
      this.lineStart = this.pos - options.startLocation.column;
      this.curLine = options.startLocation.line;
    } else if (startPos) {
      this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
      if (this.options.locations) {
        this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
      }
    } else {
      this.lineStart = 0;
    }
    this.type = types$1.eof;
    this.value = null;
    this.start = this.end = this.pos;
    this.startLoc = this.endLoc = this.curPosition();
    this.lastTokEndLoc = this.lastTokStartLoc = null;
    this.lastTokStart = this.lastTokEnd = this.pos;
    this.context = this.initialContext();
    this.exprAllowed = true;
    this.inModule = options.sourceType === "module";
    this.strict = this.inModule || options.strict === true || this.strictDirective(this.pos);
    this.potentialArrowAt = -1;
    this.potentialArrowInForAwait = false;
    this.yieldPos = this.awaitPos = this.awaitIdentPos = 0;
    this.labels = [];
    this.undefinedExports = /* @__PURE__ */ Object.create(null);
    if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!") {
      this.skipLineComment(2);
    }
    this.scopeStack = [];
    this.enterScope(
      this.options.sourceType === "commonjs" ? SCOPE_FUNCTION : SCOPE_TOP
    );
    this.regexpState = null;
    this.privateNameStack = [];
  };
  var prototypeAccessors = { inFunction: { configurable: true }, inGenerator: { configurable: true }, inAsync: { configurable: true }, canAwait: { configurable: true }, allowReturn: { configurable: true }, allowSuper: { configurable: true }, allowDirectSuper: { configurable: true }, treatFunctionsAsVar: { configurable: true }, allowNewDotTarget: { configurable: true }, allowUsing: { configurable: true }, inClassStaticBlock: { configurable: true } };
  Parser.prototype.parse = function parse2() {
    var this$1$1 = this;
    var node = this.options.program || this.startNode();
    this.nextToken();
    return this.catchStackOverflow(function() {
      return this$1$1.parseTopLevel(node);
    });
  };
  prototypeAccessors.inFunction.get = function() {
    return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0;
  };
  prototypeAccessors.inGenerator.get = function() {
    return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0;
  };
  prototypeAccessors.inAsync.get = function() {
    return (this.currentVarScope().flags & SCOPE_ASYNC) > 0;
  };
  prototypeAccessors.canAwait.get = function() {
    for (var i = this.scopeStack.length - 1; i >= 0; i--) {
      var ref2 = this.scopeStack[i];
      var flags = ref2.flags;
      if (flags & (SCOPE_CLASS_STATIC_BLOCK | SCOPE_CLASS_FIELD_INIT)) {
        return false;
      }
      if (flags & SCOPE_FUNCTION) {
        return (flags & SCOPE_ASYNC) > 0;
      }
    }
    return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
  };
  prototypeAccessors.allowReturn.get = function() {
    if (this.inFunction) {
      return true;
    }
    if (this.options.allowReturnOutsideFunction && this.currentVarScope().flags & SCOPE_TOP) {
      return true;
    }
    return false;
  };
  prototypeAccessors.allowSuper.get = function() {
    var ref2 = this.currentThisScope();
    var flags = ref2.flags;
    return (flags & SCOPE_SUPER) > 0 || this.options.allowSuperOutsideMethod;
  };
  prototypeAccessors.allowDirectSuper.get = function() {
    return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0;
  };
  prototypeAccessors.treatFunctionsAsVar.get = function() {
    return this.treatFunctionsAsVarInScope(this.currentScope());
  };
  prototypeAccessors.allowNewDotTarget.get = function() {
    for (var i = this.scopeStack.length - 1; i >= 0; i--) {
      var ref2 = this.scopeStack[i];
      var flags = ref2.flags;
      if (flags & (SCOPE_CLASS_STATIC_BLOCK | SCOPE_CLASS_FIELD_INIT) || flags & SCOPE_FUNCTION && !(flags & SCOPE_ARROW)) {
        return true;
      }
    }
    return false;
  };
  prototypeAccessors.allowUsing.get = function() {
    var ref2 = this.currentScope();
    var flags = ref2.flags;
    if (flags & SCOPE_SWITCH) {
      return false;
    }
    if (!this.inModule && flags & SCOPE_TOP) {
      return false;
    }
    return true;
  };
  prototypeAccessors.inClassStaticBlock.get = function() {
    return (this.currentVarScope().flags & SCOPE_CLASS_STATIC_BLOCK) > 0;
  };
  Parser.extend = function extend() {
    var plugins = [], len = arguments.length;
    while (len--) plugins[len] = arguments[len];
    var cls = this;
    for (var i = 0; i < plugins.length; i++) {
      cls = plugins[i](cls);
    }
    return cls;
  };
  Parser.parse = function parse3(input, options) {
    return new this(options, input).parse();
  };
  Parser.parseExpressionAt = function parseExpressionAt(input, pos, options) {
    var parser = new this(options, input, pos);
    parser.nextToken();
    return parser.parseExpression();
  };
  Parser.tokenizer = function tokenizer(input, options) {
    return new this(options, input);
  };
  Object.defineProperties(Parser.prototype, prototypeAccessors);
  var pp$9 = Parser.prototype;
  var literal = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
  pp$9.strictDirective = function(start) {
    if (this.options.ecmaVersion < 5) {
      return false;
    }
    for (; ; ) {
      skipWhiteSpace.lastIndex = start;
      start += skipWhiteSpace.exec(this.input)[0].length;
      var match = literal.exec(this.input.slice(start));
      if (!match) {
        return false;
      }
      if ((match[1] || match[2]) === "use strict") {
        skipWhiteSpace.lastIndex = start + match[0].length;
        var spaceAfter = skipWhiteSpace.exec(this.input), end = spaceAfter.index + spaceAfter[0].length;
        var next = this.input.charAt(end);
        return next === ";" || next === "}" || lineBreak.test(spaceAfter[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(next) || next === "!" && this.input.charAt(end + 1) === "=" || next === "i" && keywordOpAt(this, end));
      }
      start += match[0].length;
      skipWhiteSpace.lastIndex = start;
      start += skipWhiteSpace.exec(this.input)[0].length;
      if (this.input[start] === ";") {
        start++;
      }
    }
  };
  function keywordOpAt(parser, pos) {
    var end = pos + 1, stop = Math.min(parser.input.length, pos + 11);
    while (end < stop) {
      var ch2 = parser.fullCharCodeAt(end);
      if (!isIdentifierChar(ch2, true)) {
        break;
      }
      end += ch2 <= 65535 ? 1 : 2;
    }
    return end === pos + 2 && parser.input.slice(pos, end) === "in" || end === pos + 10 && parser.input.slice(pos, end) === "instanceof";
  }
  pp$9.eat = function(type) {
    if (this.type === type) {
      this.next();
      return true;
    } else {
      return false;
    }
  };
  pp$9.isContextual = function(name) {
    return this.type === types$1.name && this.value === name && !this.containsEsc;
  };
  pp$9.eatContextual = function(name) {
    if (!this.isContextual(name)) {
      return false;
    }
    this.next();
    return true;
  };
  pp$9.catchStackOverflow = function(f3) {
    try {
      return f3();
    } catch (e) {
      if (e instanceof Error && (/\bstack\b.*\b(exceeded|overflow)\b/i.test(e.message) || /\btoo much recursion\b/i.test(e.message))) {
        this.raise(this.start, "Not enough stack space to parse input");
      } else {
        throw e;
      }
    }
  };
  pp$9.expectContextual = function(name) {
    if (!this.eatContextual(name)) {
      this.unexpected();
    }
  };
  pp$9.canInsertSemicolon = function() {
    return this.type === types$1.eof || this.type === types$1.braceR || lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
  };
  pp$9.insertSemicolon = function() {
    if (this.canInsertSemicolon()) {
      if (this.options.onInsertedSemicolon) {
        this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
      }
      return true;
    }
  };
  pp$9.semicolon = function() {
    if (!this.eat(types$1.semi) && !this.insertSemicolon()) {
      this.unexpected();
    }
  };
  pp$9.afterTrailingComma = function(tokType, notNext) {
    if (this.type === tokType) {
      if (this.options.onTrailingComma) {
        this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
      }
      if (!notNext) {
        this.next();
      }
      return true;
    }
  };
  pp$9.expect = function(type) {
    this.eat(type) || this.unexpected();
  };
  pp$9.unexpected = function(pos) {
    this.raise(pos != null ? pos : this.start, "Unexpected token");
  };
  var DestructuringErrors = function DestructuringErrors2() {
    this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
  };
  pp$9.checkPatternErrors = function(refDestructuringErrors, isAssign) {
    if (!refDestructuringErrors) {
      return;
    }
    if (refDestructuringErrors.trailingComma > -1) {
      this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element");
    }
    var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
    if (parens > -1) {
      this.raiseRecoverable(parens, isAssign ? "Assigning to rvalue" : "Parenthesized pattern");
    }
  };
  pp$9.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
    if (!refDestructuringErrors) {
      return false;
    }
    var shorthandAssign = refDestructuringErrors.shorthandAssign;
    var doubleProto = refDestructuringErrors.doubleProto;
    if (!andThrow) {
      return shorthandAssign >= 0 || doubleProto >= 0;
    }
    if (shorthandAssign >= 0) {
      this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns");
    }
    if (doubleProto >= 0) {
      this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property");
    }
  };
  pp$9.checkYieldAwaitInDefaultParams = function() {
    if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos)) {
      this.raise(this.yieldPos, "Yield expression cannot be a default value");
    }
    if (this.awaitPos) {
      this.raise(this.awaitPos, "Await expression cannot be a default value");
    }
  };
  pp$9.isSimpleAssignTarget = function(expr) {
    if (expr.type === "ParenthesizedExpression") {
      return this.isSimpleAssignTarget(expr.expression);
    }
    return expr.type === "Identifier" || expr.type === "MemberExpression";
  };
  var pp$8 = Parser.prototype;
  pp$8.parseTopLevel = function(node) {
    var exports$1 = /* @__PURE__ */ Object.create(null);
    if (!node.body) {
      node.body = [];
    }
    while (this.type !== types$1.eof) {
      var stmt = this.parseStatement(null, true, exports$1);
      node.body.push(stmt);
    }
    if (this.inModule) {
      for (var i = 0, list = Object.keys(this.undefinedExports); i < list.length; i += 1) {
        var name = list[i];
        this.raiseRecoverable(this.undefinedExports[name].start, "Export '" + name + "' is not defined");
      }
    }
    this.adaptDirectivePrologue(node.body);
    this.next();
    node.sourceType = this.options.sourceType === "commonjs" ? "script" : this.options.sourceType;
    return this.finishNode(node, "Program");
  };
  var loopLabel = { kind: "loop" };
  var switchLabel = { kind: "switch" };
  pp$8.isLet = function(context) {
    if (this.options.ecmaVersion < 6 || !this.isContextual("let")) {
      return false;
    }
    skipWhiteSpace.lastIndex = this.pos;
    var skip = skipWhiteSpace.exec(this.input);
    var next = this.pos + skip[0].length, nextCh = this.fullCharCodeAt(next);
    if (nextCh === 91 || nextCh === 92) {
      return true;
    }
    if (context) {
      return false;
    }
    if (nextCh === 123) {
      return true;
    }
    if (isIdentifierStart(nextCh)) {
      var start = next;
      do {
        next += nextCh <= 65535 ? 1 : 2;
      } while (isIdentifierChar(nextCh = this.fullCharCodeAt(next)));
      if (nextCh === 92) {
        return true;
      }
      var ident = this.input.slice(start, next);
      if (!keywordRelationalOperator.test(ident)) {
        return true;
      }
    }
    return false;
  };
  pp$8.isAsyncFunction = function() {
    if (this.options.ecmaVersion < 8 || !this.isContextual("async")) {
      return false;
    }
    skipWhiteSpace.lastIndex = this.pos;
    var skip = skipWhiteSpace.exec(this.input);
    var next = this.pos + skip[0].length, after;
    return !lineBreak.test(this.input.slice(this.pos, next)) && this.input.slice(next, next + 8) === "function" && (next + 8 === this.input.length || !(isIdentifierChar(after = this.fullCharCodeAt(next + 8)) || after === 92));
  };
  pp$8.isUsingKeyword = function(isAwaitUsing, isFor) {
    if (this.options.ecmaVersion < 17 || !this.isContextual(isAwaitUsing ? "await" : "using")) {
      return false;
    }
    skipWhiteSpace.lastIndex = this.pos;
    var skip = skipWhiteSpace.exec(this.input);
    var next = this.pos + skip[0].length;
    if (lineBreak.test(this.input.slice(this.pos, next))) {
      return false;
    }
    if (isAwaitUsing) {
      var usingEndPos = next + 5, after;
      if (this.input.slice(next, usingEndPos) !== "using" || usingEndPos === this.input.length || isIdentifierChar(after = this.fullCharCodeAt(usingEndPos)) || after === 92) {
        return false;
      }
      skipWhiteSpace.lastIndex = usingEndPos;
      var skipAfterUsing = skipWhiteSpace.exec(this.input);
      next = usingEndPos + skipAfterUsing[0].length;
      if (skipAfterUsing && lineBreak.test(this.input.slice(usingEndPos, next))) {
        return false;
      }
    }
    var ch2 = this.fullCharCodeAt(next);
    if (!isIdentifierStart(ch2) && ch2 !== 92) {
      return false;
    }
    var idStart = next;
    do {
      next += ch2 <= 65535 ? 1 : 2;
    } while (isIdentifierChar(ch2 = this.fullCharCodeAt(next)));
    if (ch2 === 92) {
      return true;
    }
    var id2 = this.input.slice(idStart, next);
    if (keywordRelationalOperator.test(id2)) {
      return false;
    }
    if (isFor && !isAwaitUsing && id2 === "of") {
      skipWhiteSpace.lastIndex = next;
      var skipAfterOf = skipWhiteSpace.exec(this.input);
      next = next + skipAfterOf[0].length;
      if (this.input.charCodeAt(next) !== 61 || // Check for ==, === and => operators
      (ch2 = this.input.charCodeAt(next + 1)) === 61 || ch2 === 62) {
        return false;
      }
    }
    return true;
  };
  pp$8.isAwaitUsing = function(isFor) {
    return this.isUsingKeyword(true, isFor);
  };
  pp$8.isUsing = function(isFor) {
    return this.isUsingKeyword(false, isFor);
  };
  pp$8.parseStatement = function(context, topLevel, exports$1) {
    var starttype = this.type, node = this.startNode(), kind;
    if (this.isLet(context)) {
      starttype = types$1._var;
      kind = "let";
    }
    switch (starttype) {
      case types$1._break:
      case types$1._continue:
        return this.parseBreakContinueStatement(node, starttype.keyword);
      case types$1._debugger:
        return this.parseDebuggerStatement(node);
      case types$1._do:
        return this.parseDoStatement(node);
      case types$1._for:
        return this.parseForStatement(node);
      case types$1._function:
        if (context && (this.strict || context !== "if" && context !== "label") && this.options.ecmaVersion >= 6) {
          this.unexpected();
        }
        return this.parseFunctionStatement(node, false, !context);
      case types$1._class:
        if (context) {
          this.unexpected();
        }
        return this.parseClass(node, true);
      case types$1._if:
        return this.parseIfStatement(node);
      case types$1._return:
        return this.parseReturnStatement(node);
      case types$1._switch:
        return this.parseSwitchStatement(node);
      case types$1._throw:
        return this.parseThrowStatement(node);
      case types$1._try:
        return this.parseTryStatement(node);
      case types$1._const:
      case types$1._var:
        kind = kind || this.value;
        if (context && kind !== "var") {
          this.unexpected();
        }
        return this.parseVarStatement(node, kind);
      case types$1._while:
        return this.parseWhileStatement(node);
      case types$1._with:
        return this.parseWithStatement(node);
      case types$1.braceL:
        return this.parseBlock(true, node);
      case types$1.semi:
        return this.parseEmptyStatement(node);
      case types$1._export:
      case types$1._import:
        if (this.options.ecmaVersion > 10 && starttype === types$1._import) {
          skipWhiteSpace.lastIndex = this.pos;
          var skip = skipWhiteSpace.exec(this.input);
          var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
          if (nextCh === 40 || nextCh === 46) {
            return this.parseExpressionStatement(node, this.parseExpression());
          }
        }
        if (!this.options.allowImportExportEverywhere) {
          if (!topLevel) {
            this.raise(this.start, "'import' and 'export' may only appear at the top level");
          }
          if (!this.inModule) {
            this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
          }
        }
        return starttype === types$1._import ? this.parseImport(node) : this.parseExport(node, exports$1);
      // If the statement does not start with a statement keyword or a
      // brace, it's an ExpressionStatement or LabeledStatement. We
      // simply start parsing an expression, and afterwards, if the
      // next token is a colon and the expression was a simple
      // Identifier node, we switch to interpreting it as a label.
      default:
        if (this.isAsyncFunction()) {
          if (context) {
            this.unexpected();
          }
          this.next();
          return this.parseFunctionStatement(node, true, !context);
        }
        var usingKind = this.isAwaitUsing(false) ? "await using" : this.isUsing(false) ? "using" : null;
        if (usingKind) {
          if (!this.allowUsing) {
            this.raise(this.start, "Using declaration cannot appear in the top level when source type is `script` or in the bare case statement");
          }
          if (context) {
            this.raise(this.start, "Using declaration is not allowed in single-statement positions");
          }
          if (usingKind === "await using") {
            if (!this.canAwait) {
              this.raise(this.start, "Await using cannot appear outside of async function");
            }
            this.next();
          }
          this.next();
          this.parseVar(node, false, usingKind);
          this.semicolon();
          return this.finishNode(node, "VariableDeclaration");
        }
        var maybeName = this.value, expr = this.parseExpression();
        if (starttype === types$1.name && expr.type === "Identifier" && this.eat(types$1.colon)) {
          return this.parseLabeledStatement(node, maybeName, expr, context);
        } else {
          return this.parseExpressionStatement(node, expr);
        }
    }
  };
  pp$8.parseBreakContinueStatement = function(node, keyword) {
    var isBreak = keyword === "break";
    this.next();
    if (this.eat(types$1.semi) || this.insertSemicolon()) {
      node.label = null;
    } else if (this.type !== types$1.name) {
      this.unexpected();
    } else {
      node.label = this.parseIdent();
      this.semicolon();
    }
    var i = 0;
    for (; i < this.labels.length; ++i) {
      var lab = this.labels[i];
      if (node.label == null || lab.name === node.label.name) {
        if (lab.kind != null && (isBreak || lab.kind === "loop")) {
          break;
        }
        if (node.label && isBreak) {
          break;
        }
      }
    }
    if (i === this.labels.length) {
      this.raise(node.start, "Unsyntactic " + keyword);
    }
    return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
  };
  pp$8.parseDebuggerStatement = function(node) {
    this.next();
    this.semicolon();
    return this.finishNode(node, "DebuggerStatement");
  };
  pp$8.parseDoStatement = function(node) {
    this.next();
    this.labels.push(loopLabel);
    node.body = this.parseStatement("do");
    this.labels.pop();
    this.expect(types$1._while);
    node.test = this.parseParenExpression();
    if (this.options.ecmaVersion >= 6) {
      this.eat(types$1.semi);
    } else {
      this.semicolon();
    }
    return this.finishNode(node, "DoWhileStatement");
  };
  pp$8.parseForStatement = function(node) {
    this.next();
    var awaitAt = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
    this.labels.push(loopLabel);
    this.enterScope(0);
    this.expect(types$1.parenL);
    if (this.type === types$1.semi) {
      if (awaitAt > -1) {
        this.unexpected(awaitAt);
      }
      return this.parseFor(node, null);
    }
    var isLet = this.isLet();
    if (this.type === types$1._var || this.type === types$1._const || isLet) {
      var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
      this.next();
      this.parseVar(init$1, true, kind);
      this.finishNode(init$1, "VariableDeclaration");
      return this.parseForAfterInit(node, init$1, awaitAt);
    }
    var startsWithLet = this.isContextual("let"), isForOf = false;
    var usingKind = this.isUsing(true) ? "using" : this.isAwaitUsing(true) ? "await using" : null;
    if (usingKind) {
      var init$2 = this.startNode();
      this.next();
      if (usingKind === "await using") {
        if (!this.canAwait) {
          this.raise(this.start, "Await using cannot appear outside of async function");
        }
        this.next();
      }
      this.parseVar(init$2, true, usingKind);
      this.finishNode(init$2, "VariableDeclaration");
      return this.parseForAfterInit(node, init$2, awaitAt);
    }
    var containsEsc = this.containsEsc;
    var refDestructuringErrors = new DestructuringErrors();
    var initPos = this.start;
    var init = awaitAt > -1 ? this.parseExprSubscripts(refDestructuringErrors, "await") : this.parseExpression(true, refDestructuringErrors);
    if (this.type === types$1._in || (isForOf = this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
      if (awaitAt > -1) {
        if (this.type === types$1._in) {
          this.unexpected(awaitAt);
        }
        node.await = true;
      } else if (isForOf && this.options.ecmaVersion >= 8) {
        if (init.start === initPos && !containsEsc && init.type === "Identifier" && init.name === "async") {
          this.unexpected();
        } else if (this.options.ecmaVersion >= 9) {
          node.await = false;
        }
      }
      if (startsWithLet && isForOf) {
        this.raise(init.start, "The left-hand side of a for-of loop may not start with 'let'.");
      }
      this.toAssignable(init, false, refDestructuringErrors);
      this.checkLValPattern(init);
      return this.parseForIn(node, init);
    } else {
      this.checkExpressionErrors(refDestructuringErrors, true);
    }
    if (awaitAt > -1) {
      this.unexpected(awaitAt);
    }
    return this.parseFor(node, init);
  };
  pp$8.parseForAfterInit = function(node, init, awaitAt) {
    if ((this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && init.declarations.length === 1) {
      if (this.type === types$1._in) {
        if ((init.kind === "using" || init.kind === "await using") && !init.declarations[0].init) {
          this.raise(this.start, "Using declaration is not allowed in for-in loops");
        }
        if (this.options.ecmaVersion >= 9 && awaitAt > -1) {
          this.unexpected(awaitAt);
        }
      } else if (this.options.ecmaVersion >= 9) {
        node.await = awaitAt > -1;
      }
      return this.parseForIn(node, init);
    }
    if (awaitAt > -1) {
      this.unexpected(awaitAt);
    }
    return this.parseFor(node, init);
  };
  pp$8.parseFunctionStatement = function(node, isAsync, declarationPosition) {
    this.next();
    return this.parseFunction(node, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), false, isAsync);
  };
  pp$8.parseIfStatement = function(node) {
    this.next();
    node.test = this.parseParenExpression();
    node.consequent = this.parseStatement("if");
    node.alternate = this.eat(types$1._else) ? this.parseStatement("if") : null;
    return this.finishNode(node, "IfStatement");
  };
  pp$8.parseReturnStatement = function(node) {
    if (!this.allowReturn) {
      this.raise(this.start, "'return' outside of function");
    }
    this.next();
    if (this.eat(types$1.semi) || this.insertSemicolon()) {
      node.argument = null;
    } else {
      node.argument = this.parseExpression();
      this.semicolon();
    }
    return this.finishNode(node, "ReturnStatement");
  };
  pp$8.parseSwitchStatement = function(node) {
    this.next();
    node.discriminant = this.parseParenExpression();
    node.cases = [];
    this.expect(types$1.braceL);
    this.labels.push(switchLabel);
    this.enterScope(SCOPE_SWITCH);
    var cur;
    for (var sawDefault = false; this.type !== types$1.braceR; ) {
      if (this.type === types$1._case || this.type === types$1._default) {
        var isCase = this.type === types$1._case;
        if (cur) {
          this.finishNode(cur, "SwitchCase");
        }
        node.cases.push(cur = this.startNode());
        cur.consequent = [];
        this.next();
        if (isCase) {
          cur.test = this.parseExpression();
        } else {
          if (sawDefault) {
            this.raiseRecoverable(this.lastTokStart, "Multiple default clauses");
          }
          sawDefault = true;
          cur.test = null;
        }
        this.expect(types$1.colon);
      } else {
        if (!cur) {
          this.unexpected();
        }
        cur.consequent.push(this.parseStatement(null));
      }
    }
    this.exitScope();
    if (cur) {
      this.finishNode(cur, "SwitchCase");
    }
    this.next();
    this.labels.pop();
    return this.finishNode(node, "SwitchStatement");
  };
  pp$8.parseThrowStatement = function(node) {
    this.next();
    if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) {
      this.raise(this.lastTokEnd, "Illegal newline after throw");
    }
    node.argument = this.parseExpression();
    this.semicolon();
    return this.finishNode(node, "ThrowStatement");
  };
  var empty$1 = [];
  pp$8.parseCatchClauseParam = function() {
    var param = this.parseBindingAtom();
    var simple = param.type === "Identifier";
    this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0);
    this.checkLValPattern(param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL);
    this.expect(types$1.parenR);
    return param;
  };
  pp$8.parseTryStatement = function(node) {
    this.next();
    node.block = this.parseBlock();
    node.handler = null;
    if (this.type === types$1._catch) {
      var clause = this.startNode();
      this.next();
      if (this.eat(types$1.parenL)) {
        clause.param = this.parseCatchClauseParam();
      } else {
        if (this.options.ecmaVersion < 10) {
          this.unexpected();
        }
        clause.param = null;
        this.enterScope(0);
      }
      clause.body = this.parseBlock(false);
      this.exitScope();
      node.handler = this.finishNode(clause, "CatchClause");
    }
    node.finalizer = this.eat(types$1._finally) ? this.parseBlock() : null;
    if (!node.handler && !node.finalizer) {
      this.raise(node.start, "Missing catch or finally clause");
    }
    return this.finishNode(node, "TryStatement");
  };
  pp$8.parseVarStatement = function(node, kind, allowMissingInitializer) {
    this.next();
    this.parseVar(node, false, kind, allowMissingInitializer);
    this.semicolon();
    return this.finishNode(node, "VariableDeclaration");
  };
  pp$8.parseWhileStatement = function(node) {
    this.next();
    node.test = this.parseParenExpression();
    this.labels.push(loopLabel);
    node.body = this.parseStatement("while");
    this.labels.pop();
    return this.finishNode(node, "WhileStatement");
  };
  pp$8.parseWithStatement = function(node) {
    if (this.strict) {
      this.raise(this.start, "'with' in strict mode");
    }
    this.next();
    node.object = this.parseParenExpression();
    node.body = this.parseStatement("with");
    return this.finishNode(node, "WithStatement");
  };
  pp$8.parseEmptyStatement = function(node) {
    this.next();
    return this.finishNode(node, "EmptyStatement");
  };
  pp$8.parseLabeledStatement = function(node, maybeName, expr, context) {
    for (var i$1 = 0, list = this.labels; i$1 < list.length; i$1 += 1) {
      var label = list[i$1];
      if (label.name === maybeName) {
        this.raise(expr.start, "Label '" + maybeName + "' is already declared");
      }
    }
    var kind = this.type.isLoop ? "loop" : this.type === types$1._switch ? "switch" : null;
    for (var i = this.labels.length - 1; i >= 0; i--) {
      var label$1 = this.labels[i];
      if (label$1.statementStart === node.start) {
        label$1.statementStart = this.start;
        label$1.kind = kind;
      } else {
        break;
      }
    }
    this.labels.push({ name: maybeName, kind, statementStart: this.start });
    node.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label");
    this.labels.pop();
    node.label = expr;
    return this.finishNode(node, "LabeledStatement");
  };
  pp$8.parseExpressionStatement = function(node, expr) {
    node.expression = expr;
    this.semicolon();
    return this.finishNode(node, "ExpressionStatement");
  };
  pp$8.parseBlock = function(createNewLexicalScope, node, exitStrict) {
    if (createNewLexicalScope === void 0) createNewLexicalScope = true;
    if (node === void 0) node = this.startNode();
    node.body = [];
    this.expect(types$1.braceL);
    if (createNewLexicalScope) {
      this.enterScope(0);
    }
    while (this.type !== types$1.braceR) {
      var stmt = this.parseStatement(null);
      node.body.push(stmt);
    }
    if (exitStrict) {
      this.strict = false;
    }
    this.next();
    if (createNewLexicalScope) {
      this.exitScope();
    }
    return this.finishNode(node, "BlockStatement");
  };
  pp$8.parseFor = function(node, init) {
    node.init = init;
    this.expect(types$1.semi);
    node.test = this.type === types$1.semi ? null : this.parseExpression();
    this.expect(types$1.semi);
    node.update = this.type === types$1.parenR ? null : this.parseExpression();
    this.expect(types$1.parenR);
    node.body = this.parseStatement("for");
    this.exitScope();
    this.labels.pop();
    return this.finishNode(node, "ForStatement");
  };
  pp$8.parseForIn = function(node, init) {
    var isForIn = this.type === types$1._in;
    this.next();
    if (init.type === "VariableDeclaration" && init.declarations[0].init != null && (!isForIn || this.options.ecmaVersion < 8 || this.strict || init.kind !== "var" || init.declarations[0].id.type !== "Identifier")) {
      this.raise(
        init.start,
        (isForIn ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"
      );
    }
    node.left = init;
    node.right = isForIn ? this.parseExpression() : this.parseMaybeAssign();
    this.expect(types$1.parenR);
    node.body = this.parseStatement("for");
    this.exitScope();
    this.labels.pop();
    return this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement");
  };
  pp$8.parseVar = function(node, isFor, kind, allowMissingInitializer) {
    node.declarations = [];
    node.kind = kind;
    for (; ; ) {
      var decl = this.startNode();
      this.parseVarId(decl, kind);
      if (this.eat(types$1.eq)) {
        decl.init = this.parseMaybeAssign(isFor);
      } else if (!allowMissingInitializer && kind === "const" && !(this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
        this.unexpected();
      } else if (!allowMissingInitializer && (kind === "using" || kind === "await using") && this.options.ecmaVersion >= 17 && this.type !== types$1._in && !this.isContextual("of")) {
        this.raise(this.lastTokEnd, "Missing initializer in " + kind + " declaration");
      } else if (!allowMissingInitializer && decl.id.type !== "Identifier" && !(isFor && (this.type === types$1._in || this.isContextual("of")))) {
        this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
      } else {
        decl.init = null;
      }
      node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
      if (!this.eat(types$1.comma)) {
        break;
      }
    }
    return node;
  };
  pp$8.parseVarId = function(decl, kind) {
    decl.id = kind === "using" || kind === "await using" ? this.parseIdent() : this.parseBindingAtom();
    this.checkLValPattern(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, false);
  };
  var FUNC_STATEMENT = 1;
  var FUNC_HANGING_STATEMENT = 2;
  var FUNC_NULLABLE_ID = 4;
  pp$8.parseFunction = function(node, statement, allowExpressionBody, isAsync, forInit) {
    this.initFunction(node);
    if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync) {
      if (this.type === types$1.star && statement & FUNC_HANGING_STATEMENT) {
        this.unexpected();
      }
      node.generator = this.eat(types$1.star);
    }
    if (this.options.ecmaVersion >= 8) {
      node.async = !!isAsync;
    }
    if (statement & FUNC_STATEMENT) {
      node.id = statement & FUNC_NULLABLE_ID && this.type !== types$1.name ? null : this.parseIdent();
      if (node.id && !(statement & FUNC_HANGING_STATEMENT)) {
        this.checkLValSimple(node.id, this.strict || node.generator || node.async ? this.treatFunctionsAsVar ? BIND_VAR : BIND_LEXICAL : BIND_FUNCTION);
      }
    }
    var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    this.enterScope(functionFlags(node.async, node.generator));
    if (!(statement & FUNC_STATEMENT)) {
      node.id = this.type === types$1.name ? this.parseIdent() : null;
    }
    this.parseFunctionParams(node);
    this.parseFunctionBody(node, allowExpressionBody, false, forInit);
    this.yieldPos = oldYieldPos;
    this.awaitPos = oldAwaitPos;
    this.awaitIdentPos = oldAwaitIdentPos;
    return this.finishNode(node, statement & FUNC_STATEMENT ? "FunctionDeclaration" : "FunctionExpression");
  };
  pp$8.parseFunctionParams = function(node) {
    this.expect(types$1.parenL);
    node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
    this.checkYieldAwaitInDefaultParams();
  };
  pp$8.parseClass = function(node, isStatement) {
    this.next();
    var oldStrict = this.strict;
    this.strict = true;
    this.parseClassId(node, isStatement);
    this.parseClassSuper(node);
    var privateNameMap = this.enterClassBody();
    var classBody = this.startNode();
    var hadConstructor = false;
    classBody.body = [];
    this.expect(types$1.braceL);
    while (this.type !== types$1.braceR) {
      var element = this.parseClassElement(node.superClass !== null);
      if (element) {
        classBody.body.push(element);
        if (element.type === "MethodDefinition" && element.kind === "constructor") {
          if (hadConstructor) {
            this.raiseRecoverable(element.start, "Duplicate constructor in the same class");
          }
          hadConstructor = true;
        } else if (element.key && element.key.type === "PrivateIdentifier" && isPrivateNameConflicted(privateNameMap, element)) {
          this.raiseRecoverable(element.key.start, "Identifier '#" + element.key.name + "' has already been declared");
        }
      }
    }
    this.strict = oldStrict;
    this.next();
    node.body = this.finishNode(classBody, "ClassBody");
    this.exitClassBody();
    return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
  };
  pp$8.parseClassElement = function(constructorAllowsSuper) {
    if (this.eat(types$1.semi)) {
      return null;
    }
    var ecmaVersion = this.options.ecmaVersion;
    var node = this.startNode();
    var keyName = "";
    var isGenerator = false;
    var isAsync = false;
    var kind = "method";
    var isStatic = false;
    if (this.eatContextual("static")) {
      if (ecmaVersion >= 13 && this.eat(types$1.braceL)) {
        this.parseClassStaticBlock(node);
        return node;
      }
      if (this.isClassElementNameStart() || this.type === types$1.star) {
        isStatic = true;
      } else {
        keyName = "static";
      }
    }
    node.static = isStatic;
    if (!keyName && ecmaVersion >= 8 && this.eatContextual("async")) {
      if ((this.isClassElementNameStart() || this.type === types$1.star) && !this.canInsertSemicolon()) {
        isAsync = true;
      } else {
        keyName = "async";
      }
    }
    if (!keyName && (ecmaVersion >= 9 || !isAsync) && this.eat(types$1.star)) {
      isGenerator = true;
    }
    if (!keyName && !isAsync && !isGenerator) {
      var lastValue = this.value;
      if (this.eatContextual("get") || this.eatContextual("set")) {
        if (this.isClassElementNameStart()) {
          kind = lastValue;
        } else {
          keyName = lastValue;
        }
      }
    }
    if (keyName) {
      node.computed = false;
      node.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc);
      node.key.name = keyName;
      this.finishNode(node.key, "Identifier");
    } else {
      this.parseClassElementName(node);
    }
    if (ecmaVersion < 13 || this.type === types$1.parenL || kind !== "method" || isGenerator || isAsync) {
      var isConstructor = !node.static && checkKeyName(node, "constructor");
      var allowsDirectSuper = isConstructor && constructorAllowsSuper;
      if (isConstructor && kind !== "method") {
        this.raise(node.key.start, "Constructor can't have get/set modifier");
      }
      node.kind = isConstructor ? "constructor" : kind;
      this.parseClassMethod(node, isGenerator, isAsync, allowsDirectSuper);
    } else {
      this.parseClassField(node);
    }
    return node;
  };
  pp$8.isClassElementNameStart = function() {
    return this.type === types$1.name || this.type === types$1.privateId || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword;
  };
  pp$8.parseClassElementName = function(element) {
    if (this.type === types$1.privateId) {
      if (this.value === "constructor") {
        this.raise(this.start, "Classes can't have an element named '#constructor'");
      }
      element.computed = false;
      element.key = this.parsePrivateIdent();
    } else {
      this.parsePropertyName(element);
    }
  };
  pp$8.parseClassMethod = function(method, isGenerator, isAsync, allowsDirectSuper) {
    var key = method.key;
    if (method.kind === "constructor") {
      if (isGenerator) {
        this.raise(key.start, "Constructor can't be a generator");
      }
      if (isAsync) {
        this.raise(key.start, "Constructor can't be an async method");
      }
    } else if (method.static && checkKeyName(method, "prototype")) {
      this.raise(key.start, "Classes may not have a static property named prototype");
    }
    var value = method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);
    if (method.kind === "get" && value.params.length !== 0) {
      this.raiseRecoverable(value.start, "getter should have no params");
    }
    if (method.kind === "set" && value.params.length !== 1) {
      this.raiseRecoverable(value.start, "setter should have exactly one param");
    }
    if (method.kind === "set" && value.params[0].type === "RestElement") {
      this.raiseRecoverable(value.params[0].start, "Setter cannot use rest params");
    }
    return this.finishNode(method, "MethodDefinition");
  };
  pp$8.parseClassField = function(field) {
    if (checkKeyName(field, "constructor")) {
      this.raise(field.key.start, "Classes can't have a field named 'constructor'");
    } else if (field.static && checkKeyName(field, "prototype")) {
      this.raise(field.key.start, "Classes can't have a static field named 'prototype'");
    }
    if (this.eat(types$1.eq)) {
      this.enterScope(SCOPE_CLASS_FIELD_INIT | SCOPE_SUPER);
      field.value = this.parseMaybeAssign();
      this.exitScope();
    } else {
      field.value = null;
    }
    this.semicolon();
    return this.finishNode(field, "PropertyDefinition");
  };
  pp$8.parseClassStaticBlock = function(node) {
    node.body = [];
    var oldLabels = this.labels;
    this.labels = [];
    this.enterScope(SCOPE_CLASS_STATIC_BLOCK | SCOPE_SUPER);
    while (this.type !== types$1.braceR) {
      var stmt = this.parseStatement(null);
      node.body.push(stmt);
    }
    this.next();
    this.exitScope();
    this.labels = oldLabels;
    return this.finishNode(node, "StaticBlock");
  };
  pp$8.parseClassId = function(node, isStatement) {
    if (this.type === types$1.name) {
      node.id = this.parseIdent();
      if (isStatement) {
        this.checkLValSimple(node.id, BIND_LEXICAL, false);
      }
    } else {
      if (isStatement === true) {
        this.unexpected();
      }
      node.id = null;
    }
  };
  pp$8.parseClassSuper = function(node) {
    node.superClass = this.eat(types$1._extends) ? this.parseExprSubscripts(null, false) : null;
  };
  pp$8.enterClassBody = function() {
    var element = { declared: /* @__PURE__ */ Object.create(null), used: [] };
    this.privateNameStack.push(element);
    return element.declared;
  };
  pp$8.exitClassBody = function() {
    var ref2 = this.privateNameStack.pop();
    var declared = ref2.declared;
    var used = ref2.used;
    if (!this.options.checkPrivateFields) {
      return;
    }
    var len = this.privateNameStack.length;
    var parent = len === 0 ? null : this.privateNameStack[len - 1];
    for (var i = 0; i < used.length; ++i) {
      var id2 = used[i];
      if (!hasOwn(declared, id2.name)) {
        if (parent) {
          parent.used.push(id2);
        } else {
          this.raiseRecoverable(id2.start, "Private field '#" + id2.name + "' must be declared in an enclosing class");
        }
      }
    }
  };
  function isPrivateNameConflicted(privateNameMap, element) {
    var name = element.key.name;
    var curr = privateNameMap[name];
    var next = "true";
    if (element.type === "MethodDefinition" && (element.kind === "get" || element.kind === "set")) {
      next = (element.static ? "s" : "i") + element.kind;
    }
    if (curr === "iget" && next === "iset" || curr === "iset" && next === "iget" || curr === "sget" && next === "sset" || curr === "sset" && next === "sget") {
      privateNameMap[name] = "true";
      return false;
    } else if (!curr) {
      privateNameMap[name] = next;
      return false;
    } else {
      return true;
    }
  }
  function checkKeyName(node, name) {
    var computed = node.computed;
    var key = node.key;
    return !computed && (key.type === "Identifier" && key.name === name || key.type === "Literal" && key.value === name);
  }
  pp$8.parseExportAllDeclaration = function(node, exports$1) {
    if (this.options.ecmaVersion >= 11) {
      if (this.eatContextual("as")) {
        node.exported = this.parseModuleExportName();
        this.checkExport(exports$1, node.exported, this.lastTokStart);
      } else {
        node.exported = null;
      }
    }
    this.expectContextual("from");
    if (this.type !== types$1.string) {
      this.unexpected();
    }
    node.source = this.parseExprAtom();
    if (this.options.ecmaVersion >= 16) {
      node.attributes = this.parseWithClause();
    }
    this.semicolon();
    return this.finishNode(node, "ExportAllDeclaration");
  };
  pp$8.parseExport = function(node, exports$1) {
    this.next();
    if (this.eat(types$1.star)) {
      return this.parseExportAllDeclaration(node, exports$1);
    }
    if (this.eat(types$1._default)) {
      this.checkExport(exports$1, "default", this.lastTokStart);
      node.declaration = this.parseExportDefaultDeclaration();
      return this.finishNode(node, "ExportDefaultDeclaration");
    }
    if (this.shouldParseExportStatement()) {
      node.declaration = this.parseExportDeclaration(node);
      if (node.declaration.type === "VariableDeclaration") {
        this.checkVariableExport(exports$1, node.declaration.declarations);
      } else {
        this.checkExport(exports$1, node.declaration.id, node.declaration.id.start);
      }
      node.specifiers = [];
      node.source = null;
      if (this.options.ecmaVersion >= 16) {
        node.attributes = [];
      }
    } else {
      node.declaration = null;
      node.specifiers = this.parseExportSpecifiers(exports$1);
      if (this.eatContextual("from")) {
        if (this.type !== types$1.string) {
          this.unexpected();
        }
        node.source = this.parseExprAtom();
        if (this.options.ecmaVersion >= 16) {
          node.attributes = this.parseWithClause();
        }
      } else {
        for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
          var spec = list[i];
          this.checkUnreserved(spec.local);
          this.checkLocalExport(spec.local);
          if (spec.local.type === "Literal") {
            this.raise(spec.local.start, "A string literal cannot be used as an exported binding without `from`.");
          }
        }
        node.source = null;
        if (this.options.ecmaVersion >= 16) {
          node.attributes = [];
        }
      }
      this.semicolon();
    }
    return this.finishNode(node, "ExportNamedDeclaration");
  };
  pp$8.parseExportDeclaration = function(node) {
    return this.parseStatement(null);
  };
  pp$8.parseExportDefaultDeclaration = function() {
    var isAsync;
    if (this.type === types$1._function || (isAsync = this.isAsyncFunction())) {
      var fNode = this.startNode();
      this.next();
      if (isAsync) {
        this.next();
      }
      return this.parseFunction(fNode, FUNC_STATEMENT | FUNC_NULLABLE_ID, false, isAsync);
    } else if (this.type === types$1._class) {
      var cNode = this.startNode();
      return this.parseClass(cNode, "nullableID");
    } else {
      var declaration = this.parseMaybeAssign();
      this.semicolon();
      return declaration;
    }
  };
  pp$8.checkExport = function(exports$1, name, pos) {
    if (!exports$1) {
      return;
    }
    if (typeof name !== "string") {
      name = name.type === "Identifier" ? name.name : name.value;
    }
    if (hasOwn(exports$1, name)) {
      this.raiseRecoverable(pos, "Duplicate export '" + name + "'");
    }
    exports$1[name] = true;
  };
  pp$8.checkPatternExport = function(exports$1, pat) {
    var type = pat.type;
    if (type === "Identifier") {
      this.checkExport(exports$1, pat, pat.start);
    } else if (type === "ObjectPattern") {
      for (var i = 0, list = pat.properties; i < list.length; i += 1) {
        var prop = list[i];
        this.checkPatternExport(exports$1, prop);
      }
    } else if (type === "ArrayPattern") {
      for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
        var elt = list$1[i$1];
        if (elt) {
          this.checkPatternExport(exports$1, elt);
        }
      }
    } else if (type === "Property") {
      this.checkPatternExport(exports$1, pat.value);
    } else if (type === "AssignmentPattern") {
      this.checkPatternExport(exports$1, pat.left);
    } else if (type === "RestElement") {
      this.checkPatternExport(exports$1, pat.argument);
    }
  };
  pp$8.checkVariableExport = function(exports$1, decls) {
    if (!exports$1) {
      return;
    }
    for (var i = 0, list = decls; i < list.length; i += 1) {
      var decl = list[i];
      this.checkPatternExport(exports$1, decl.id);
    }
  };
  pp$8.shouldParseExportStatement = function() {
    return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
  };
  pp$8.parseExportSpecifier = function(exports$1) {
    var node = this.startNode();
    node.local = this.parseModuleExportName();
    node.exported = this.eatContextual("as") ? this.parseModuleExportName() : node.local;
    this.checkExport(
      exports$1,
      node.exported,
      node.exported.start
    );
    return this.finishNode(node, "ExportSpecifier");
  };
  pp$8.parseExportSpecifiers = function(exports$1) {
    var nodes = [], first = true;
    this.expect(types$1.braceL);
    while (!this.eat(types$1.braceR)) {
      if (!first) {
        this.expect(types$1.comma);
        if (this.afterTrailingComma(types$1.braceR)) {
          break;
        }
      } else {
        first = false;
      }
      nodes.push(this.parseExportSpecifier(exports$1));
    }
    return nodes;
  };
  pp$8.parseImport = function(node) {
    this.next();
    if (this.type === types$1.string) {
      node.specifiers = empty$1;
      node.source = this.parseExprAtom();
    } else {
      node.specifiers = this.parseImportSpecifiers();
      this.expectContextual("from");
      node.source = this.type === types$1.string ? this.parseExprAtom() : this.unexpected();
    }
    if (this.options.ecmaVersion >= 16) {
      node.attributes = this.parseWithClause();
    }
    this.semicolon();
    return this.finishNode(node, "ImportDeclaration");
  };
  pp$8.parseImportSpecifier = function() {
    var node = this.startNode();
    node.imported = this.parseModuleExportName();
    if (this.eatContextual("as")) {
      node.local = this.parseIdent();
    } else {
      this.checkUnreserved(node.imported);
      node.local = node.imported;
    }
    this.checkLValSimple(node.local, BIND_LEXICAL);
    return this.finishNode(node, "ImportSpecifier");
  };
  pp$8.parseImportDefaultSpecifier = function() {
    var node = this.startNode();
    node.local = this.parseIdent();
    this.checkLValSimple(node.local, BIND_LEXICAL);
    return this.finishNode(node, "ImportDefaultSpecifier");
  };
  pp$8.parseImportNamespaceSpecifier = function() {
    var node = this.startNode();
    this.next();
    this.expectContextual("as");
    node.local = this.parseIdent();
    this.checkLValSimple(node.local, BIND_LEXICAL);
    return this.finishNode(node, "ImportNamespaceSpecifier");
  };
  pp$8.parseImportSpecifiers = function() {
    var nodes = [], first = true;
    if (this.type === types$1.name) {
      nodes.push(this.parseImportDefaultSpecifier());
      if (!this.eat(types$1.comma)) {
        return nodes;
      }
    }
    if (this.type === types$1.star) {
      nodes.push(this.parseImportNamespaceSpecifier());
      return nodes;
    }
    this.expect(types$1.braceL);
    while (!this.eat(types$1.braceR)) {
      if (!first) {
        this.expect(types$1.comma);
        if (this.afterTrailingComma(types$1.braceR)) {
          break;
        }
      } else {
        first = false;
      }
      nodes.push(this.parseImportSpecifier());
    }
    return nodes;
  };
  pp$8.parseWithClause = function() {
    var nodes = [];
    if (!this.eat(types$1._with)) {
      return nodes;
    }
    this.expect(types$1.braceL);
    var attributeKeys = {};
    var first = true;
    while (!this.eat(types$1.braceR)) {
      if (!first) {
        this.expect(types$1.comma);
        if (this.afterTrailingComma(types$1.braceR)) {
          break;
        }
      } else {
        first = false;
      }
      var attr = this.parseImportAttribute();
      var keyName = attr.key.type === "Identifier" ? attr.key.name : attr.key.value;
      if (hasOwn(attributeKeys, keyName)) {
        this.raiseRecoverable(attr.key.start, "Duplicate attribute key '" + keyName + "'");
      }
      attributeKeys[keyName] = true;
      nodes.push(attr);
    }
    return nodes;
  };
  pp$8.parseImportAttribute = function() {
    var node = this.startNode();
    node.key = this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
    this.expect(types$1.colon);
    if (this.type !== types$1.string) {
      this.unexpected();
    }
    node.value = this.parseExprAtom();
    return this.finishNode(node, "ImportAttribute");
  };
  pp$8.parseModuleExportName = function() {
    if (this.options.ecmaVersion >= 13 && this.type === types$1.string) {
      var stringLiteral = this.parseLiteral(this.value);
      if (loneSurrogate.test(stringLiteral.value)) {
        this.raise(stringLiteral.start, "An export name cannot include a lone surrogate.");
      }
      return stringLiteral;
    }
    return this.parseIdent(true);
  };
  pp$8.adaptDirectivePrologue = function(statements) {
    for (var i = 0; i < statements.length && this.isDirectiveCandidate(statements[i]); ++i) {
      statements[i].directive = statements[i].expression.raw.slice(1, -1);
    }
  };
  pp$8.isDirectiveCandidate = function(statement) {
    return this.options.ecmaVersion >= 5 && statement.type === "ExpressionStatement" && statement.expression.type === "Literal" && typeof statement.expression.value === "string" && // Reject parenthesized strings.
    (this.input[statement.start] === '"' || this.input[statement.start] === "'");
  };
  var pp$7 = Parser.prototype;
  pp$7.toAssignable = function(node, isBinding, refDestructuringErrors) {
    if (this.options.ecmaVersion >= 6 && node) {
      switch (node.type) {
        case "Identifier":
          if (this.inAsync && node.name === "await") {
            this.raise(node.start, "Cannot use 'await' as identifier inside an async function");
          }
          break;
        case "ObjectPattern":
        case "ArrayPattern":
        case "AssignmentPattern":
        case "RestElement":
          break;
        case "ObjectExpression":
          node.type = "ObjectPattern";
          if (refDestructuringErrors) {
            this.checkPatternErrors(refDestructuringErrors, true);
          }
          for (var i = 0, list = node.properties; i < list.length; i += 1) {
            var prop = list[i];
            this.toAssignable(prop, isBinding);
            if (prop.type === "RestElement" && (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern")) {
              this.raise(prop.argument.start, "Unexpected token");
            }
          }
          break;
        case "Property":
          if (node.kind !== "init") {
            this.raise(node.key.start, "Object pattern can't contain getter or setter");
          }
          this.toAssignable(node.value, isBinding);
          break;
        case "ArrayExpression":
          node.type = "ArrayPattern";
          if (refDestructuringErrors) {
            this.checkPatternErrors(refDestructuringErrors, true);
          }
          this.toAssignableList(node.elements, isBinding);
          break;
        case "SpreadElement":
          node.type = "RestElement";
          this.toAssignable(node.argument, isBinding);
          if (node.argument.type === "AssignmentPattern") {
            this.raise(node.argument.start, "Rest elements cannot have a default value");
          }
          break;
        case "AssignmentExpression":
          if (node.operator !== "=") {
            this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
          }
          node.type = "AssignmentPattern";
          delete node.operator;
          this.toAssignable(node.left, isBinding);
          break;
        case "ParenthesizedExpression":
          this.toAssignable(node.expression, isBinding, refDestructuringErrors);
          break;
        case "ChainExpression":
          this.raiseRecoverable(node.start, "Optional chaining cannot appear in left-hand side");
          break;
        case "MemberExpression":
          if (!isBinding) {
            break;
          }
        default:
          this.raise(node.start, "Assigning to rvalue");
      }
    } else if (refDestructuringErrors) {
      this.checkPatternErrors(refDestructuringErrors, true);
    }
    return node;
  };
  pp$7.toAssignableList = function(exprList, isBinding) {
    var end = exprList.length;
    for (var i = 0; i < end; i++) {
      var elt = exprList[i];
      if (elt) {
        this.toAssignable(elt, isBinding);
      }
    }
    if (end) {
      var last = exprList[end - 1];
      if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier") {
        this.unexpected(last.argument.start);
      }
    }
    return exprList;
  };
  pp$7.parseSpread = function(refDestructuringErrors) {
    var node = this.startNode();
    this.next();
    node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
    return this.finishNode(node, "SpreadElement");
  };
  pp$7.parseRestBinding = function() {
    var node = this.startNode();
    this.next();
    if (this.options.ecmaVersion === 6 && this.type !== types$1.name) {
      this.unexpected();
    }
    node.argument = this.parseBindingAtom();
    return this.finishNode(node, "RestElement");
  };
  pp$7.parseBindingAtom = function() {
    if (this.options.ecmaVersion >= 6) {
      switch (this.type) {
        case types$1.bracketL:
          var node = this.startNode();
          this.next();
          node.elements = this.parseBindingList(types$1.bracketR, true, true);
          return this.finishNode(node, "ArrayPattern");
        case types$1.braceL:
          return this.parseObj(true);
      }
    }
    return this.parseIdent();
  };
  pp$7.parseBindingList = function(close, allowEmpty, allowTrailingComma, allowModifiers) {
    var elts = [], first = true;
    while (!this.eat(close)) {
      if (first) {
        first = false;
      } else {
        this.expect(types$1.comma);
      }
      if (allowEmpty && this.type === types$1.comma) {
        elts.push(null);
      } else if (allowTrailingComma && this.afterTrailingComma(close)) {
        break;
      } else if (this.type === types$1.ellipsis) {
        var rest = this.parseRestBinding();
        this.parseBindingListItem(rest);
        elts.push(rest);
        if (this.type === types$1.comma) {
          this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
        }
        this.expect(close);
        break;
      } else {
        elts.push(this.parseAssignableListItem(allowModifiers));
      }
    }
    return elts;
  };
  pp$7.parseAssignableListItem = function(allowModifiers) {
    var elem = this.parseMaybeDefault(this.start, this.startLoc);
    this.parseBindingListItem(elem);
    return elem;
  };
  pp$7.parseBindingListItem = function(param) {
    return param;
  };
  pp$7.parseMaybeDefault = function(startPos, startLoc, left) {
    left = left || this.parseBindingAtom();
    if (this.options.ecmaVersion < 6 || !this.eat(types$1.eq)) {
      return left;
    }
    var node = this.startNodeAt(startPos, startLoc);
    node.left = left;
    node.right = this.parseMaybeAssign();
    return this.finishNode(node, "AssignmentPattern");
  };
  pp$7.checkLValSimple = function(expr, bindingType, checkClashes) {
    if (bindingType === void 0) bindingType = BIND_NONE;
    var isBind = bindingType !== BIND_NONE;
    switch (expr.type) {
      case "Identifier":
        if (this.strict && this.reservedWordsStrictBind.test(expr.name)) {
          this.raiseRecoverable(expr.start, (isBind ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
        }
        if (isBind) {
          if (bindingType === BIND_LEXICAL && expr.name === "let") {
            this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name");
          }
          if (checkClashes) {
            if (hasOwn(checkClashes, expr.name)) {
              this.raiseRecoverable(expr.start, "Argument name clash");
            }
            checkClashes[expr.name] = true;
          }
          if (bindingType !== BIND_OUTSIDE) {
            this.declareName(expr.name, bindingType, expr.start);
          }
        }
        break;
      case "ChainExpression":
        this.raiseRecoverable(expr.start, "Optional chaining cannot appear in left-hand side");
        break;
      case "MemberExpression":
        if (isBind) {
          this.raiseRecoverable(expr.start, "Binding member expression");
        }
        break;
      case "ParenthesizedExpression":
        if (isBind) {
          this.raiseRecoverable(expr.start, "Binding parenthesized expression");
        }
        return this.checkLValSimple(expr.expression, bindingType, checkClashes);
      default:
        this.raise(expr.start, (isBind ? "Binding" : "Assigning to") + " rvalue");
    }
  };
  pp$7.checkLValPattern = function(expr, bindingType, checkClashes) {
    if (bindingType === void 0) bindingType = BIND_NONE;
    switch (expr.type) {
      case "ObjectPattern":
        for (var i = 0, list = expr.properties; i < list.length; i += 1) {
          var prop = list[i];
          this.checkLValInnerPattern(prop, bindingType, checkClashes);
        }
        break;
      case "ArrayPattern":
        for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
          var elem = list$1[i$1];
          if (elem) {
            this.checkLValInnerPattern(elem, bindingType, checkClashes);
          }
        }
        break;
      default:
        this.checkLValSimple(expr, bindingType, checkClashes);
    }
  };
  pp$7.checkLValInnerPattern = function(expr, bindingType, checkClashes) {
    if (bindingType === void 0) bindingType = BIND_NONE;
    switch (expr.type) {
      case "Property":
        this.checkLValInnerPattern(expr.value, bindingType, checkClashes);
        break;
      case "AssignmentPattern":
        this.checkLValPattern(expr.left, bindingType, checkClashes);
        break;
      case "RestElement":
        this.checkLValPattern(expr.argument, bindingType, checkClashes);
        break;
      default:
        this.checkLValPattern(expr, bindingType, checkClashes);
    }
  };
  var TokContext = function TokContext2(token, isExpr, preserveSpace, override, generator) {
    this.token = token;
    this.isExpr = !!isExpr;
    this.preserveSpace = !!preserveSpace;
    this.override = override;
    this.generator = !!generator;
  };
  var types = {
    b_stat: new TokContext("{", false),
    b_expr: new TokContext("{", true),
    b_tmpl: new TokContext("${", false),
    p_stat: new TokContext("(", false),
    p_expr: new TokContext("(", true),
    q_tmpl: new TokContext("`", true, true, function(p) {
      return p.tryReadTemplateToken();
    }),
    f_stat: new TokContext("function", false),
    f_expr: new TokContext("function", true),
    f_expr_gen: new TokContext("function", true, false, null, true),
    f_gen: new TokContext("function", false, false, null, true)
  };
  var pp$6 = Parser.prototype;
  pp$6.initialContext = function() {
    return [types.b_stat];
  };
  pp$6.curContext = function() {
    return this.context[this.context.length - 1];
  };
  pp$6.braceIsBlock = function(prevType) {
    var parent = this.curContext();
    if (parent === types.f_expr || parent === types.f_stat) {
      return true;
    }
    if (prevType === types$1.colon && (parent === types.b_stat || parent === types.b_expr)) {
      return !parent.isExpr;
    }
    if (prevType === types$1._return || prevType === types$1.name && this.exprAllowed) {
      return lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
    }
    if (prevType === types$1._else || prevType === types$1.semi || prevType === types$1.eof || prevType === types$1.parenR || prevType === types$1.arrow) {
      return true;
    }
    if (prevType === types$1.braceL) {
      return parent === types.b_stat;
    }
    if (prevType === types$1._var || prevType === types$1._const || prevType === types$1.name) {
      return false;
    }
    return !this.exprAllowed;
  };
  pp$6.inGeneratorContext = function() {
    for (var i = this.context.length - 1; i >= 1; i--) {
      var context = this.context[i];
      if (context.token === "function") {
        return context.generator;
      }
    }
    return false;
  };
  pp$6.updateContext = function(prevType) {
    var update, type = this.type;
    if (type.keyword && prevType === types$1.dot) {
      this.exprAllowed = false;
    } else if (update = type.updateContext) {
      update.call(this, prevType);
    } else {
      this.exprAllowed = type.beforeExpr;
    }
  };
  pp$6.overrideContext = function(tokenCtx) {
    if (this.curContext() !== tokenCtx) {
      this.context[this.context.length - 1] = tokenCtx;
    }
  };
  types$1.parenR.updateContext = types$1.braceR.updateContext = function() {
    if (this.context.length === 1) {
      this.exprAllowed = true;
      return;
    }
    var out = this.context.pop();
    if (out === types.b_stat && this.curContext().token === "function") {
      out = this.context.pop();
    }
    this.exprAllowed = !out.isExpr;
  };
  types$1.braceL.updateContext = function(prevType) {
    this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr);
    this.exprAllowed = true;
  };
  types$1.dollarBraceL.updateContext = function() {
    this.context.push(types.b_tmpl);
    this.exprAllowed = true;
  };
  types$1.parenL.updateContext = function(prevType) {
    var statementParens = prevType === types$1._if || prevType === types$1._for || prevType === types$1._with || prevType === types$1._while;
    this.context.push(statementParens ? types.p_stat : types.p_expr);
    this.exprAllowed = true;
  };
  types$1.incDec.updateContext = function() {
  };
  types$1._function.updateContext = types$1._class.updateContext = function(prevType) {
    if (prevType.beforeExpr && prevType !== types$1._else && !(prevType === types$1.semi && this.curContext() !== types.p_stat) && !(prevType === types$1._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) && !((prevType === types$1.colon || prevType === types$1.braceL) && this.curContext() === types.b_stat)) {
      this.context.push(types.f_expr);
    } else {
      this.context.push(types.f_stat);
    }
    this.exprAllowed = false;
  };
  types$1.colon.updateContext = function() {
    if (this.curContext().token === "function") {
      this.context.pop();
    }
    this.exprAllowed = true;
  };
  types$1.backQuote.updateContext = function() {
    if (this.curContext() === types.q_tmpl) {
      this.context.pop();
    } else {
      this.context.push(types.q_tmpl);
    }
    this.exprAllowed = false;
  };
  types$1.star.updateContext = function(prevType) {
    if (prevType === types$1._function) {
      var index = this.context.length - 1;
      if (this.context[index] === types.f_expr) {
        this.context[index] = types.f_expr_gen;
      } else {
        this.context[index] = types.f_gen;
      }
    }
    this.exprAllowed = true;
  };
  types$1.name.updateContext = function(prevType) {
    var allowed = false;
    if (this.options.ecmaVersion >= 6 && prevType !== types$1.dot) {
      if (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) {
        allowed = true;
      }
    }
    this.exprAllowed = allowed;
  };
  var pp$5 = Parser.prototype;
  pp$5.checkPropClash = function(prop, propHash, refDestructuringErrors) {
    if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement") {
      return;
    }
    if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand)) {
      return;
    }
    var key = prop.key;
    var name;
    switch (key.type) {
      case "Identifier":
        name = key.name;
        break;
      case "Literal":
        name = String(key.value);
        break;
      default:
        return;
    }
    var kind = prop.kind;
    if (this.options.ecmaVersion >= 6) {
      if (name === "__proto__" && kind === "init") {
        if (propHash.proto) {
          if (refDestructuringErrors) {
            if (refDestructuringErrors.doubleProto < 0) {
              refDestructuringErrors.doubleProto = key.start;
            }
          } else {
            this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
          }
        }
        propHash.proto = true;
      }
      return;
    }
    name = "$" + name;
    var other = propHash[name];
    if (other) {
      var redefinition;
      if (kind === "init") {
        redefinition = this.strict && other.init || other.get || other.set;
      } else {
        redefinition = other.init || other[kind];
      }
      if (redefinition) {
        this.raiseRecoverable(key.start, "Redefinition of property");
      }
    } else {
      other = propHash[name] = {
        init: false,
        get: false,
        set: false
      };
    }
    other[kind] = true;
  };
  pp$5.parseExpression = function(forInit, refDestructuringErrors) {
    var this$1$1 = this;
    return this.catchStackOverflow(function() {
      var startPos = this$1$1.start, startLoc = this$1$1.startLoc;
      var expr = this$1$1.parseMaybeAssign(forInit, refDestructuringErrors);
      if (this$1$1.type === types$1.comma) {
        var node = this$1$1.startNodeAt(startPos, startLoc);
        node.expressions = [expr];
        while (this$1$1.eat(types$1.comma)) {
          node.expressions.push(this$1$1.parseMaybeAssign(forInit, refDestructuringErrors));
        }
        return this$1$1.finishNode(node, "SequenceExpression");
      }
      return expr;
    });
  };
  pp$5.parseMaybeAssign = function(forInit, refDestructuringErrors, afterLeftParse) {
    if (this.isContextual("yield")) {
      if (this.inGenerator) {
        return this.parseYield(forInit);
      } else {
        this.exprAllowed = false;
      }
    }
    var ownDestructuringErrors = false, oldParenAssign = -1, oldTrailingComma = -1, oldDoubleProto = -1;
    if (refDestructuringErrors) {
      oldParenAssign = refDestructuringErrors.parenthesizedAssign;
      oldTrailingComma = refDestructuringErrors.trailingComma;
      oldDoubleProto = refDestructuringErrors.doubleProto;
      refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
    } else {
      refDestructuringErrors = new DestructuringErrors();
      ownDestructuringErrors = true;
    }
    var startPos = this.start, startLoc = this.startLoc;
    if (this.type === types$1.parenL || this.type === types$1.name) {
      this.potentialArrowAt = this.start;
      this.potentialArrowInForAwait = forInit === "await";
    }
    var left = this.parseMaybeConditional(forInit, refDestructuringErrors);
    if (afterLeftParse) {
      left = afterLeftParse.call(this, left, startPos, startLoc);
    }
    if (this.type.isAssign) {
      var node = this.startNodeAt(startPos, startLoc);
      node.operator = this.value;
      if (this.type === types$1.eq) {
        left = this.toAssignable(left, false, refDestructuringErrors);
      }
      if (!ownDestructuringErrors) {
        refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
        if (refDestructuringErrors.shorthandAssign >= left.start) {
          refDestructuringErrors.shorthandAssign = -1;
        }
        if (refDestructuringErrors.doubleProto >= left.start) {
          refDestructuringErrors.doubleProto = -1;
        }
      }
      if (this.type === types$1.eq) {
        this.checkLValPattern(left);
      } else {
        this.checkLValSimple(left);
      }
      node.left = left;
      this.next();
      node.right = this.parseMaybeAssign(forInit);
      if (oldDoubleProto > -1) {
        refDestructuringErrors.doubleProto = oldDoubleProto;
      }
      return this.finishNode(node, "AssignmentExpression");
    } else {
      if (ownDestructuringErrors) {
        this.checkExpressionErrors(refDestructuringErrors, true);
      }
    }
    if (oldParenAssign > -1) {
      refDestructuringErrors.parenthesizedAssign = oldParenAssign;
    }
    if (oldTrailingComma > -1) {
      refDestructuringErrors.trailingComma = oldTrailingComma;
    }
    return left;
  };
  pp$5.parseMaybeConditional = function(forInit, refDestructuringErrors) {
    var startPos = this.start, startLoc = this.startLoc;
    var expr = this.parseExprOps(forInit, refDestructuringErrors);
    if (this.checkExpressionErrors(refDestructuringErrors)) {
      return expr;
    }
    if (!(expr.type === "ArrowFunctionExpression" && expr.start === startPos) && this.eat(types$1.question)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.test = expr;
      node.consequent = this.parseMaybeAssign();
      this.expect(types$1.colon);
      node.alternate = this.parseMaybeAssign(forInit);
      return this.finishNode(node, "ConditionalExpression");
    }
    return expr;
  };
  pp$5.parseExprOps = function(forInit, refDestructuringErrors) {
    var startPos = this.start, startLoc = this.startLoc;
    var expr = this.parseMaybeUnary(refDestructuringErrors, false, false, forInit);
    if (this.checkExpressionErrors(refDestructuringErrors)) {
      return expr;
    }
    return expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, forInit);
  };
  pp$5.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, forInit) {
    var prec = this.type.binop;
    if (prec != null && (!forInit || this.type !== types$1._in)) {
      if (prec > minPrec) {
        var logical = this.type === types$1.logicalOR || this.type === types$1.logicalAND;
        var coalesce = this.type === types$1.coalesce;
        if (coalesce) {
          prec = types$1.logicalAND.binop;
        }
        var op2 = this.value;
        this.next();
        var startPos = this.start, startLoc = this.startLoc;
        var right = this.parseExprOp(this.parseMaybeUnary(null, false, false, forInit), startPos, startLoc, prec, forInit);
        var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op2, logical || coalesce);
        if (logical && this.type === types$1.coalesce || coalesce && (this.type === types$1.logicalOR || this.type === types$1.logicalAND)) {
          this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses");
        }
        return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, forInit);
      }
    }
    return left;
  };
  pp$5.buildBinary = function(startPos, startLoc, left, right, op2, logical) {
    if (right.type === "PrivateIdentifier") {
      this.raise(right.start, "Private identifier can only be left side of binary expression");
    }
    var node = this.startNodeAt(startPos, startLoc);
    node.left = left;
    node.operator = op2;
    node.right = right;
    return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression");
  };
  pp$5.parseMaybeUnary = function(refDestructuringErrors, sawUnary, incDec, forInit) {
    var startPos = this.start, startLoc = this.startLoc, expr;
    if (this.isContextual("await") && this.canAwait) {
      expr = this.parseAwait(forInit);
      sawUnary = true;
    } else if (this.type.prefix) {
      var node = this.startNode(), update = this.type === types$1.incDec;
      node.operator = this.value;
      node.prefix = true;
      this.next();
      node.argument = this.parseMaybeUnary(null, true, update, forInit);
      this.checkExpressionErrors(refDestructuringErrors, true);
      if (update) {
        this.checkLValSimple(node.argument);
      } else if (this.strict && node.operator === "delete" && isLocalVariableAccess(node.argument)) {
        this.raiseRecoverable(node.start, "Deleting local variable in strict mode");
      } else if (node.operator === "delete" && isPrivateFieldAccess(node.argument)) {
        this.raiseRecoverable(node.start, "Private fields can not be deleted");
      } else {
        sawUnary = true;
      }
      expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
    } else if (!sawUnary && this.type === types$1.privateId) {
      if ((forInit || this.privateNameStack.length === 0) && this.options.checkPrivateFields) {
        this.unexpected();
      }
      expr = this.parsePrivateIdent();
      if (this.type !== types$1._in) {
        this.unexpected();
      }
    } else {
      expr = this.parseExprSubscripts(refDestructuringErrors, forInit);
      if (this.checkExpressionErrors(refDestructuringErrors)) {
        return expr;
      }
      while (this.type.postfix && !this.canInsertSemicolon()) {
        var node$1 = this.startNodeAt(startPos, startLoc);
        node$1.operator = this.value;
        node$1.prefix = false;
        node$1.argument = expr;
        this.checkLValSimple(expr);
        this.next();
        expr = this.finishNode(node$1, "UpdateExpression");
      }
    }
    if (!incDec && !(expr.type === "ArrowFunctionExpression" && expr.start === startPos) && this.eat(types$1.starstar)) {
      if (sawUnary) {
        this.unexpected(this.lastTokStart);
      } else {
        return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false, false, forInit), "**", false);
      }
    } else {
      return expr;
    }
  };
  function isLocalVariableAccess(node) {
    return node.type === "Identifier" || node.type === "ParenthesizedExpression" && isLocalVariableAccess(node.expression);
  }
  function isPrivateFieldAccess(node) {
    return node.type === "MemberExpression" && node.property.type === "PrivateIdentifier" || node.type === "ChainExpression" && isPrivateFieldAccess(node.expression) || node.type === "ParenthesizedExpression" && isPrivateFieldAccess(node.expression);
  }
  pp$5.parseExprSubscripts = function(refDestructuringErrors, forInit) {
    var startPos = this.start, startLoc = this.startLoc;
    var oldDoubleProto = -1, oldShorthandAssign = -1;
    if (refDestructuringErrors) {
      oldDoubleProto = refDestructuringErrors.doubleProto;
      oldShorthandAssign = refDestructuringErrors.shorthandAssign;
      refDestructuringErrors.doubleProto = refDestructuringErrors.shorthandAssign = -1;
    }
    var expr = this.parseExprAtom(refDestructuringErrors, forInit);
    if (expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")") {
      return expr;
    }
    var result = this.parseSubscripts(expr, startPos, startLoc, false, forInit);
    if (refDestructuringErrors) {
      if (result.end > expr.end) {
        this.checkExpressionErrors(refDestructuringErrors, true);
        if (refDestructuringErrors.parenthesizedAssign >= result.start) {
          refDestructuringErrors.parenthesizedAssign = -1;
        }
        if (refDestructuringErrors.parenthesizedBind >= result.start) {
          refDestructuringErrors.parenthesizedBind = -1;
        }
        if (refDestructuringErrors.trailingComma >= result.start) {
          refDestructuringErrors.trailingComma = -1;
        }
      }
      if (oldDoubleProto > -1) {
        refDestructuringErrors.doubleProto = oldDoubleProto;
      }
      if (oldShorthandAssign > -1) {
        refDestructuringErrors.shorthandAssign = oldShorthandAssign;
      }
    }
    return result;
  };
  pp$5.parseSubscripts = function(base, startPos, startLoc, noCalls, forInit) {
    var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" && this.lastTokEnd === base.end && !this.canInsertSemicolon() && base.end - base.start === 5 && this.potentialArrowAt === base.start;
    var optionalChained = false;
    while (true) {
      var element = this.parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit);
      if (element.optional) {
        optionalChained = true;
      }
      if (element.end === base.end || element.type === "ArrowFunctionExpression") {
        if (optionalChained) {
          var chainNode = this.startNodeAt(startPos, startLoc);
          chainNode.expression = element;
          element = this.finishNode(chainNode, "ChainExpression");
        }
        return element;
      }
      base = element;
      maybeAsyncArrow = false;
    }
  };
  pp$5.shouldParseAsyncArrow = function() {
    return !this.canInsertSemicolon() && this.eat(types$1.arrow);
  };
  pp$5.parseSubscriptAsyncArrow = function(startPos, startLoc, exprList, forInit) {
    return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, true, forInit);
  };
  pp$5.parseSubscript = function(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit) {
    var optionalSupported = this.options.ecmaVersion >= 11;
    var optional = optionalSupported && this.eat(types$1.questionDot);
    if (noCalls && optional) {
      this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
    }
    var computed = this.eat(types$1.bracketL);
    if (computed || optional && this.type !== types$1.parenL && this.type !== types$1.backQuote || this.eat(types$1.dot)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.object = base;
      if (computed) {
        node.property = this.parseExpression();
        this.expect(types$1.bracketR);
      } else if (this.type === types$1.privateId && base.type !== "Super") {
        node.property = this.parsePrivateIdent();
      } else {
        node.property = this.parseIdent(this.options.allowReserved !== "never");
      }
      node.computed = !!computed;
      if (optionalSupported) {
        node.optional = optional;
      }
      base = this.finishNode(node, "MemberExpression");
    } else if (!noCalls && this.eat(types$1.parenL)) {
      var refDestructuringErrors = new DestructuringErrors(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
      this.yieldPos = 0;
      this.awaitPos = 0;
      this.awaitIdentPos = 0;
      var exprList = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false, refDestructuringErrors);
      if (maybeAsyncArrow && !optional && this.shouldParseAsyncArrow()) {
        this.checkPatternErrors(refDestructuringErrors, false);
        this.checkYieldAwaitInDefaultParams();
        if (this.awaitIdentPos > 0) {
          this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function");
        }
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        this.awaitIdentPos = oldAwaitIdentPos;
        return this.parseSubscriptAsyncArrow(startPos, startLoc, exprList, forInit);
      }
      this.checkExpressionErrors(refDestructuringErrors, true);
      this.yieldPos = oldYieldPos || this.yieldPos;
      this.awaitPos = oldAwaitPos || this.awaitPos;
      this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
      var node$1 = this.startNodeAt(startPos, startLoc);
      node$1.callee = base;
      node$1.arguments = exprList;
      if (optionalSupported) {
        node$1.optional = optional;
      }
      base = this.finishNode(node$1, "CallExpression");
    } else if (this.type === types$1.backQuote) {
      if (optional || optionalChained) {
        this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
      }
      var node$2 = this.startNodeAt(startPos, startLoc);
      node$2.tag = base;
      node$2.quasi = this.parseTemplate({ isTagged: true });
      base = this.finishNode(node$2, "TaggedTemplateExpression");
    }
    return base;
  };
  pp$5.parseExprAtom = function(refDestructuringErrors, forInit, forNew) {
    if (this.type === types$1.slash) {
      this.readRegexp();
    }
    var node, canBeArrow = this.potentialArrowAt === this.start;
    switch (this.type) {
      case types$1._super:
        if (!this.allowSuper) {
          this.raise(this.start, "'super' keyword outside a method");
        }
        node = this.startNode();
        this.next();
        if (this.type === types$1.parenL && !this.allowDirectSuper) {
          this.raise(node.start, "super() call outside constructor of a subclass");
        }
        if (this.type !== types$1.dot && this.type !== types$1.bracketL && this.type !== types$1.parenL) {
          this.unexpected();
        }
        return this.finishNode(node, "Super");
      case types$1._this:
        node = this.startNode();
        this.next();
        return this.finishNode(node, "ThisExpression");
      case types$1.name:
        var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc;
        var id2 = this.parseIdent(false);
        if (this.options.ecmaVersion >= 8 && !containsEsc && id2.name === "async" && !this.canInsertSemicolon() && this.eat(types$1._function)) {
          this.overrideContext(types.f_expr);
          return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true, forInit);
        }
        if (canBeArrow && !this.canInsertSemicolon()) {
          if (this.eat(types$1.arrow)) {
            return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id2], false, forInit);
          }
          if (this.options.ecmaVersion >= 8 && id2.name === "async" && this.type === types$1.name && !containsEsc && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) {
            id2 = this.parseIdent(false);
            if (this.canInsertSemicolon() || !this.eat(types$1.arrow)) {
              this.unexpected();
            }
            return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id2], true, forInit);
          }
        }
        return id2;
      case types$1.regexp:
        var value = this.value;
        node = this.parseLiteral(value.value);
        node.regex = { pattern: value.pattern, flags: value.flags };
        return node;
      case types$1.num:
      case types$1.string:
        return this.parseLiteral(this.value);
      case types$1._null:
      case types$1._true:
      case types$1._false:
        node = this.startNode();
        node.value = this.type === types$1._null ? null : this.type === types$1._true;
        node.raw = this.type.keyword;
        this.next();
        return this.finishNode(node, "Literal");
      case types$1.parenL:
        var start = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow, forInit);
        if (refDestructuringErrors) {
          if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr)) {
            refDestructuringErrors.parenthesizedAssign = start;
          }
          if (refDestructuringErrors.parenthesizedBind < 0) {
            refDestructuringErrors.parenthesizedBind = start;
          }
        }
        return expr;
      case types$1.bracketL:
        node = this.startNode();
        this.next();
        node.elements = this.parseExprList(types$1.bracketR, true, true, refDestructuringErrors);
        return this.finishNode(node, "ArrayExpression");
      case types$1.braceL:
        this.overrideContext(types.b_expr);
        return this.parseObj(false, refDestructuringErrors);
      case types$1._function:
        node = this.startNode();
        this.next();
        return this.parseFunction(node, 0);
      case types$1._class:
        return this.parseClass(this.startNode(), false);
      case types$1._new:
        return this.parseNew();
      case types$1.backQuote:
        return this.parseTemplate();
      case types$1._import:
        if (this.options.ecmaVersion >= 11) {
          return this.parseExprImport(forNew);
        } else {
          return this.unexpected();
        }
      default:
        return this.parseExprAtomDefault();
    }
  };
  pp$5.parseExprAtomDefault = function() {
    this.unexpected();
  };
  pp$5.parseExprImport = function(forNew) {
    var node = this.startNode();
    if (this.containsEsc) {
      this.raiseRecoverable(this.start, "Escape sequence in keyword import");
    }
    this.next();
    if (this.type === types$1.parenL && !forNew) {
      return this.parseDynamicImport(node);
    } else if (this.type === types$1.dot) {
      var meta = this.startNodeAt(node.start, node.loc && node.loc.start);
      meta.name = "import";
      node.meta = this.finishNode(meta, "Identifier");
      return this.parseImportMeta(node);
    } else {
      this.unexpected();
    }
  };
  pp$5.parseDynamicImport = function(node) {
    this.next();
    node.source = this.parseMaybeAssign();
    if (this.options.ecmaVersion >= 16) {
      if (!this.eat(types$1.parenR)) {
        this.expect(types$1.comma);
        if (!this.afterTrailingComma(types$1.parenR)) {
          node.options = this.parseMaybeAssign();
          if (!this.eat(types$1.parenR)) {
            this.expect(types$1.comma);
            if (!this.afterTrailingComma(types$1.parenR)) {
              this.unexpected();
            }
          }
        } else {
          node.options = null;
        }
      } else {
        node.options = null;
      }
    } else {
      if (!this.eat(types$1.parenR)) {
        var errorPos = this.start;
        if (this.eat(types$1.comma) && this.eat(types$1.parenR)) {
          this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()");
        } else {
          this.unexpected(errorPos);
        }
      }
    }
    return this.finishNode(node, "ImportExpression");
  };
  pp$5.parseImportMeta = function(node) {
    this.next();
    var containsEsc = this.containsEsc;
    node.property = this.parseIdent(true);
    if (node.property.name !== "meta") {
      this.raiseRecoverable(node.property.start, "The only valid meta property for import is 'import.meta'");
    }
    if (containsEsc) {
      this.raiseRecoverable(node.start, "'import.meta' must not contain escaped characters");
    }
    if (this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere) {
      this.raiseRecoverable(node.start, "Cannot use 'import.meta' outside a module");
    }
    return this.finishNode(node, "MetaProperty");
  };
  pp$5.parseLiteral = function(value) {
    var node = this.startNode();
    node.value = value;
    node.raw = this.input.slice(this.start, this.end);
    if (node.raw.charCodeAt(node.raw.length - 1) === 110) {
      node.bigint = node.value != null ? node.value.toString() : node.raw.slice(0, -1).replace(/_/g, "");
    }
    this.next();
    return this.finishNode(node, "Literal");
  };
  pp$5.parseParenExpression = function() {
    this.expect(types$1.parenL);
    var val = this.parseExpression();
    this.expect(types$1.parenR);
    return val;
  };
  pp$5.shouldParseArrow = function(exprList) {
    return !this.canInsertSemicolon();
  };
  pp$5.parseParenAndDistinguishExpression = function(canBeArrow, forInit) {
    var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
    if (this.options.ecmaVersion >= 6) {
      this.next();
      var innerStartPos = this.start, innerStartLoc = this.startLoc;
      var exprList = [], first = true, lastIsComma = false;
      var refDestructuringErrors = new DestructuringErrors(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
      this.yieldPos = 0;
      this.awaitPos = 0;
      while (this.type !== types$1.parenR) {
        first ? first = false : this.expect(types$1.comma);
        if (allowTrailingComma && this.afterTrailingComma(types$1.parenR, true)) {
          lastIsComma = true;
          break;
        } else if (this.type === types$1.ellipsis) {
          spreadStart = this.start;
          exprList.push(this.parseParenItem(this.parseRestBinding()));
          if (this.type === types$1.comma) {
            this.raiseRecoverable(
              this.start,
              "Comma is not permitted after the rest element"
            );
          }
          break;
        } else {
          exprList.push(this.parseMaybeAssign(false, refDestructuringErrors, this.parseParenItem));
        }
      }
      var innerEndPos = this.lastTokEnd, innerEndLoc = this.lastTokEndLoc;
      this.expect(types$1.parenR);
      if (canBeArrow && this.shouldParseArrow(exprList) && this.eat(types$1.arrow)) {
        this.checkPatternErrors(refDestructuringErrors, false);
        this.checkYieldAwaitInDefaultParams();
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        return this.parseParenArrowList(startPos, startLoc, exprList, forInit);
      }
      if (!exprList.length || lastIsComma) {
        this.unexpected(this.lastTokStart);
      }
      if (spreadStart) {
        this.unexpected(spreadStart);
      }
      this.checkExpressionErrors(refDestructuringErrors, true);
      this.yieldPos = oldYieldPos || this.yieldPos;
      this.awaitPos = oldAwaitPos || this.awaitPos;
      if (exprList.length > 1) {
        val = this.startNodeAt(innerStartPos, innerStartLoc);
        val.expressions = exprList;
        this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
      } else {
        val = exprList[0];
      }
    } else {
      val = this.parseParenExpression();
    }
    if (this.options.preserveParens) {
      var par = this.startNodeAt(startPos, startLoc);
      par.expression = val;
      return this.finishNode(par, "ParenthesizedExpression");
    } else {
      return val;
    }
  };
  pp$5.parseParenItem = function(item) {
    return item;
  };
  pp$5.parseParenArrowList = function(startPos, startLoc, exprList, forInit) {
    return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, false, forInit);
  };
  var empty = [];
  pp$5.parseNew = function() {
    if (this.containsEsc) {
      this.raiseRecoverable(this.start, "Escape sequence in keyword new");
    }
    var node = this.startNode();
    this.next();
    if (this.options.ecmaVersion >= 6 && this.type === types$1.dot) {
      var meta = this.startNodeAt(node.start, node.loc && node.loc.start);
      meta.name = "new";
      node.meta = this.finishNode(meta, "Identifier");
      this.next();
      var containsEsc = this.containsEsc;
      node.property = this.parseIdent(true);
      if (node.property.name !== "target") {
        this.raiseRecoverable(node.property.start, "The only valid meta property for new is 'new.target'");
      }
      if (containsEsc) {
        this.raiseRecoverable(node.start, "'new.target' must not contain escaped characters");
      }
      if (!this.allowNewDotTarget) {
        this.raiseRecoverable(node.start, "'new.target' can only be used in functions and class static block");
      }
      return this.finishNode(node, "MetaProperty");
    }
    var startPos = this.start, startLoc = this.startLoc;
    node.callee = this.parseSubscripts(this.parseExprAtom(null, false, true), startPos, startLoc, true, false);
    if (node.callee.type === "Super") {
      this.raiseRecoverable(startPos, "Invalid use of 'super'");
    }
    if (this.eat(types$1.parenL)) {
      node.arguments = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false);
    } else {
      node.arguments = empty;
    }
    return this.finishNode(node, "NewExpression");
  };
  pp$5.parseTemplateElement = function(ref2) {
    var isTagged = ref2.isTagged;
    var elem = this.startNode();
    if (this.type === types$1.invalidTemplate) {
      if (!isTagged) {
        this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
      }
      elem.value = {
        raw: this.value.replace(/\r\n?/g, "\n"),
        cooked: null
      };
    } else {
      elem.value = {
        raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
        cooked: this.value
      };
    }
    this.next();
    elem.tail = this.type === types$1.backQuote;
    return this.finishNode(elem, "TemplateElement");
  };
  pp$5.parseTemplate = function(ref2) {
    if (ref2 === void 0) ref2 = {};
    var isTagged = ref2.isTagged;
    if (isTagged === void 0) isTagged = false;
    var node = this.startNode();
    this.next();
    node.expressions = [];
    var curElt = this.parseTemplateElement({ isTagged });
    node.quasis = [curElt];
    while (!curElt.tail) {
      if (this.type === types$1.eof) {
        this.raise(this.pos, "Unterminated template literal");
      }
      this.expect(types$1.dollarBraceL);
      node.expressions.push(this.parseExpression());
      this.expect(types$1.braceR);
      node.quasis.push(curElt = this.parseTemplateElement({ isTagged }));
    }
    this.next();
    return this.finishNode(node, "TemplateLiteral");
  };
  pp$5.isAsyncProp = function(prop) {
    return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" && (this.type === types$1.name || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === types$1.star) && !lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
  };
  pp$5.parseObj = function(isPattern, refDestructuringErrors) {
    var node = this.startNode(), first = true, propHash = {};
    node.properties = [];
    this.next();
    while (!this.eat(types$1.braceR)) {
      if (!first) {
        this.expect(types$1.comma);
        if (this.options.ecmaVersion >= 5 && this.afterTrailingComma(types$1.braceR)) {
          break;
        }
      } else {
        first = false;
      }
      var prop = this.parseProperty(isPattern, refDestructuringErrors);
      if (!isPattern) {
        this.checkPropClash(prop, propHash, refDestructuringErrors);
      }
      node.properties.push(prop);
    }
    return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
  };
  pp$5.parseProperty = function(isPattern, refDestructuringErrors) {
    var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
    if (this.options.ecmaVersion >= 9 && this.eat(types$1.ellipsis)) {
      if (isPattern) {
        prop.argument = this.parseIdent(false);
        if (this.type === types$1.comma) {
          this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
        }
        return this.finishNode(prop, "RestElement");
      }
      prop.argument = this.parseMaybeAssign(false, refDestructuringErrors);
      if (this.type === types$1.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0) {
        refDestructuringErrors.trailingComma = this.start;
      }
      return this.finishNode(prop, "SpreadElement");
    }
    if (this.options.ecmaVersion >= 6) {
      prop.method = false;
      prop.shorthand = false;
      if (isPattern || refDestructuringErrors) {
        startPos = this.start;
        startLoc = this.startLoc;
      }
      if (!isPattern) {
        isGenerator = this.eat(types$1.star);
      }
    }
    var containsEsc = this.containsEsc;
    this.parsePropertyName(prop);
    if (!isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
      isAsync = true;
      isGenerator = this.options.ecmaVersion >= 9 && this.eat(types$1.star);
      this.parsePropertyName(prop);
    } else {
      isAsync = false;
    }
    this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc);
    return this.finishNode(prop, "Property");
  };
  pp$5.parseGetterSetter = function(prop) {
    var kind = prop.key.name;
    this.parsePropertyName(prop);
    prop.value = this.parseMethod(false);
    prop.kind = kind;
    var paramCount = prop.kind === "get" ? 0 : 1;
    if (prop.value.params.length !== paramCount) {
      var start = prop.value.start;
      if (prop.kind === "get") {
        this.raiseRecoverable(start, "getter should have no params");
      } else {
        this.raiseRecoverable(start, "setter should have exactly one param");
      }
    } else {
      if (prop.kind === "set" && prop.value.params[0].type === "RestElement") {
        this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
      }
    }
  };
  pp$5.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
    if ((isGenerator || isAsync) && this.type === types$1.colon) {
      this.unexpected();
    }
    if (this.eat(types$1.colon)) {
      prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
      prop.kind = "init";
    } else if (this.options.ecmaVersion >= 6 && this.type === types$1.parenL) {
      if (isPattern) {
        this.unexpected();
      }
      prop.method = true;
      prop.value = this.parseMethod(isGenerator, isAsync);
      prop.kind = "init";
    } else if (!isPattern && !containsEsc && this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && (this.type !== types$1.comma && this.type !== types$1.braceR && this.type !== types$1.eq)) {
      if (isGenerator || isAsync) {
        this.unexpected();
      }
      this.parseGetterSetter(prop);
    } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
      if (isGenerator || isAsync) {
        this.unexpected();
      }
      this.checkUnreserved(prop.key);
      if (prop.key.name === "await" && !this.awaitIdentPos) {
        this.awaitIdentPos = startPos;
      }
      if (isPattern) {
        prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
      } else if (this.type === types$1.eq && refDestructuringErrors) {
        if (refDestructuringErrors.shorthandAssign < 0) {
          refDestructuringErrors.shorthandAssign = this.start;
        }
        prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
      } else {
        prop.value = this.copyNode(prop.key);
      }
      prop.kind = "init";
      prop.shorthand = true;
    } else {
      this.unexpected();
    }
  };
  pp$5.parsePropertyName = function(prop) {
    if (this.options.ecmaVersion >= 6) {
      if (this.eat(types$1.bracketL)) {
        prop.computed = true;
        prop.key = this.parseMaybeAssign();
        this.expect(types$1.bracketR);
        return prop.key;
      } else {
        prop.computed = false;
      }
    }
    return prop.key = this.type === types$1.num || this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
  };
  pp$5.initFunction = function(node) {
    node.id = null;
    if (this.options.ecmaVersion >= 6) {
      node.generator = node.expression = false;
    }
    if (this.options.ecmaVersion >= 8) {
      node.async = false;
    }
  };
  pp$5.parseMethod = function(isGenerator, isAsync, allowDirectSuper) {
    var node = this.startNode(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
    this.initFunction(node);
    if (this.options.ecmaVersion >= 6) {
      node.generator = isGenerator;
    }
    if (this.options.ecmaVersion >= 8) {
      node.async = !!isAsync;
    }
    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    this.enterScope(functionFlags(isAsync, node.generator) | SCOPE_SUPER | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0));
    this.expect(types$1.parenL);
    node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
    this.checkYieldAwaitInDefaultParams();
    this.parseFunctionBody(node, false, true, false);
    this.yieldPos = oldYieldPos;
    this.awaitPos = oldAwaitPos;
    this.awaitIdentPos = oldAwaitIdentPos;
    return this.finishNode(node, "FunctionExpression");
  };
  pp$5.parseArrowExpression = function(node, params, isAsync, forInit) {
    var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
    this.enterScope(functionFlags(isAsync, false) | SCOPE_ARROW);
    this.initFunction(node);
    if (this.options.ecmaVersion >= 8) {
      node.async = !!isAsync;
    }
    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    node.params = this.toAssignableList(params, true);
    this.parseFunctionBody(node, true, false, forInit);
    this.yieldPos = oldYieldPos;
    this.awaitPos = oldAwaitPos;
    this.awaitIdentPos = oldAwaitIdentPos;
    return this.finishNode(node, "ArrowFunctionExpression");
  };
  pp$5.parseFunctionBody = function(node, isArrowFunction, isMethod, forInit) {
    var isExpression = isArrowFunction && this.type !== types$1.braceL;
    var oldStrict = this.strict, useStrict = false;
    if (isExpression) {
      node.body = this.parseMaybeAssign(forInit);
      node.expression = true;
      this.checkParams(node, false);
    } else {
      var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
      if (!oldStrict || nonSimple) {
        useStrict = this.strictDirective(this.end);
        if (useStrict && nonSimple) {
          this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list");
        }
      }
      var oldLabels = this.labels;
      this.labels = [];
      if (useStrict) {
        this.strict = true;
      }
      this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && !isMethod && this.isSimpleParamList(node.params));
      if (this.strict && node.id) {
        this.checkLValSimple(node.id, BIND_OUTSIDE);
      }
      node.body = this.parseBlock(false, void 0, useStrict && !oldStrict);
      node.expression = false;
      this.adaptDirectivePrologue(node.body.body);
      this.labels = oldLabels;
    }
    this.exitScope();
  };
  pp$5.isSimpleParamList = function(params) {
    for (var i = 0, list = params; i < list.length; i += 1) {
      var param = list[i];
      if (param.type !== "Identifier") {
        return false;
      }
    }
    return true;
  };
  pp$5.checkParams = function(node, allowDuplicates) {
    var nameHash = /* @__PURE__ */ Object.create(null);
    for (var i = 0, list = node.params; i < list.length; i += 1) {
      var param = list[i];
      this.checkLValInnerPattern(param, BIND_VAR, allowDuplicates ? null : nameHash);
    }
  };
  pp$5.parseExprList = function(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
    var elts = [], first = true;
    while (!this.eat(close)) {
      if (!first) {
        this.expect(types$1.comma);
        if (allowTrailingComma && this.afterTrailingComma(close)) {
          break;
        }
      } else {
        first = false;
      }
      var elt = void 0;
      if (allowEmpty && this.type === types$1.comma) {
        elt = null;
      } else if (this.type === types$1.ellipsis) {
        elt = this.parseSpread(refDestructuringErrors);
        if (refDestructuringErrors && this.type === types$1.comma && refDestructuringErrors.trailingComma < 0) {
          refDestructuringErrors.trailingComma = this.start;
        }
      } else {
        elt = this.parseMaybeAssign(false, refDestructuringErrors);
      }
      elts.push(elt);
    }
    return elts;
  };
  pp$5.checkUnreserved = function(ref2) {
    var start = ref2.start;
    var end = ref2.end;
    var name = ref2.name;
    if (this.inGenerator && name === "yield") {
      this.raiseRecoverable(start, "Cannot use 'yield' as identifier inside a generator");
    }
    if (this.inAsync && name === "await") {
      this.raiseRecoverable(start, "Cannot use 'await' as identifier inside an async function");
    }
    if (!(this.currentThisScope().flags & SCOPE_VAR) && name === "arguments") {
      this.raiseRecoverable(start, "Cannot use 'arguments' in class field initializer");
    }
    if (this.inClassStaticBlock && (name === "arguments" || name === "await")) {
      this.raise(start, "Cannot use " + name + " in class static initialization block");
    }
    if (this.keywords.test(name)) {
      this.raise(start, "Unexpected keyword '" + name + "'");
    }
    if (this.options.ecmaVersion < 6 && this.input.slice(start, end).indexOf("\\") !== -1) {
      return;
    }
    var re4 = this.strict ? this.reservedWordsStrict : this.reservedWords;
    if (re4.test(name)) {
      if (!this.inAsync && name === "await") {
        this.raiseRecoverable(start, "Cannot use keyword 'await' outside an async function");
      }
      this.raiseRecoverable(start, "The keyword '" + name + "' is reserved");
    }
  };
  pp$5.parseIdent = function(liberal) {
    var node = this.parseIdentNode();
    this.next(!!liberal);
    this.finishNode(node, "Identifier");
    if (!liberal) {
      this.checkUnreserved(node);
      if (node.name === "await" && !this.awaitIdentPos) {
        this.awaitIdentPos = node.start;
      }
    }
    return node;
  };
  pp$5.parseIdentNode = function() {
    var node = this.startNode();
    if (this.type === types$1.name) {
      node.name = this.value;
    } else if (this.type.keyword) {
      node.name = this.type.keyword;
      if ((node.name === "class" || node.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
        this.context.pop();
      }
      this.type = types$1.name;
    } else {
      this.unexpected();
    }
    return node;
  };
  pp$5.parsePrivateIdent = function() {
    var node = this.startNode();
    if (this.type === types$1.privateId) {
      node.name = this.value;
    } else {
      this.unexpected();
    }
    this.next();
    this.finishNode(node, "PrivateIdentifier");
    if (this.options.checkPrivateFields) {
      if (this.privateNameStack.length === 0) {
        this.raise(node.start, "Private field '#" + node.name + "' must be declared in an enclosing class");
      } else {
        this.privateNameStack[this.privateNameStack.length - 1].used.push(node);
      }
    }
    return node;
  };
  pp$5.parseYield = function(forInit) {
    if (!this.yieldPos) {
      this.yieldPos = this.start;
    }
    var node = this.startNode();
    this.next();
    if (this.type === types$1.semi || this.canInsertSemicolon() || this.type !== types$1.star && !this.type.startsExpr) {
      node.delegate = false;
      node.argument = null;
    } else {
      node.delegate = this.eat(types$1.star);
      node.argument = this.parseMaybeAssign(forInit);
    }
    return this.finishNode(node, "YieldExpression");
  };
  pp$5.parseAwait = function(forInit) {
    if (!this.awaitPos) {
      this.awaitPos = this.start;
    }
    var node = this.startNode();
    this.next();
    node.argument = this.parseMaybeUnary(null, true, false, forInit);
    return this.finishNode(node, "AwaitExpression");
  };
  var pp$4 = Parser.prototype;
  pp$4.raise = function(pos, message) {
    var loc = getLineInfo(this.input, pos);
    message += " (" + loc.line + ":" + loc.column + ")";
    if (this.sourceFile) {
      message += " in " + this.sourceFile;
    }
    var err = new SyntaxError(message);
    err.pos = pos;
    err.loc = loc;
    err.raisedAt = this.pos;
    throw err;
  };
  pp$4.raiseRecoverable = pp$4.raise;
  pp$4.curPosition = function() {
    if (this.options.locations) {
      return new Position(this.curLine, this.pos - this.lineStart);
    }
  };
  var pp$3 = Parser.prototype;
  var Scope = function Scope2(flags) {
    this.flags = flags;
    this.var = [];
    this.lexical = [];
    this.functions = [];
  };
  pp$3.enterScope = function(flags) {
    this.scopeStack.push(new Scope(flags));
  };
  pp$3.exitScope = function() {
    this.scopeStack.pop();
  };
  pp$3.treatFunctionsAsVarInScope = function(scope) {
    return scope.flags & SCOPE_FUNCTION || !this.inModule && scope.flags & SCOPE_TOP;
  };
  pp$3.declareName = function(name, bindingType, pos) {
    var redeclared = false;
    if (bindingType === BIND_LEXICAL) {
      var scope = this.currentScope();
      redeclared = scope.lexical.indexOf(name) > -1 || scope.functions.indexOf(name) > -1 || scope.var.indexOf(name) > -1;
      scope.lexical.push(name);
      if (this.inModule && scope.flags & SCOPE_TOP) {
        delete this.undefinedExports[name];
      }
    } else if (bindingType === BIND_SIMPLE_CATCH) {
      var scope$1 = this.currentScope();
      scope$1.lexical.push(name);
    } else if (bindingType === BIND_FUNCTION) {
      var scope$2 = this.currentScope();
      if (this.treatFunctionsAsVar) {
        redeclared = scope$2.lexical.indexOf(name) > -1;
      } else {
        redeclared = scope$2.lexical.indexOf(name) > -1 || scope$2.var.indexOf(name) > -1;
      }
      scope$2.functions.push(name);
    } else {
      for (var i = this.scopeStack.length - 1; i >= 0; --i) {
        var scope$3 = this.scopeStack[i];
        if (scope$3.lexical.indexOf(name) > -1 && !(scope$3.flags & SCOPE_SIMPLE_CATCH && scope$3.lexical[0] === name) || !this.treatFunctionsAsVarInScope(scope$3) && scope$3.functions.indexOf(name) > -1) {
          redeclared = true;
          break;
        }
        scope$3.var.push(name);
        if (this.inModule && scope$3.flags & SCOPE_TOP) {
          delete this.undefinedExports[name];
        }
        if (scope$3.flags & SCOPE_VAR) {
          break;
        }
      }
    }
    if (redeclared) {
      this.raiseRecoverable(pos, "Identifier '" + name + "' has already been declared");
    }
  };
  pp$3.checkLocalExport = function(id2) {
    if (this.scopeStack[0].lexical.indexOf(id2.name) === -1 && this.scopeStack[0].var.indexOf(id2.name) === -1) {
      this.undefinedExports[id2.name] = id2;
    }
  };
  pp$3.currentScope = function() {
    return this.scopeStack[this.scopeStack.length - 1];
  };
  pp$3.currentVarScope = function() {
    for (var i = this.scopeStack.length - 1; ; i--) {
      var scope = this.scopeStack[i];
      if (scope.flags & (SCOPE_VAR | SCOPE_CLASS_FIELD_INIT | SCOPE_CLASS_STATIC_BLOCK)) {
        return scope;
      }
    }
  };
  pp$3.currentThisScope = function() {
    for (var i = this.scopeStack.length - 1; ; i--) {
      var scope = this.scopeStack[i];
      if (scope.flags & (SCOPE_VAR | SCOPE_CLASS_FIELD_INIT | SCOPE_CLASS_STATIC_BLOCK) && !(scope.flags & SCOPE_ARROW)) {
        return scope;
      }
    }
  };
  var Node = function Node2(parser, pos, loc) {
    this.type = "";
    this.start = pos;
    this.end = 0;
    if (parser.options.locations) {
      this.loc = new SourceLocation(parser, loc);
    }
    if (parser.options.directSourceFile) {
      this.sourceFile = parser.options.directSourceFile;
    }
    if (parser.options.ranges) {
      this.range = [pos, 0];
    }
  };
  var pp$2 = Parser.prototype;
  pp$2.startNode = function() {
    return new Node(this, this.start, this.startLoc);
  };
  pp$2.startNodeAt = function(pos, loc) {
    return new Node(this, pos, loc);
  };
  function finishNodeAt(node, type, pos, loc) {
    node.type = type;
    node.end = pos;
    if (this.options.locations) {
      node.loc.end = loc;
    }
    if (this.options.ranges) {
      node.range[1] = pos;
    }
    return node;
  }
  pp$2.finishNode = function(node, type) {
    return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc);
  };
  pp$2.finishNodeAt = function(node, type, pos, loc) {
    return finishNodeAt.call(this, node, type, pos, loc);
  };
  pp$2.copyNode = function(node) {
    var newNode = new Node(this, node.start, this.startLoc);
    for (var prop in node) {
      newNode[prop] = node[prop];
    }
    return newNode;
  };
  var scriptValuesAddedInUnicode = "Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz";
  var ecma9BinaryProperties = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
  var ecma10BinaryProperties = ecma9BinaryProperties + " Extended_Pictographic";
  var ecma11BinaryProperties = ecma10BinaryProperties;
  var ecma12BinaryProperties = ecma11BinaryProperties + " EBase EComp EMod EPres ExtPict";
  var ecma13BinaryProperties = ecma12BinaryProperties;
  var ecma14BinaryProperties = ecma13BinaryProperties;
  var unicodeBinaryProperties = {
    9: ecma9BinaryProperties,
    10: ecma10BinaryProperties,
    11: ecma11BinaryProperties,
    12: ecma12BinaryProperties,
    13: ecma13BinaryProperties,
    14: ecma14BinaryProperties
  };
  var ecma14BinaryPropertiesOfStrings = "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji";
  var unicodeBinaryPropertiesOfStrings = {
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: ecma14BinaryPropertiesOfStrings
  };
  var unicodeGeneralCategoryValues = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu";
  var ecma9ScriptValues = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
  var ecma10ScriptValues = ecma9ScriptValues + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
  var ecma11ScriptValues = ecma10ScriptValues + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
  var ecma12ScriptValues = ecma11ScriptValues + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi";
  var ecma13ScriptValues = ecma12ScriptValues + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith";
  var ecma14ScriptValues = ecma13ScriptValues + " " + scriptValuesAddedInUnicode;
  var unicodeScriptValues = {
    9: ecma9ScriptValues,
    10: ecma10ScriptValues,
    11: ecma11ScriptValues,
    12: ecma12ScriptValues,
    13: ecma13ScriptValues,
    14: ecma14ScriptValues
  };
  var data = {};
  function buildUnicodeData(ecmaVersion) {
    var d2 = data[ecmaVersion] = {
      binary: wordsRegexp(unicodeBinaryProperties[ecmaVersion] + " " + unicodeGeneralCategoryValues),
      binaryOfStrings: wordsRegexp(unicodeBinaryPropertiesOfStrings[ecmaVersion]),
      nonBinary: {
        General_Category: wordsRegexp(unicodeGeneralCategoryValues),
        Script: wordsRegexp(unicodeScriptValues[ecmaVersion])
      }
    };
    d2.nonBinary.Script_Extensions = d2.nonBinary.Script;
    d2.nonBinary.gc = d2.nonBinary.General_Category;
    d2.nonBinary.sc = d2.nonBinary.Script;
    d2.nonBinary.scx = d2.nonBinary.Script_Extensions;
  }
  for (i = 0, list = [9, 10, 11, 12, 13, 14]; i < list.length; i += 1) {
    ecmaVersion = list[i];
    buildUnicodeData(ecmaVersion);
  }
  var ecmaVersion;
  var i;
  var list;
  var pp$1 = Parser.prototype;
  var BranchID = function BranchID2(parent, base) {
    this.parent = parent;
    this.base = base || this;
  };
  BranchID.prototype.separatedFrom = function separatedFrom(alt) {
    for (var self = this; self; self = self.parent) {
      for (var other = alt; other; other = other.parent) {
        if (self.base === other.base && self !== other) {
          return true;
        }
      }
    }
    return false;
  };
  BranchID.prototype.sibling = function sibling() {
    return new BranchID(this.parent, this.base);
  };
  var RegExpValidationState = function RegExpValidationState2(parser) {
    this.parser = parser;
    this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "") + (parser.options.ecmaVersion >= 13 ? "d" : "") + (parser.options.ecmaVersion >= 15 ? "v" : "");
    this.unicodeProperties = data[parser.options.ecmaVersion >= 14 ? 14 : parser.options.ecmaVersion];
    this.source = "";
    this.flags = "";
    this.start = 0;
    this.switchU = false;
    this.switchV = false;
    this.switchN = false;
    this.pos = 0;
    this.lastIntValue = 0;
    this.lastStringValue = "";
    this.lastAssertionIsQuantifiable = false;
    this.numCapturingParens = 0;
    this.maxBackReference = 0;
    this.groupNames = /* @__PURE__ */ Object.create(null);
    this.backReferenceNames = [];
    this.branchID = null;
  };
  RegExpValidationState.prototype.reset = function reset(start, pattern, flags) {
    var unicodeSets = flags.indexOf("v") !== -1;
    var unicode = flags.indexOf("u") !== -1;
    this.start = start | 0;
    this.source = pattern + "";
    this.flags = flags;
    if (unicodeSets && this.parser.options.ecmaVersion >= 15) {
      this.switchU = true;
      this.switchV = true;
      this.switchN = true;
    } else {
      this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
      this.switchV = false;
      this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
    }
  };
  RegExpValidationState.prototype.raise = function raise(message) {
    this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + message);
  };
  RegExpValidationState.prototype.at = function at3(i, forceU) {
    if (forceU === void 0) forceU = false;
    var s2 = this.source;
    var l2 = s2.length;
    if (i >= l2) {
      return -1;
    }
    var c3 = s2.charCodeAt(i);
    if (!(forceU || this.switchU) || c3 <= 55295 || c3 >= 57344 || i + 1 >= l2) {
      return c3;
    }
    var next = s2.charCodeAt(i + 1);
    return next >= 56320 && next <= 57343 ? (c3 << 10) + next - 56613888 : c3;
  };
  RegExpValidationState.prototype.nextIndex = function nextIndex(i, forceU) {
    if (forceU === void 0) forceU = false;
    var s2 = this.source;
    var l2 = s2.length;
    if (i >= l2) {
      return l2;
    }
    var c3 = s2.charCodeAt(i), next;
    if (!(forceU || this.switchU) || c3 <= 55295 || c3 >= 57344 || i + 1 >= l2 || (next = s2.charCodeAt(i + 1)) < 56320 || next > 57343) {
      return i + 1;
    }
    return i + 2;
  };
  RegExpValidationState.prototype.current = function current(forceU) {
    if (forceU === void 0) forceU = false;
    return this.at(this.pos, forceU);
  };
  RegExpValidationState.prototype.lookahead = function lookahead(forceU) {
    if (forceU === void 0) forceU = false;
    return this.at(this.nextIndex(this.pos, forceU), forceU);
  };
  RegExpValidationState.prototype.advance = function advance(forceU) {
    if (forceU === void 0) forceU = false;
    this.pos = this.nextIndex(this.pos, forceU);
  };
  RegExpValidationState.prototype.eat = function eat(ch2, forceU) {
    if (forceU === void 0) forceU = false;
    if (this.current(forceU) === ch2) {
      this.advance(forceU);
      return true;
    }
    return false;
  };
  RegExpValidationState.prototype.eatChars = function eatChars(chs, forceU) {
    if (forceU === void 0) forceU = false;
    var pos = this.pos;
    for (var i = 0, list = chs; i < list.length; i += 1) {
      var ch2 = list[i];
      var current2 = this.at(pos, forceU);
      if (current2 === -1 || current2 !== ch2) {
        return false;
      }
      pos = this.nextIndex(pos, forceU);
    }
    this.pos = pos;
    return true;
  };
  pp$1.validateRegExpFlags = function(state) {
    var validFlags = state.validFlags;
    var flags = state.flags;
    var u2 = false;
    var v = false;
    for (var i = 0; i < flags.length; i++) {
      var flag = flags.charAt(i);
      if (validFlags.indexOf(flag) === -1) {
        this.raise(state.start, "Invalid regular expression flag");
      }
      if (flags.indexOf(flag, i + 1) > -1) {
        this.raise(state.start, "Duplicate regular expression flag");
      }
      if (flag === "u") {
        u2 = true;
      }
      if (flag === "v") {
        v = true;
      }
    }
    if (this.options.ecmaVersion >= 15 && u2 && v) {
      this.raise(state.start, "Invalid regular expression flag");
    }
  };
  function hasProp(obj) {
    for (var _3 in obj) {
      return true;
    }
    return false;
  }
  pp$1.validateRegExpPattern = function(state) {
    this.regexp_pattern(state);
    if (!state.switchN && this.options.ecmaVersion >= 9 && hasProp(state.groupNames)) {
      state.switchN = true;
      this.regexp_pattern(state);
    }
  };
  pp$1.regexp_pattern = function(state) {
    state.pos = 0;
    state.lastIntValue = 0;
    state.lastStringValue = "";
    state.lastAssertionIsQuantifiable = false;
    state.numCapturingParens = 0;
    state.maxBackReference = 0;
    state.groupNames = /* @__PURE__ */ Object.create(null);
    state.backReferenceNames.length = 0;
    state.branchID = null;
    this.regexp_disjunction(state);
    if (state.pos !== state.source.length) {
      if (state.eat(
        41
        /* ) */
      )) {
        state.raise("Unmatched ')'");
      }
      if (state.eat(
        93
        /* ] */
      ) || state.eat(
        125
        /* } */
      )) {
        state.raise("Lone quantifier brackets");
      }
    }
    if (state.maxBackReference > state.numCapturingParens) {
      state.raise("Invalid escape");
    }
    for (var i = 0, list = state.backReferenceNames; i < list.length; i += 1) {
      var name = list[i];
      if (!state.groupNames[name]) {
        state.raise("Invalid named capture referenced");
      }
    }
  };
  pp$1.regexp_disjunction = function(state) {
    var trackDisjunction = this.options.ecmaVersion >= 16;
    if (trackDisjunction) {
      state.branchID = new BranchID(state.branchID, null);
    }
    this.regexp_alternative(state);
    while (state.eat(
      124
      /* | */
    )) {
      if (trackDisjunction) {
        state.branchID = state.branchID.sibling();
      }
      this.regexp_alternative(state);
    }
    if (trackDisjunction) {
      state.branchID = state.branchID.parent;
    }
    if (this.regexp_eatQuantifier(state, true)) {
      state.raise("Nothing to repeat");
    }
    if (state.eat(
      123
      /* { */
    )) {
      state.raise("Lone quantifier brackets");
    }
  };
  pp$1.regexp_alternative = function(state) {
    while (state.pos < state.source.length && this.regexp_eatTerm(state)) {
    }
  };
  pp$1.regexp_eatTerm = function(state) {
    if (this.regexp_eatAssertion(state)) {
      if (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state)) {
        if (state.switchU) {
          state.raise("Invalid quantifier");
        }
      }
      return true;
    }
    if (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) {
      this.regexp_eatQuantifier(state);
      return true;
    }
    return false;
  };
  pp$1.regexp_eatAssertion = function(state) {
    var start = state.pos;
    state.lastAssertionIsQuantifiable = false;
    if (state.eat(
      94
      /* ^ */
    ) || state.eat(
      36
      /* $ */
    )) {
      return true;
    }
    if (state.eat(
      92
      /* \ */
    )) {
      if (state.eat(
        66
        /* B */
      ) || state.eat(
        98
        /* b */
      )) {
        return true;
      }
      state.pos = start;
    }
    if (state.eat(
      40
      /* ( */
    ) && state.eat(
      63
      /* ? */
    )) {
      var lookbehind = false;
      if (this.options.ecmaVersion >= 9) {
        lookbehind = state.eat(
          60
          /* < */
        );
      }
      if (state.eat(
        61
        /* = */
      ) || state.eat(
        33
        /* ! */
      )) {
        this.regexp_disjunction(state);
        if (!state.eat(
          41
          /* ) */
        )) {
          state.raise("Unterminated group");
        }
        state.lastAssertionIsQuantifiable = !lookbehind;
        return true;
      }
    }
    state.pos = start;
    return false;
  };
  pp$1.regexp_eatQuantifier = function(state, noError) {
    if (noError === void 0) noError = false;
    if (this.regexp_eatQuantifierPrefix(state, noError)) {
      state.eat(
        63
        /* ? */
      );
      return true;
    }
    return false;
  };
  pp$1.regexp_eatQuantifierPrefix = function(state, noError) {
    return state.eat(
      42
      /* * */
    ) || state.eat(
      43
      /* + */
    ) || state.eat(
      63
      /* ? */
    ) || this.regexp_eatBracedQuantifier(state, noError);
  };
  pp$1.regexp_eatBracedQuantifier = function(state, noError) {
    var start = state.pos;
    if (state.eat(
      123
      /* { */
    )) {
      var min = 0, max = -1;
      if (this.regexp_eatDecimalDigits(state)) {
        min = state.lastIntValue;
        if (state.eat(
          44
          /* , */
        ) && this.regexp_eatDecimalDigits(state)) {
          max = state.lastIntValue;
        }
        if (state.eat(
          125
          /* } */
        )) {
          if (max !== -1 && max < min && !noError) {
            state.raise("numbers out of order in {} quantifier");
          }
          return true;
        }
      }
      if (state.switchU && !noError) {
        state.raise("Incomplete quantifier");
      }
      state.pos = start;
    }
    return false;
  };
  pp$1.regexp_eatAtom = function(state) {
    return this.regexp_eatPatternCharacters(state) || state.eat(
      46
      /* . */
    ) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state);
  };
  pp$1.regexp_eatReverseSolidusAtomEscape = function(state) {
    var start = state.pos;
    if (state.eat(
      92
      /* \ */
    )) {
      if (this.regexp_eatAtomEscape(state)) {
        return true;
      }
      state.pos = start;
    }
    return false;
  };
  pp$1.regexp_eatUncapturingGroup = function(state) {
    var start = state.pos;
    if (state.eat(
      40
      /* ( */
    )) {
      if (state.eat(
        63
        /* ? */
      )) {
        if (this.options.ecmaVersion >= 16) {
          var addModifiers = this.regexp_eatModifiers(state);
          var hasHyphen = state.eat(
            45
            /* - */
          );
          if (addModifiers || hasHyphen) {
            for (var i = 0; i < addModifiers.length; i++) {
              var modifier = addModifiers.charAt(i);
              if (addModifiers.indexOf(modifier, i + 1) > -1) {
                state.raise("Duplicate regular expression modifiers");
              }
            }
            if (hasHyphen) {
              var removeModifiers = this.regexp_eatModifiers(state);
              if (!addModifiers && !removeModifiers && state.current() === 58) {
                state.raise("Invalid regular expression modifiers");
              }
              for (var i$1 = 0; i$1 < removeModifiers.length; i$1++) {
                var modifier$1 = removeModifiers.charAt(i$1);
                if (removeModifiers.indexOf(modifier$1, i$1 + 1) > -1 || addModifiers.indexOf(modifier$1) > -1) {
                  state.raise("Duplicate regular expression modifiers");
                }
              }
            }
          }
        }
        if (state.eat(
          58
          /* : */
        )) {
          this.regexp_disjunction(state);
          if (state.eat(
            41
            /* ) */
          )) {
            return true;
          }
          state.raise("Unterminated group");
        }
      }
      state.pos = start;
    }
    return false;
  };
  pp$1.regexp_eatCapturingGroup = function(state) {
    if (state.eat(
      40
      /* ( */
    )) {
      if (this.options.ecmaVersion >= 9) {
        this.regexp_groupSpecifier(state);
      } else if (state.current() === 63) {
        state.raise("Invalid group");
      }
      this.regexp_disjunction(state);
      if (state.eat(
        41
        /* ) */
      )) {
        state.numCapturingParens += 1;
        return true;
      }
      state.raise("Unterminated group");
    }
    return false;
  };
  pp$1.regexp_eatModifiers = function(state) {
    var modifiers = "";
    var ch2 = 0;
    while ((ch2 = state.current()) !== -1 && isRegularExpressionModifier(ch2)) {
      modifiers += codePointToString(ch2);
      state.advance();
    }
    return modifiers;
  };
  function isRegularExpressionModifier(ch2) {
    return ch2 === 105 || ch2 === 109 || ch2 === 115;
  }
  pp$1.regexp_eatExtendedAtom = function(state) {
    return state.eat(
      46
      /* . */
    ) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state) || this.regexp_eatInvalidBracedQuantifier(state) || this.regexp_eatExtendedPatternCharacter(state);
  };
  pp$1.regexp_eatInvalidBracedQuantifier = function(state) {
    if (this.regexp_eatBracedQuantifier(state, true)) {
      state.raise("Nothing to repeat");
    }
    return false;
  };
  pp$1.regexp_eatSyntaxCharacter = function(state) {
    var ch2 = state.current();
    if (isSyntaxCharacter(ch2)) {
      state.lastIntValue = ch2;
      state.advance();
      return true;
    }
    return false;
  };
  function isSyntaxCharacter(ch2) {
    return ch2 === 36 || ch2 >= 40 && ch2 <= 43 || ch2 === 46 || ch2 === 63 || ch2 >= 91 && ch2 <= 94 || ch2 >= 123 && ch2 <= 125;
  }
  pp$1.regexp_eatPatternCharacters = function(state) {
    var start = state.pos;
    var ch2 = 0;
    while ((ch2 = state.current()) !== -1 && !isSyntaxCharacter(ch2)) {
      state.advance();
    }
    return state.pos !== start;
  };
  pp$1.regexp_eatExtendedPatternCharacter = function(state) {
    var ch2 = state.current();
    if (ch2 !== -1 && ch2 !== 36 && !(ch2 >= 40 && ch2 <= 43) && ch2 !== 46 && ch2 !== 63 && ch2 !== 91 && ch2 !== 94 && ch2 !== 124) {
      state.advance();
      return true;
    }
    return false;
  };
  pp$1.regexp_groupSpecifier = function(state) {
    if (state.eat(
      63
      /* ? */
    )) {
      if (!this.regexp_eatGroupName(state)) {
        state.raise("Invalid group");
      }
      var trackDisjunction = this.options.ecmaVersion >= 16;
      var known = state.groupNames[state.lastStringValue];
      if (known) {
        if (trackDisjunction) {
          for (var i = 0, list = known; i < list.length; i += 1) {
            var altID = list[i];
            if (!altID.separatedFrom(state.branchID)) {
              state.raise("Duplicate capture group name");
            }
          }
        } else {
          state.raise("Duplicate capture group name");
        }
      }
      if (trackDisjunction) {
        (known || (state.groupNames[state.lastStringValue] = [])).push(state.branchID);
      } else {
        state.groupNames[state.lastStringValue] = true;
      }
    }
  };
  pp$1.regexp_eatGroupName = function(state) {
    state.lastStringValue = "";
    if (state.eat(
      60
      /* < */
    )) {
      if (this.regexp_eatRegExpIdentifierName(state) && state.eat(
        62
        /* > */
      )) {
        return true;
      }
      state.raise("Invalid capture group name");
    }
    return false;
  };
  pp$1.regexp_eatRegExpIdentifierName = function(state) {
    state.lastStringValue = "";
    if (this.regexp_eatRegExpIdentifierStart(state)) {
      state.lastStringValue += codePointToString(state.lastIntValue);
      while (this.regexp_eatRegExpIdentifierPart(state)) {
        state.lastStringValue += codePointToString(state.lastIntValue);
      }
      return true;
    }
    return false;
  };
  pp$1.regexp_eatRegExpIdentifierStart = function(state) {
    var start = state.pos;
    var forceU = this.options.ecmaVersion >= 11;
    var ch2 = state.current(forceU);
    state.advance(forceU);
    if (ch2 === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
      ch2 = state.lastIntValue;
    }
    if (isRegExpIdentifierStart(ch2)) {
      state.lastIntValue = ch2;
      return true;
    }
    state.pos = start;
    return false;
  };
  function isRegExpIdentifierStart(ch2) {
    return isIdentifierStart(ch2, true) || ch2 === 36 || ch2 === 95;
  }
  pp$1.regexp_eatRegExpIdentifierPart = function(state) {
    var start = state.pos;
    var forceU = this.options.ecmaVersion >= 11;
    var ch2 = state.current(forceU);
    state.advance(forceU);
    if (ch2 === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
      ch2 = state.lastIntValue;
    }
    if (isRegExpIdentifierPart(ch2)) {
      state.lastIntValue = ch2;
      return true;
    }
    state.pos = start;
    return false;
  };
  function isRegExpIdentifierPart(ch2) {
    return isIdentifierChar(ch2, true) || ch2 === 36 || ch2 === 95 || ch2 === 8204 || ch2 === 8205;
  }
  pp$1.regexp_eatAtomEscape = function(state) {
    if (this.regexp_eatBackReference(state) || this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state) || state.switchN && this.regexp_eatKGroupName(state)) {
      return true;
    }
    if (state.switchU) {
      if (state.current() === 99) {
        state.raise("Invalid unicode escape");
      }
      state.raise("Invalid escape");
    }
    return false;
  };
  pp$1.regexp_eatBackReference = function(state) {
    var start = state.pos;
    if (this.regexp_eatDecimalEscape(state)) {
      var n = state.lastIntValue;
      if (state.switchU) {
        if (n > state.maxBackReference) {
          state.maxBackReference = n;
        }
        return true;
      }
      if (n <= state.numCapturingParens) {
        return true;
      }
      state.pos = start;
    }
    return false;
  };
  pp$1.regexp_eatKGroupName = function(state) {
    if (state.eat(
      107
      /* k */
    )) {
      if (this.regexp_eatGroupName(state)) {
        state.backReferenceNames.push(state.lastStringValue);
        return true;
      }
      state.raise("Invalid named reference");
    }
    return false;
  };
  pp$1.regexp_eatCharacterEscape = function(state) {
    return this.regexp_eatControlEscape(state) || this.regexp_eatCControlLetter(state) || this.regexp_eatZero(state) || this.regexp_eatHexEscapeSequence(state) || this.regexp_eatRegExpUnicodeEscapeSequence(state, false) || !state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state) || this.regexp_eatIdentityEscape(state);
  };
  pp$1.regexp_eatCControlLetter = function(state) {
    var start = state.pos;
    if (state.eat(
      99
      /* c */
    )) {
      if (this.regexp_eatControlLetter(state)) {
        return true;
      }
      state.pos = start;
    }
    return false;
  };
  pp$1.regexp_eatZero = function(state) {
    if (state.current() === 48 && !isDecimalDigit(state.lookahead())) {
      state.lastIntValue = 0;
      state.advance();
      return true;
    }
    return false;
  };
  pp$1.regexp_eatControlEscape = function(state) {
    var ch2 = state.current();
    if (ch2 === 116) {
      state.lastIntValue = 9;
      state.advance();
      return true;
    }
    if (ch2 === 110) {
      state.lastIntValue = 10;
      state.advance();
      return true;
    }
    if (ch2 === 118) {
      state.lastIntValue = 11;
      state.advance();
      return true;
    }
    if (ch2 === 102) {
      state.lastIntValue = 12;
      state.advance();
      return true;
    }
    if (ch2 === 114) {
      state.lastIntValue = 13;
      state.advance();
      return true;
    }
    return false;
  };
  pp$1.regexp_eatControlLetter = function(state) {
    var ch2 = state.current();
    if (isControlLetter(ch2)) {
      state.lastIntValue = ch2 % 32;
      state.advance();
      return true;
    }
    return false;
  };
  function isControlLetter(ch2) {
    return ch2 >= 65 && ch2 <= 90 || ch2 >= 97 && ch2 <= 122;
  }
  pp$1.regexp_eatRegExpUnicodeEscapeSequence = function(state, forceU) {
    if (forceU === void 0) forceU = false;
    var start = state.pos;
    var switchU = forceU || state.switchU;
    if (state.eat(
      117
      /* u */
    )) {
      if (this.regexp_eatFixedHexDigits(state, 4)) {
        var lead = state.lastIntValue;
        if (switchU && lead >= 55296 && lead <= 56319) {
          var leadSurrogateEnd = state.pos;
          if (state.eat(
            92
            /* \ */
          ) && state.eat(
            117
            /* u */
          ) && this.regexp_eatFixedHexDigits(state, 4)) {
            var trail = state.lastIntValue;
            if (trail >= 56320 && trail <= 57343) {
              state.lastIntValue = (lead - 55296) * 1024 + (trail - 56320) + 65536;
              return true;
            }
          }
          state.pos = leadSurrogateEnd;
          state.lastIntValue = lead;
        }
        return true;
      }
      if (switchU && state.eat(
        123
        /* { */
      ) && this.regexp_eatHexDigits(state) && state.eat(
        125
        /* } */
      ) && isValidUnicode(state.lastIntValue)) {
        return true;
      }
      if (switchU) {
        state.raise("Invalid unicode escape");
      }
      state.pos = start;
    }
    return false;
  };
  function isValidUnicode(ch2) {
    return ch2 >= 0 && ch2 <= 1114111;
  }
  pp$1.regexp_eatIdentityEscape = function(state) {
    if (state.switchU) {
      if (this.regexp_eatSyntaxCharacter(state)) {
        return true;
      }
      if (state.eat(
        47
        /* / */
      )) {
        state.lastIntValue = 47;
        return true;
      }
      return false;
    }
    var ch2 = state.current();
    if (ch2 !== 99 && (!state.switchN || ch2 !== 107)) {
      state.lastIntValue = ch2;
      state.advance();
      return true;
    }
    return false;
  };
  pp$1.regexp_eatDecimalEscape = function(state) {
    state.lastIntValue = 0;
    var ch2 = state.current();
    if (ch2 >= 49 && ch2 <= 57) {
      do {
        state.lastIntValue = 10 * state.lastIntValue + (ch2 - 48);
        state.advance();
      } while ((ch2 = state.current()) >= 48 && ch2 <= 57);
      return true;
    }
    return false;
  };
  var CharSetNone = 0;
  var CharSetOk = 1;
  var CharSetString = 2;
  pp$1.regexp_eatCharacterClassEscape = function(state) {
    var ch2 = state.current();
    if (isCharacterClassEscape(ch2)) {
      state.lastIntValue = -1;
      state.advance();
      return CharSetOk;
    }
    var negate = false;
    if (state.switchU && this.options.ecmaVersion >= 9 && ((negate = ch2 === 80) || ch2 === 112)) {
      state.lastIntValue = -1;
      state.advance();
      var result;
      if (state.eat(
        123
        /* { */
      ) && (result = this.regexp_eatUnicodePropertyValueExpression(state)) && state.eat(
        125
        /* } */
      )) {
        if (negate && result === CharSetString) {
          state.raise("Invalid property name");
        }
        return result;
      }
      state.raise("Invalid property name");
    }
    return CharSetNone;
  };
  function isCharacterClassEscape(ch2) {
    return ch2 === 100 || ch2 === 68 || ch2 === 115 || ch2 === 83 || ch2 === 119 || ch2 === 87;
  }
  pp$1.regexp_eatUnicodePropertyValueExpression = function(state) {
    var start = state.pos;
    if (this.regexp_eatUnicodePropertyName(state) && state.eat(
      61
      /* = */
    )) {
      var name = state.lastStringValue;
      if (this.regexp_eatUnicodePropertyValue(state)) {
        var value = state.lastStringValue;
        this.regexp_validateUnicodePropertyNameAndValue(state, name, value);
        return CharSetOk;
      }
    }
    state.pos = start;
    if (this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
      var nameOrValue = state.lastStringValue;
      return this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue);
    }
    return CharSetNone;
  };
  pp$1.regexp_validateUnicodePropertyNameAndValue = function(state, name, value) {
    if (!hasOwn(state.unicodeProperties.nonBinary, name)) {
      state.raise("Invalid property name");
    }
    if (!state.unicodeProperties.nonBinary[name].test(value)) {
      state.raise("Invalid property value");
    }
  };
  pp$1.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
    if (state.unicodeProperties.binary.test(nameOrValue)) {
      return CharSetOk;
    }
    if (state.switchV && state.unicodeProperties.binaryOfStrings.test(nameOrValue)) {
      return CharSetString;
    }
    state.raise("Invalid property name");
  };
  pp$1.regexp_eatUnicodePropertyName = function(state) {
    var ch2 = 0;
    state.lastStringValue = "";
    while (isUnicodePropertyNameCharacter(ch2 = state.current())) {
      state.lastStringValue += codePointToString(ch2);
      state.advance();
    }
    return state.lastStringValue !== "";
  };
  function isUnicodePropertyNameCharacter(ch2) {
    return isControlLetter(ch2) || ch2 === 95;
  }
  pp$1.regexp_eatUnicodePropertyValue = function(state) {
    var ch2 = 0;
    state.lastStringValue = "";
    while (isUnicodePropertyValueCharacter(ch2 = state.current())) {
      state.lastStringValue += codePointToString(ch2);
      state.advance();
    }
    return state.lastStringValue !== "";
  };
  function isUnicodePropertyValueCharacter(ch2) {
    return isUnicodePropertyNameCharacter(ch2) || isDecimalDigit(ch2);
  }
  pp$1.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
    return this.regexp_eatUnicodePropertyValue(state);
  };
  pp$1.regexp_eatCharacterClass = function(state) {
    if (state.eat(
      91
      /* [ */
    )) {
      var negate = state.eat(
        94
        /* ^ */
      );
      var result = this.regexp_classContents(state);
      if (!state.eat(
        93
        /* ] */
      )) {
        state.raise("Unterminated character class");
      }
      if (negate && result === CharSetString) {
        state.raise("Negated character class may contain strings");
      }
      return true;
    }
    return false;
  };
  pp$1.regexp_classContents = function(state) {
    if (state.current() === 93) {
      return CharSetOk;
    }
    if (state.switchV) {
      return this.regexp_classSetExpression(state);
    }
    this.regexp_nonEmptyClassRanges(state);
    return CharSetOk;
  };
  pp$1.regexp_nonEmptyClassRanges = function(state) {
    while (this.regexp_eatClassAtom(state)) {
      var left = state.lastIntValue;
      if (state.eat(
        45
        /* - */
      ) && this.regexp_eatClassAtom(state)) {
        var right = state.lastIntValue;
        if (state.switchU && (left === -1 || right === -1)) {
          state.raise("Invalid character class");
        }
        if (left !== -1 && right !== -1 && left > right) {
          state.raise("Range out of order in character class");
        }
      }
    }
  };
  pp$1.regexp_eatClassAtom = function(state) {
    var start = state.pos;
    if (state.eat(
      92
      /* \ */
    )) {
      if (this.regexp_eatClassEscape(state)) {
        return true;
      }
      if (state.switchU) {
        var ch$1 = state.current();
        if (ch$1 === 99 || isOctalDigit(ch$1)) {
          state.raise("Invalid class escape");
        }
        state.raise("Invalid escape");
      }
      state.pos = start;
    }
    var ch2 = state.current();
    if (ch2 !== 93) {
      state.lastIntValue = ch2;
      state.advance();
      return true;
    }
    return false;
  };
  pp$1.regexp_eatClassEscape = function(state) {
    var start = state.pos;
    if (state.eat(
      98
      /* b */
    )) {
      state.lastIntValue = 8;
      return true;
    }
    if (state.switchU && state.eat(
      45
      /* - */
    )) {
      state.lastIntValue = 45;
      return true;
    }
    if (!state.switchU && state.eat(
      99
      /* c */
    )) {
      if (this.regexp_eatClassControlLetter(state)) {
        return true;
      }
      state.pos = start;
    }
    return this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state);
  };
  pp$1.regexp_classSetExpression = function(state) {
    var result = CharSetOk, subResult;
    if (this.regexp_eatClassSetRange(state)) ;
    else if (subResult = this.regexp_eatClassSetOperand(state)) {
      if (subResult === CharSetString) {
        result = CharSetString;
      }
      var start = state.pos;
      while (state.eatChars(
        [38, 38]
        /* && */
      )) {
        if (state.current() !== 38 && (subResult = this.regexp_eatClassSetOperand(state))) {
          if (subResult !== CharSetString) {
            result = CharSetOk;
          }
          continue;
        }
        state.raise("Invalid character in character class");
      }
      if (start !== state.pos) {
        return result;
      }
      while (state.eatChars(
        [45, 45]
        /* -- */
      )) {
        if (this.regexp_eatClassSetOperand(state)) {
          continue;
        }
        state.raise("Invalid character in character class");
      }
      if (start !== state.pos) {
        return result;
      }
    } else {
      state.raise("Invalid character in character class");
    }
    for (; ; ) {
      if (this.regexp_eatClassSetRange(state)) {
        continue;
      }
      subResult = this.regexp_eatClassSetOperand(state);
      if (!subResult) {
        return result;
      }
      if (subResult === CharSetString) {
        result = CharSetString;
      }
    }
  };
  pp$1.regexp_eatClassSetRange = function(state) {
    var start = state.pos;
    if (this.regexp_eatClassSetCharacter(state)) {
      var left = state.lastIntValue;
      if (state.eat(
        45
        /* - */
      ) && this.regexp_eatClassSetCharacter(state)) {
        var right = state.lastIntValue;
        if (left !== -1 && right !== -1 && left > right) {
          state.raise("Range out of order in character class");
        }
        return true;
      }
      state.pos = start;
    }
    return false;
  };
  pp$1.regexp_eatClassSetOperand = function(state) {
    if (this.regexp_eatClassSetCharacter(state)) {
      return CharSetOk;
    }
    return this.regexp_eatClassStringDisjunction(state) || this.regexp_eatNestedClass(state);
  };
  pp$1.regexp_eatNestedClass = function(state) {
    var start = state.pos;
    if (state.eat(
      91
      /* [ */
    )) {
      var negate = state.eat(
        94
        /* ^ */
      );
      var result = this.regexp_classContents(state);
      if (state.eat(
        93
        /* ] */
      )) {
        if (negate && result === CharSetString) {
          state.raise("Negated character class may contain strings");
        }
        return result;
      }
      state.pos = start;
    }
    if (state.eat(
      92
      /* \ */
    )) {
      var result$1 = this.regexp_eatCharacterClassEscape(state);
      if (result$1) {
        return result$1;
      }
      state.pos = start;
    }
    return null;
  };
  pp$1.regexp_eatClassStringDisjunction = function(state) {
    var start = state.pos;
    if (state.eatChars(
      [92, 113]
      /* \q */
    )) {
      if (state.eat(
        123
        /* { */
      )) {
        var result = this.regexp_classStringDisjunctionContents(state);
        if (state.eat(
          125
          /* } */
        )) {
          return result;
        }
      } else {
        state.raise("Invalid escape");
      }
      state.pos = start;
    }
    return null;
  };
  pp$1.regexp_classStringDisjunctionContents = function(state) {
    var result = this.regexp_classString(state);
    while (state.eat(
      124
      /* | */
    )) {
      if (this.regexp_classString(state) === CharSetString) {
        result = CharSetString;
      }
    }
    return result;
  };
  pp$1.regexp_classString = function(state) {
    var count = 0;
    while (this.regexp_eatClassSetCharacter(state)) {
      count++;
    }
    return count === 1 ? CharSetOk : CharSetString;
  };
  pp$1.regexp_eatClassSetCharacter = function(state) {
    var start = state.pos;
    if (state.eat(
      92
      /* \ */
    )) {
      if (this.regexp_eatCharacterEscape(state) || this.regexp_eatClassSetReservedPunctuator(state)) {
        return true;
      }
      if (state.eat(
        98
        /* b */
      )) {
        state.lastIntValue = 8;
        return true;
      }
      state.pos = start;
      return false;
    }
    var ch2 = state.current();
    if (ch2 < 0 || ch2 === state.lookahead() && isClassSetReservedDoublePunctuatorCharacter(ch2)) {
      return false;
    }
    if (isClassSetSyntaxCharacter(ch2)) {
      return false;
    }
    state.advance();
    state.lastIntValue = ch2;
    return true;
  };
  function isClassSetReservedDoublePunctuatorCharacter(ch2) {
    return ch2 === 33 || ch2 >= 35 && ch2 <= 38 || ch2 >= 42 && ch2 <= 44 || ch2 === 46 || ch2 >= 58 && ch2 <= 64 || ch2 === 94 || ch2 === 96 || ch2 === 126;
  }
  function isClassSetSyntaxCharacter(ch2) {
    return ch2 === 40 || ch2 === 41 || ch2 === 45 || ch2 === 47 || ch2 >= 91 && ch2 <= 93 || ch2 >= 123 && ch2 <= 125;
  }
  pp$1.regexp_eatClassSetReservedPunctuator = function(state) {
    var ch2 = state.current();
    if (isClassSetReservedPunctuator(ch2)) {
      state.lastIntValue = ch2;
      state.advance();
      return true;
    }
    return false;
  };
  function isClassSetReservedPunctuator(ch2) {
    return ch2 === 33 || ch2 === 35 || ch2 === 37 || ch2 === 38 || ch2 === 44 || ch2 === 45 || ch2 >= 58 && ch2 <= 62 || ch2 === 64 || ch2 === 96 || ch2 === 126;
  }
  pp$1.regexp_eatClassControlLetter = function(state) {
    var ch2 = state.current();
    if (isDecimalDigit(ch2) || ch2 === 95) {
      state.lastIntValue = ch2 % 32;
      state.advance();
      return true;
    }
    return false;
  };
  pp$1.regexp_eatHexEscapeSequence = function(state) {
    var start = state.pos;
    if (state.eat(
      120
      /* x */
    )) {
      if (this.regexp_eatFixedHexDigits(state, 2)) {
        return true;
      }
      if (state.switchU) {
        state.raise("Invalid escape");
      }
      state.pos = start;
    }
    return false;
  };
  pp$1.regexp_eatDecimalDigits = function(state) {
    var start = state.pos;
    var ch2 = 0;
    state.lastIntValue = 0;
    while (isDecimalDigit(ch2 = state.current())) {
      state.lastIntValue = 10 * state.lastIntValue + (ch2 - 48);
      state.advance();
    }
    return state.pos !== start;
  };
  function isDecimalDigit(ch2) {
    return ch2 >= 48 && ch2 <= 57;
  }
  pp$1.regexp_eatHexDigits = function(state) {
    var start = state.pos;
    var ch2 = 0;
    state.lastIntValue = 0;
    while (isHexDigit(ch2 = state.current())) {
      state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch2);
      state.advance();
    }
    return state.pos !== start;
  };
  function isHexDigit(ch2) {
    return ch2 >= 48 && ch2 <= 57 || ch2 >= 65 && ch2 <= 70 || ch2 >= 97 && ch2 <= 102;
  }
  function hexToInt(ch2) {
    if (ch2 >= 65 && ch2 <= 70) {
      return 10 + (ch2 - 65);
    }
    if (ch2 >= 97 && ch2 <= 102) {
      return 10 + (ch2 - 97);
    }
    return ch2 - 48;
  }
  pp$1.regexp_eatLegacyOctalEscapeSequence = function(state) {
    if (this.regexp_eatOctalDigit(state)) {
      var n1 = state.lastIntValue;
      if (this.regexp_eatOctalDigit(state)) {
        var n2 = state.lastIntValue;
        if (n1 <= 3 && this.regexp_eatOctalDigit(state)) {
          state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
        } else {
          state.lastIntValue = n1 * 8 + n2;
        }
      } else {
        state.lastIntValue = n1;
      }
      return true;
    }
    return false;
  };
  pp$1.regexp_eatOctalDigit = function(state) {
    var ch2 = state.current();
    if (isOctalDigit(ch2)) {
      state.lastIntValue = ch2 - 48;
      state.advance();
      return true;
    }
    state.lastIntValue = 0;
    return false;
  };
  function isOctalDigit(ch2) {
    return ch2 >= 48 && ch2 <= 55;
  }
  pp$1.regexp_eatFixedHexDigits = function(state, length) {
    var start = state.pos;
    state.lastIntValue = 0;
    for (var i = 0; i < length; ++i) {
      var ch2 = state.current();
      if (!isHexDigit(ch2)) {
        state.pos = start;
        return false;
      }
      state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch2);
      state.advance();
    }
    return true;
  };
  var Token = function Token2(p) {
    this.type = p.type;
    this.value = p.value;
    this.start = p.start;
    this.end = p.end;
    if (p.options.locations) {
      this.loc = new SourceLocation(p, p.startLoc, p.endLoc);
    }
    if (p.options.ranges) {
      this.range = [p.start, p.end];
    }
  };
  var pp2 = Parser.prototype;
  pp2.next = function(ignoreEscapeSequenceInKeyword) {
    if (!ignoreEscapeSequenceInKeyword && this.type.keyword && this.containsEsc) {
      this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword);
    }
    if (this.options.onToken) {
      this.options.onToken(new Token(this));
    }
    this.lastTokEnd = this.end;
    this.lastTokStart = this.start;
    this.lastTokEndLoc = this.endLoc;
    this.lastTokStartLoc = this.startLoc;
    this.nextToken();
  };
  pp2.getToken = function() {
    this.next();
    return new Token(this);
  };
  if (typeof Symbol !== "undefined") {
    pp2[Symbol.iterator] = function() {
      var this$1$1 = this;
      return {
        next: function() {
          var token = this$1$1.getToken();
          return {
            done: token.type === types$1.eof,
            value: token
          };
        }
      };
    };
  }
  pp2.nextToken = function() {
    var curContext = this.curContext();
    if (!curContext || !curContext.preserveSpace) {
      this.skipSpace();
    }
    this.start = this.pos;
    if (this.options.locations) {
      this.startLoc = this.curPosition();
    }
    if (this.pos >= this.input.length) {
      return this.finishToken(types$1.eof);
    }
    if (curContext.override) {
      return curContext.override(this);
    } else {
      this.readToken(this.fullCharCodeAtPos());
    }
  };
  pp2.readToken = function(code) {
    if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92) {
      return this.readWord();
    }
    return this.getTokenFromCode(code);
  };
  pp2.fullCharCodeAt = function(pos) {
    var code = this.input.charCodeAt(pos);
    if (code <= 55295 || code >= 56320) {
      return code;
    }
    var next = this.input.charCodeAt(pos + 1);
    return next <= 56319 || next >= 57344 ? code : (code << 10) + next - 56613888;
  };
  pp2.fullCharCodeAtPos = function() {
    return this.fullCharCodeAt(this.pos);
  };
  pp2.skipBlockComment = function() {
    var startLoc = this.options.onComment && this.curPosition();
    var start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
    if (end === -1) {
      this.raise(this.pos - 2, "Unterminated comment");
    }
    this.pos = end + 2;
    if (this.options.locations) {
      for (var nextBreak = void 0, pos = start; (nextBreak = nextLineBreak(this.input, pos, this.pos)) > -1; ) {
        ++this.curLine;
        pos = this.lineStart = nextBreak;
      }
    }
    if (this.options.onComment) {
      this.options.onComment(
        true,
        this.input.slice(start + 2, end),
        start,
        this.pos,
        startLoc,
        this.curPosition()
      );
    }
  };
  pp2.skipLineComment = function(startSkip) {
    var start = this.pos;
    var startLoc = this.options.onComment && this.curPosition();
    var ch2 = this.input.charCodeAt(this.pos += startSkip);
    while (this.pos < this.input.length && !isNewLine(ch2)) {
      ch2 = this.input.charCodeAt(++this.pos);
    }
    if (this.options.onComment) {
      this.options.onComment(
        false,
        this.input.slice(start + startSkip, this.pos),
        start,
        this.pos,
        startLoc,
        this.curPosition()
      );
    }
  };
  pp2.skipSpace = function() {
    loop: while (this.pos < this.input.length) {
      var ch2 = this.input.charCodeAt(this.pos);
      switch (ch2) {
        case 32:
        case 160:
          ++this.pos;
          break;
        case 13:
          if (this.input.charCodeAt(this.pos + 1) === 10) {
            ++this.pos;
          }
        case 10:
        case 8232:
        case 8233:
          ++this.pos;
          if (this.options.locations) {
            ++this.curLine;
            this.lineStart = this.pos;
          }
          break;
        case 47:
          switch (this.input.charCodeAt(this.pos + 1)) {
            case 42:
              this.skipBlockComment();
              break;
            case 47:
              this.skipLineComment(2);
              break;
            default:
              break loop;
          }
          break;
        default:
          if (ch2 > 8 && ch2 < 14 || ch2 >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch2))) {
            ++this.pos;
          } else {
            break loop;
          }
      }
    }
  };
  pp2.finishToken = function(type, val) {
    this.end = this.pos;
    if (this.options.locations) {
      this.endLoc = this.curPosition();
    }
    var prevType = this.type;
    this.type = type;
    this.value = val;
    this.updateContext(prevType);
  };
  pp2.readToken_dot = function() {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next >= 48 && next <= 57) {
      return this.readNumber(true);
    }
    var next2 = this.input.charCodeAt(this.pos + 2);
    if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) {
      this.pos += 3;
      return this.finishToken(types$1.ellipsis);
    } else {
      ++this.pos;
      return this.finishToken(types$1.dot);
    }
  };
  pp2.readToken_slash = function() {
    var next = this.input.charCodeAt(this.pos + 1);
    if (this.exprAllowed) {
      ++this.pos;
      return this.readRegexp();
    }
    if (next === 61) {
      return this.finishOp(types$1.assign, 2);
    }
    return this.finishOp(types$1.slash, 1);
  };
  pp2.readToken_mult_modulo_exp = function(code) {
    var next = this.input.charCodeAt(this.pos + 1);
    var size = 1;
    var tokentype = code === 42 ? types$1.star : types$1.modulo;
    if (this.options.ecmaVersion >= 7 && code === 42 && next === 42) {
      ++size;
      tokentype = types$1.starstar;
      next = this.input.charCodeAt(this.pos + 2);
    }
    if (next === 61) {
      return this.finishOp(types$1.assign, size + 1);
    }
    return this.finishOp(tokentype, size);
  };
  pp2.readToken_pipe_amp = function(code) {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === code) {
      if (this.options.ecmaVersion >= 12) {
        var next2 = this.input.charCodeAt(this.pos + 2);
        if (next2 === 61) {
          return this.finishOp(types$1.assign, 3);
        }
      }
      return this.finishOp(code === 124 ? types$1.logicalOR : types$1.logicalAND, 2);
    }
    if (next === 61) {
      return this.finishOp(types$1.assign, 2);
    }
    return this.finishOp(code === 124 ? types$1.bitwiseOR : types$1.bitwiseAND, 1);
  };
  pp2.readToken_caret = function() {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 61) {
      return this.finishOp(types$1.assign, 2);
    }
    return this.finishOp(types$1.bitwiseXOR, 1);
  };
  pp2.readToken_plus_min = function(code) {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === code) {
      if (next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))) {
        this.skipLineComment(3);
        this.skipSpace();
        return this.nextToken();
      }
      return this.finishOp(types$1.incDec, 2);
    }
    if (next === 61) {
      return this.finishOp(types$1.assign, 2);
    }
    return this.finishOp(types$1.plusMin, 1);
  };
  pp2.readToken_lt_gt = function(code) {
    var next = this.input.charCodeAt(this.pos + 1);
    var size = 1;
    if (next === code) {
      size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
      if (this.input.charCodeAt(this.pos + size) === 61) {
        return this.finishOp(types$1.assign, size + 1);
      }
      return this.finishOp(types$1.bitShift, size);
    }
    if (next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45) {
      this.skipLineComment(4);
      this.skipSpace();
      return this.nextToken();
    }
    if (next === 61) {
      size = 2;
    }
    return this.finishOp(types$1.relational, size);
  };
  pp2.readToken_eq_excl = function(code) {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 61) {
      return this.finishOp(types$1.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
    }
    if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) {
      this.pos += 2;
      return this.finishToken(types$1.arrow);
    }
    return this.finishOp(code === 61 ? types$1.eq : types$1.prefix, 1);
  };
  pp2.readToken_question = function() {
    var ecmaVersion = this.options.ecmaVersion;
    if (ecmaVersion >= 11) {
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === 46) {
        var next2 = this.input.charCodeAt(this.pos + 2);
        if (next2 < 48 || next2 > 57) {
          return this.finishOp(types$1.questionDot, 2);
        }
      }
      if (next === 63) {
        if (ecmaVersion >= 12) {
          var next2$1 = this.input.charCodeAt(this.pos + 2);
          if (next2$1 === 61) {
            return this.finishOp(types$1.assign, 3);
          }
        }
        return this.finishOp(types$1.coalesce, 2);
      }
    }
    return this.finishOp(types$1.question, 1);
  };
  pp2.readToken_numberSign = function() {
    var ecmaVersion = this.options.ecmaVersion;
    var code = 35;
    if (ecmaVersion >= 13) {
      ++this.pos;
      code = this.fullCharCodeAtPos();
      if (isIdentifierStart(code, true) || code === 92) {
        return this.finishToken(types$1.privateId, this.readWord1());
      }
    }
    this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
  };
  pp2.getTokenFromCode = function(code) {
    switch (code) {
      // The interpretation of a dot depends on whether it is followed
      // by a digit or another two dots.
      case 46:
        return this.readToken_dot();
      // Punctuation tokens.
      case 40:
        ++this.pos;
        return this.finishToken(types$1.parenL);
      case 41:
        ++this.pos;
        return this.finishToken(types$1.parenR);
      case 59:
        ++this.pos;
        return this.finishToken(types$1.semi);
      case 44:
        ++this.pos;
        return this.finishToken(types$1.comma);
      case 91:
        ++this.pos;
        return this.finishToken(types$1.bracketL);
      case 93:
        ++this.pos;
        return this.finishToken(types$1.bracketR);
      case 123:
        ++this.pos;
        return this.finishToken(types$1.braceL);
      case 125:
        ++this.pos;
        return this.finishToken(types$1.braceR);
      case 58:
        ++this.pos;
        return this.finishToken(types$1.colon);
      case 96:
        if (this.options.ecmaVersion < 6) {
          break;
        }
        ++this.pos;
        return this.finishToken(types$1.backQuote);
      case 48:
        var next = this.input.charCodeAt(this.pos + 1);
        if (next === 120 || next === 88) {
          return this.readRadixNumber(16);
        }
        if (this.options.ecmaVersion >= 6) {
          if (next === 111 || next === 79) {
            return this.readRadixNumber(8);
          }
          if (next === 98 || next === 66) {
            return this.readRadixNumber(2);
          }
        }
      // Anything else beginning with a digit is an integer, octal
      // number, or float.
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return this.readNumber(false);
      // Quotes produce strings.
      case 34:
      case 39:
        return this.readString(code);
      // Operators are parsed inline in tiny state machines. '=' (61) is
      // often referred to. `finishOp` simply skips the amount of
      // characters it is given as second argument, and returns a token
      // of the type given by its first argument.
      case 47:
        return this.readToken_slash();
      case 37:
      case 42:
        return this.readToken_mult_modulo_exp(code);
      case 124:
      case 38:
        return this.readToken_pipe_amp(code);
      case 94:
        return this.readToken_caret();
      case 43:
      case 45:
        return this.readToken_plus_min(code);
      case 60:
      case 62:
        return this.readToken_lt_gt(code);
      case 61:
      case 33:
        return this.readToken_eq_excl(code);
      case 63:
        return this.readToken_question();
      case 126:
        return this.finishOp(types$1.prefix, 1);
      case 35:
        return this.readToken_numberSign();
    }
    this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
  };
  pp2.finishOp = function(type, size) {
    var str = this.input.slice(this.pos, this.pos + size);
    this.pos += size;
    return this.finishToken(type, str);
  };
  pp2.readRegexp = function() {
    var escaped, inClass, start = this.pos;
    for (; ; ) {
      if (this.pos >= this.input.length) {
        this.raise(start, "Unterminated regular expression");
      }
      var ch2 = this.input.charAt(this.pos);
      if (lineBreak.test(ch2)) {
        this.raise(start, "Unterminated regular expression");
      }
      if (!escaped) {
        if (ch2 === "[") {
          inClass = true;
        } else if (ch2 === "]" && inClass) {
          inClass = false;
        } else if (ch2 === "/" && !inClass) {
          break;
        }
        escaped = ch2 === "\\";
      } else {
        escaped = false;
      }
      ++this.pos;
    }
    var pattern = this.input.slice(start, this.pos);
    ++this.pos;
    var flagsStart = this.pos;
    var flags = this.readWord1();
    if (this.containsEsc) {
      this.unexpected(flagsStart);
    }
    var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
    state.reset(start, pattern, flags);
    this.validateRegExpFlags(state);
    this.validateRegExpPattern(state);
    var value = null;
    try {
      value = new RegExp(pattern, flags);
    } catch (e) {
    }
    return this.finishToken(types$1.regexp, { pattern, flags, value });
  };
  pp2.readInt = function(radix, len, maybeLegacyOctalNumericLiteral) {
    var allowSeparators = this.options.ecmaVersion >= 12 && len === void 0;
    var isLegacyOctalNumericLiteral = maybeLegacyOctalNumericLiteral && this.input.charCodeAt(this.pos) === 48;
    var start = this.pos, total = 0, lastCode = 0;
    for (var i = 0, e = len == null ? Infinity : len; i < e; ++i, ++this.pos) {
      var code = this.input.charCodeAt(this.pos), val = void 0;
      if (allowSeparators && code === 95) {
        if (isLegacyOctalNumericLiteral) {
          this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals");
        }
        if (lastCode === 95) {
          this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore");
        }
        if (i === 0) {
          this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits");
        }
        lastCode = code;
        continue;
      }
      if (code >= 97) {
        val = code - 97 + 10;
      } else if (code >= 65) {
        val = code - 65 + 10;
      } else if (code >= 48 && code <= 57) {
        val = code - 48;
      } else {
        val = Infinity;
      }
      if (val >= radix) {
        break;
      }
      lastCode = code;
      total = total * radix + val;
    }
    if (allowSeparators && lastCode === 95) {
      this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits");
    }
    if (this.pos === start || len != null && this.pos - start !== len) {
      return null;
    }
    return total;
  };
  function stringToNumber(str, isLegacyOctalNumericLiteral) {
    if (isLegacyOctalNumericLiteral) {
      return parseInt(str, 8);
    }
    return parseFloat(str.replace(/_/g, ""));
  }
  function stringToBigInt(str) {
    if (typeof BigInt !== "function") {
      return null;
    }
    return BigInt(str.replace(/_/g, ""));
  }
  pp2.readRadixNumber = function(radix) {
    var start = this.pos;
    this.pos += 2;
    var val = this.readInt(radix);
    if (val == null) {
      this.raise(this.start + 2, "Expected number in radix " + radix);
    }
    if (this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110) {
      val = stringToBigInt(this.input.slice(start, this.pos));
      ++this.pos;
    } else if (isIdentifierStart(this.fullCharCodeAtPos())) {
      this.raise(this.pos, "Identifier directly after number");
    }
    return this.finishToken(types$1.num, val);
  };
  pp2.readNumber = function(startsWithDot) {
    var start = this.pos;
    if (!startsWithDot && this.readInt(10, void 0, true) === null) {
      this.raise(start, "Invalid number");
    }
    var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
    if (octal && this.strict) {
      this.raise(start, "Invalid number");
    }
    var next = this.input.charCodeAt(this.pos);
    if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110) {
      var val$1 = stringToBigInt(this.input.slice(start, this.pos));
      ++this.pos;
      if (isIdentifierStart(this.fullCharCodeAtPos())) {
        this.raise(this.pos, "Identifier directly after number");
      }
      return this.finishToken(types$1.num, val$1);
    }
    if (octal && /[89]/.test(this.input.slice(start, this.pos))) {
      octal = false;
    }
    if (next === 46 && !octal) {
      ++this.pos;
      this.readInt(10);
      next = this.input.charCodeAt(this.pos);
    }
    if ((next === 69 || next === 101) && !octal) {
      next = this.input.charCodeAt(++this.pos);
      if (next === 43 || next === 45) {
        ++this.pos;
      }
      if (this.readInt(10) === null) {
        this.raise(start, "Invalid number");
      }
    }
    if (isIdentifierStart(this.fullCharCodeAtPos())) {
      this.raise(this.pos, "Identifier directly after number");
    }
    var val = stringToNumber(this.input.slice(start, this.pos), octal);
    return this.finishToken(types$1.num, val);
  };
  pp2.readCodePoint = function() {
    var ch2 = this.input.charCodeAt(this.pos), code;
    if (ch2 === 123) {
      if (this.options.ecmaVersion < 6) {
        this.unexpected();
      }
      var codePos = ++this.pos;
      code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
      ++this.pos;
      if (code > 1114111) {
        this.invalidStringToken(codePos, "Code point out of bounds");
      }
    } else {
      code = this.readHexChar(4);
    }
    return code;
  };
  pp2.readString = function(quote) {
    var out = "", chunkStart = ++this.pos;
    for (; ; ) {
      if (this.pos >= this.input.length) {
        this.raise(this.start, "Unterminated string constant");
      }
      var ch2 = this.input.charCodeAt(this.pos);
      if (ch2 === quote) {
        break;
      }
      if (ch2 === 92) {
        out += this.input.slice(chunkStart, this.pos);
        out += this.readEscapedChar(false);
        chunkStart = this.pos;
      } else if (ch2 === 8232 || ch2 === 8233) {
        if (this.options.ecmaVersion < 10) {
          this.raise(this.start, "Unterminated string constant");
        }
        ++this.pos;
        if (this.options.locations) {
          this.curLine++;
          this.lineStart = this.pos;
        }
      } else {
        if (isNewLine(ch2)) {
          this.raise(this.start, "Unterminated string constant");
        }
        ++this.pos;
      }
    }
    out += this.input.slice(chunkStart, this.pos++);
    return this.finishToken(types$1.string, out);
  };
  var INVALID_TEMPLATE_ESCAPE_ERROR = {};
  pp2.tryReadTemplateToken = function() {
    this.inTemplateElement = true;
    try {
      this.readTmplToken();
    } catch (err) {
      if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
        this.readInvalidTemplateToken();
      } else {
        throw err;
      }
    }
    this.inTemplateElement = false;
  };
  pp2.invalidStringToken = function(position, message) {
    if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
      throw INVALID_TEMPLATE_ESCAPE_ERROR;
    } else {
      this.raise(position, message);
    }
  };
  pp2.readTmplToken = function() {
    var out = "", chunkStart = this.pos;
    for (; ; ) {
      if (this.pos >= this.input.length) {
        this.raise(this.start, "Unterminated template");
      }
      var ch2 = this.input.charCodeAt(this.pos);
      if (ch2 === 96 || ch2 === 36 && this.input.charCodeAt(this.pos + 1) === 123) {
        if (this.pos === this.start && (this.type === types$1.template || this.type === types$1.invalidTemplate)) {
          if (ch2 === 36) {
            this.pos += 2;
            return this.finishToken(types$1.dollarBraceL);
          } else {
            ++this.pos;
            return this.finishToken(types$1.backQuote);
          }
        }
        out += this.input.slice(chunkStart, this.pos);
        return this.finishToken(types$1.template, out);
      }
      if (ch2 === 92) {
        out += this.input.slice(chunkStart, this.pos);
        out += this.readEscapedChar(true);
        chunkStart = this.pos;
      } else if (isNewLine(ch2)) {
        out += this.input.slice(chunkStart, this.pos);
        ++this.pos;
        switch (ch2) {
          case 13:
            if (this.input.charCodeAt(this.pos) === 10) {
              ++this.pos;
            }
          case 10:
            out += "\n";
            break;
          default:
            out += String.fromCharCode(ch2);
            break;
        }
        if (this.options.locations) {
          ++this.curLine;
          this.lineStart = this.pos;
        }
        chunkStart = this.pos;
      } else {
        ++this.pos;
      }
    }
  };
  pp2.readInvalidTemplateToken = function() {
    for (; this.pos < this.input.length; this.pos++) {
      switch (this.input[this.pos]) {
        case "\\":
          ++this.pos;
          break;
        case "$":
          if (this.input[this.pos + 1] !== "{") {
            break;
          }
        // fall through
        case "`":
          return this.finishToken(types$1.invalidTemplate, this.input.slice(this.start, this.pos));
        case "\r":
          if (this.input[this.pos + 1] === "\n") {
            ++this.pos;
          }
        // fall through
        case "\n":
        case "\u2028":
        case "\u2029":
          ++this.curLine;
          this.lineStart = this.pos + 1;
          break;
      }
    }
    this.raise(this.start, "Unterminated template");
  };
  pp2.readEscapedChar = function(inTemplate) {
    var ch2 = this.input.charCodeAt(++this.pos);
    ++this.pos;
    switch (ch2) {
      case 110:
        return "\n";
      // 'n' -> '\n'
      case 114:
        return "\r";
      // 'r' -> '\r'
      case 120:
        return String.fromCharCode(this.readHexChar(2));
      // 'x'
      case 117:
        return codePointToString(this.readCodePoint());
      // 'u'
      case 116:
        return "	";
      // 't' -> '\t'
      case 98:
        return "\b";
      // 'b' -> '\b'
      case 118:
        return "\v";
      // 'v' -> '\u000b'
      case 102:
        return "\f";
      // 'f' -> '\f'
      case 13:
        if (this.input.charCodeAt(this.pos) === 10) {
          ++this.pos;
        }
      // '\r\n'
      case 10:
        if (this.options.locations) {
          this.lineStart = this.pos;
          ++this.curLine;
        }
        return "";
      case 56:
      case 57:
        if (this.strict) {
          this.invalidStringToken(
            this.pos - 1,
            "Invalid escape sequence"
          );
        }
        if (inTemplate) {
          var codePos = this.pos - 1;
          this.invalidStringToken(
            codePos,
            "Invalid escape sequence in template string"
          );
        }
      default:
        if (ch2 >= 48 && ch2 <= 55) {
          var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
          var octal = parseInt(octalStr, 8);
          if (octal > 255) {
            octalStr = octalStr.slice(0, -1);
            octal = parseInt(octalStr, 8);
          }
          this.pos += octalStr.length - 1;
          ch2 = this.input.charCodeAt(this.pos);
          if ((octalStr !== "0" || ch2 === 56 || ch2 === 57) && (this.strict || inTemplate)) {
            this.invalidStringToken(
              this.pos - 1 - octalStr.length,
              inTemplate ? "Octal literal in template string" : "Octal literal in strict mode"
            );
          }
          return String.fromCharCode(octal);
        }
        if (isNewLine(ch2)) {
          if (this.options.locations) {
            this.lineStart = this.pos;
            ++this.curLine;
          }
          return "";
        }
        return String.fromCharCode(ch2);
    }
  };
  pp2.readHexChar = function(len) {
    var codePos = this.pos;
    var n = this.readInt(16, len);
    if (n === null) {
      this.invalidStringToken(codePos, "Bad character escape sequence");
    }
    return n;
  };
  pp2.readWord1 = function() {
    this.containsEsc = false;
    var word = "", first = true, chunkStart = this.pos;
    var astral = this.options.ecmaVersion >= 6;
    while (this.pos < this.input.length) {
      var ch2 = this.fullCharCodeAtPos();
      if (isIdentifierChar(ch2, astral)) {
        this.pos += ch2 <= 65535 ? 1 : 2;
      } else if (ch2 === 92) {
        this.containsEsc = true;
        word += this.input.slice(chunkStart, this.pos);
        var escStart = this.pos;
        if (this.input.charCodeAt(++this.pos) !== 117) {
          this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX");
        }
        ++this.pos;
        var esc = this.readCodePoint();
        if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral)) {
          this.invalidStringToken(escStart, "Invalid Unicode escape");
        }
        word += codePointToString(esc);
        chunkStart = this.pos;
      } else {
        break;
      }
      first = false;
    }
    return word + this.input.slice(chunkStart, this.pos);
  };
  pp2.readWord = function() {
    var word = this.readWord1();
    var type = types$1.name;
    if (this.keywords.test(word)) {
      type = keywords[word];
    }
    return this.finishToken(type, word);
  };
  var version = "8.19.0";
  Parser.acorn = {
    Parser,
    version,
    defaultOptions,
    Position,
    SourceLocation,
    getLineInfo,
    Node,
    TokenType,
    tokTypes: types$1,
    keywordTypes: keywords,
    TokContext,
    tokContexts: types,
    isIdentifierChar,
    isIdentifierStart,
    Token,
    isNewLine,
    lineBreak,
    lineBreakG,
    nonASCIIwhitespace
  };
  function parse4(input, options) {
    return Parser.parse(input, options);
  }

  // node_modules/@strudel/transpiler/dist/index.mjs
  var import_escodegen = __toESM(require_escodegen(), 1);

  // node_modules/estree-walker/src/walker.js
  var WalkerBase = class {
    constructor() {
      this.should_skip = false;
      this.should_remove = false;
      this.replacement = null;
      this.context = {
        skip: () => this.should_skip = true,
        remove: () => this.should_remove = true,
        replace: (node) => this.replacement = node
      };
    }
    /**
     * @template {Node} Parent
     * @param {Parent | null | undefined} parent
     * @param {keyof Parent | null | undefined} prop
     * @param {number | null | undefined} index
     * @param {Node} node
     */
    replace(parent, prop, index, node) {
      if (parent && prop) {
        if (index != null) {
          parent[prop][index] = node;
        } else {
          parent[prop] = node;
        }
      }
    }
    /**
     * @template {Node} Parent
     * @param {Parent | null | undefined} parent
     * @param {keyof Parent | null | undefined} prop
     * @param {number | null | undefined} index
     */
    remove(parent, prop, index) {
      if (parent && prop) {
        if (index !== null && index !== void 0) {
          parent[prop].splice(index, 1);
        } else {
          delete parent[prop];
        }
      }
    }
  };

  // node_modules/estree-walker/src/sync.js
  var SyncWalker = class extends WalkerBase {
    /**
     *
     * @param {SyncHandler} [enter]
     * @param {SyncHandler} [leave]
     */
    constructor(enter, leave) {
      super();
      this.should_skip = false;
      this.should_remove = false;
      this.replacement = null;
      this.context = {
        skip: () => this.should_skip = true,
        remove: () => this.should_remove = true,
        replace: (node) => this.replacement = node
      };
      this.enter = enter;
      this.leave = leave;
    }
    /**
     * @template {Node} Parent
     * @param {Node} node
     * @param {Parent | null} parent
     * @param {keyof Parent} [prop]
     * @param {number | null} [index]
     * @returns {Node | null}
     */
    visit(node, parent, prop, index) {
      if (node) {
        if (this.enter) {
          const _should_skip = this.should_skip;
          const _should_remove = this.should_remove;
          const _replacement = this.replacement;
          this.should_skip = false;
          this.should_remove = false;
          this.replacement = null;
          this.enter.call(this.context, node, parent, prop, index);
          if (this.replacement) {
            node = this.replacement;
            this.replace(parent, prop, index, node);
          }
          if (this.should_remove) {
            this.remove(parent, prop, index);
          }
          const skipped = this.should_skip;
          const removed = this.should_remove;
          this.should_skip = _should_skip;
          this.should_remove = _should_remove;
          this.replacement = _replacement;
          if (skipped) return node;
          if (removed) return null;
        }
        let key;
        for (key in node) {
          const value = node[key];
          if (value && typeof value === "object") {
            if (Array.isArray(value)) {
              const nodes = (
                /** @type {Array<unknown>} */
                value
              );
              for (let i = 0; i < nodes.length; i += 1) {
                const item = nodes[i];
                if (isNode(item)) {
                  if (!this.visit(item, node, key, i)) {
                    i--;
                  }
                }
              }
            } else if (isNode(value)) {
              this.visit(value, node, key, null);
            }
          }
        }
        if (this.leave) {
          const _replacement = this.replacement;
          const _should_remove = this.should_remove;
          this.replacement = null;
          this.should_remove = false;
          this.leave.call(this.context, node, parent, prop, index);
          if (this.replacement) {
            node = this.replacement;
            this.replace(parent, prop, index, node);
          }
          if (this.should_remove) {
            this.remove(parent, prop, index);
          }
          const removed = this.should_remove;
          this.replacement = _replacement;
          this.should_remove = _should_remove;
          if (removed) return null;
        }
      }
      return node;
    }
  };
  function isNode(value) {
    return value !== null && typeof value === "object" && "type" in value && typeof value.type === "string";
  }

  // node_modules/estree-walker/src/index.js
  function walk(ast, { enter, leave }) {
    const instance = new SyncWalker(enter, leave);
    return instance.visit(ast, null);
  }

  // node_modules/@strudel/transpiler/dist/index.mjs
  var P3 = [];
  var E3 = /* @__PURE__ */ new Map();
  function F3(e, t = {}) {
    const { wrapAsync: n = false, addReturn: a2 = true, emitMiniLocations: i = true, emitWidgets: p = true } = t, f3 = [];
    let l2 = parse4(e, {
      ecmaVersion: 2022,
      allowAwaitOutsideFunction: true,
      locations: true,
      onComment: f3
    });
    const m3 = ce3(f3, e.length);
    let c3 = [];
    const b2 = (r, x2) => {
      const s2 = E3.get("minilang");
      if (s2) {
        const u2 = `[${r}]`, o = s2.getLocations(u2, x2.start);
        c3 = c3.concat(o);
      } else {
        const u2 = Yr2(`"${r}"`, x2.start, e);
        c3 = c3.concat(u2);
      }
    };
    let y2 = [];
    walk(l2, {
      enter(r, x2) {
        if (se2(r)) {
          const { name: s2 } = r.tag, u2 = E3.get(s2), o = r.quasi.quasis[0].value.raw, h = r.quasi.start + 1;
          if (i) {
            const C4 = u2.getLocations(o, h);
            c3 = c3.concat(C4);
          }
          return this.skip(), this.replace(ue4(s2, o, h));
        }
        if (le2(r, "tidal")) {
          const s2 = r.quasi.quasis[0].value.raw, u2 = r.quasi.start + 1;
          if (i) {
            const o = oe3(s2, u2);
            c3 = c3.concat(o);
          }
          return this.skip(), this.replace(pe3(s2, u2));
        }
        if (U4(r, x2)) {
          if (q3(r.start, m3))
            return;
          const { quasis: s2 } = r, { raw: u2 } = s2[0].value;
          return this.skip(), i && b2(u2, r), this.replace(T2(u2, r));
        }
        if (G2(r)) {
          if (q3(r.start, m3))
            return;
          const { value: s2 } = r;
          return this.skip(), i && b2(s2, r), this.replace(T2(s2, r));
        }
        if (X(r))
          return p && y2.push({
            from: r.arguments[0].start,
            to: r.arguments[0].end,
            value: r.arguments[0].raw,
            // don't use value!
            min: r.arguments[1]?.value ?? 0,
            max: r.arguments[2]?.value ?? 1,
            step: r.arguments[3]?.value,
            type: "slider"
          }), this.replace(Z4(r));
        if (Y3(r)) {
          const s2 = r.callee.property.name, u2 = y2.filter((h) => h.type === s2).length, o = {
            to: r.end,
            index: u2,
            type: s2,
            id: t.id
          };
          return p && y2.push(o), this.replace(te4(r, o));
        }
        if (re3(r, x2))
          return this.replace(ne3(r));
        if (ie3(r))
          return this.replace(ae2(r));
      },
      leave(r, x2, s2, u2) {
        if (!R2(r)) return;
        let [o, ...h] = r.arguments;
        if (!o) throw new Error("K(...) requires an expression");
        _2(o) && (o = {
          type: "CallExpression",
          callee: o,
          arguments: [],
          optional: false
        });
        const { template: C4, patternExprs: k3 } = B3(o);
        if (k3.length) {
          const d2 = [{ type: "Literal", value: C4 }, ...k3, ...h];
          let L4 = r.callee;
          return L4.type === "ChainExpression" && (L4 = L4.expression), L4.type === "MemberExpression" ? this.replace({
            type: "CallExpression",
            callee: W4(L4.object),
            arguments: d2,
            optional: false
          }) : this.replace({
            type: "CallExpression",
            callee: { type: "Identifier", name: "worklet" },
            arguments: d2,
            optional: false
          });
        }
        const M2 = [{ type: "Literal", value: S4(o) }, ...h];
        let w3 = r.callee;
        return w3.type === "ChainExpression" && (w3 = w3.expression), w3.type === "MemberExpression" ? this.replace({
          type: "CallExpression",
          callee: W4(w3.object),
          arguments: M2,
          optional: false
        }) : this.replace({
          type: "CallExpression",
          callee: { type: "Identifier", name: "worklet" },
          arguments: M2,
          optional: false
        });
      }
    });
    let { body: g2 } = l2;
    if (!g2.length)
      console.warn("empty body -> fallback to silence"), g2.push({
        type: "ExpressionStatement",
        expression: {
          type: "Identifier",
          name: "silence"
        }
      });
    else if (!g2?.[g2.length - 1]?.expression)
      throw new Error("unexpected ast format without body expression");
    if (a2) {
      const { expression: r } = g2[g2.length - 1];
      g2[g2.length - 1] = {
        type: "ReturnStatement",
        argument: r
      };
    }
    let v = import_escodegen.default.generate(l2);
    return n && (v = `(async ()=>{${v}})()`), i ? { output: v, miniLocations: c3, widgets: y2 } : { output: v };
  }
  function R2(e) {
    if (e.type !== "CallExpression") return false;
    let t = e.callee;
    return t.type === "ChainExpression" && (t = t.expression), t.type === "MemberExpression" ? !t.computed && t.property?.name === "K" : t.type === "Identifier" && t.name === "K";
  }
  function _2(e) {
    return e.type !== "ArrowFunctionExpression" && e.type !== "FunctionExpression" || e.params.length ? false : e.body?.type === "BlockStatement";
  }
  function S4(e) {
    return import_escodegen.default.generate(e, { format: { semicolons: false } });
  }
  function B3(e) {
    const t = I2(e), n = /* @__PURE__ */ new Map(), a2 = [];
    if (walk(t, {
      enter(l2, m3, c3, b2) {
        n.set(l2, { parent: m3, prop: c3, index: b2 });
        const y2 = J3(l2);
        y2 && (a2.push({ node: l2, patternExpr: y2 }), this.skip());
      }
    }), !a2.length)
      return { template: S4(t), patternExprs: [] };
    a2.sort((l2, m3) => A3(l2.node) - A3(m3.node));
    const i = a2.map(({ patternExpr: l2 }) => I2(l2));
    let p = t;
    return a2.forEach(({ node: l2 }, m3) => {
      p = z3(l2, V3(m3), n, p);
    }), { template: S4(p), patternExprs: i };
  }
  function J3(e) {
    if (H2(e)) {
      const t = e.arguments?.[0];
      if (!t)
        throw new Error("S(...) requires an argument");
      return t;
    }
    return j3(e) ? e : null;
  }
  function H2(e) {
    if (e.type !== "CallExpression")
      return false;
    const t = e.callee;
    return t.type === "Identifier" ? t.name === "S" : t.type === "MemberExpression" && !t.computed ? t.property?.name === "S" : false;
  }
  function Q4() {
    return E3.get("minilang")?.name || "m";
  }
  function j3(e) {
    if (e.type !== "CallExpression")
      return false;
    const t = e.callee;
    if (t.type !== "Identifier" || t.name !== Q4())
      return false;
    const n = e.arguments?.[0];
    return n?.type === "Literal" && typeof n.value == "string";
  }
  function A3(e) {
    if (typeof e.start == "number")
      return e.start;
    if (j3(e)) {
      const t = e.arguments?.[1];
      if (t?.type === "Literal" && typeof t.value == "number")
        return t.value;
    }
    return 0;
  }
  function V3(e) {
    return {
      type: "MemberExpression",
      object: { type: "Identifier", name: "pat" },
      property: { type: "Literal", value: e },
      computed: true,
      optional: false
    };
  }
  function z3(e, t, n, a2) {
    const i = n.get(e);
    if (!i || !i.parent)
      return t;
    const { parent: p, prop: f3, index: l2 } = i;
    return Array.isArray(p[f3]) ? p[f3][l2] = t : p[f3] = t, n.set(t, { parent: p, prop: f3, index: l2 }), a2;
  }
  function I2(e) {
    return JSON.parse(JSON.stringify(e));
  }
  function W4(e) {
    return {
      type: "MemberExpression",
      object: e,
      property: { type: "Identifier", name: "worklet" },
      computed: false,
      optional: false
    };
  }
  function G2(e, t, n) {
    return e.type !== "Literal" ? false : e.raw[0] === '"';
  }
  function U4(e, t) {
    return e.type === "TemplateLiteral" && t.type !== "TaggedTemplateExpression";
  }
  function T2(e, t) {
    const { start: n } = t, a2 = E3.get("minilang");
    let i = "m";
    return a2 && a2.name && (i = a2.name), {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: i
      },
      arguments: [
        { type: "Literal", value: e },
        { type: "Literal", value: n }
      ],
      optional: false
    };
  }
  function X(e) {
    return e.type === "CallExpression" && e.callee.name === "slider";
  }
  function Y3(e) {
    return e.type === "CallExpression" && P3.includes(e.callee.property?.name);
  }
  function Z4(e) {
    const t = "slider_" + e.arguments[0].start;
    return e.arguments.unshift({
      type: "Literal",
      value: t,
      raw: t
    }), e.callee.name = "sliderWithID", e;
  }
  function ee4(e) {
    return `${e.id || ""}_widget_${e.type}_${e.index}`;
  }
  function te4(e, t) {
    const n = ee4(t);
    return e.arguments.unshift({
      type: "Literal",
      value: n,
      raw: n
    }), e;
  }
  function re3(e, t) {
    return e.type === "CallExpression" && e.callee.name === "samples" && t.type !== "AwaitExpression";
  }
  function ne3(e) {
    return {
      type: "AwaitExpression",
      argument: e
    };
  }
  function ie3(e) {
    return e.type === "LabeledStatement";
  }
  function ae2(e) {
    return {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "MemberExpression",
          object: e.body.expression,
          property: {
            type: "Identifier",
            name: "p"
          }
        },
        arguments: [
          {
            type: "Literal",
            value: e.label.name,
            raw: `'${e.label.name}'`
          }
        ]
      }
    };
  }
  function se2(e) {
    return e.type === "TaggedTemplateExpression" && E3.has(e.tag.name);
  }
  function le2(e, t) {
    return e.type === "TaggedTemplateExpression" && e.tag.name === t;
  }
  function oe3(e, t) {
    return e.split("").reduce((n, a2, i) => (a2 !== '"' || (!n.length || n[n.length - 1].length > 1 ? n.push([i + 1]) : n[n.length - 1].push(i)), n), []).map(([n, a2]) => {
      const i = e.slice(n, a2);
      return Yr2(`"${i}"`, t + n - 1);
    }).flat();
  }
  function pe3(e, t) {
    return {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: "tidal"
      },
      arguments: [
        { type: "Literal", value: e },
        { type: "Literal", value: t }
      ],
      optional: false
    };
  }
  function ue4(e, t, n) {
    return {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: e
      },
      arguments: [
        { type: "Literal", value: t },
        { type: "Literal", value: n }
      ],
      optional: false
    };
  }
  function ce3(e, t) {
    const n = [], a2 = [];
    for (const i of e) {
      const p = i.value.trim();
      if (p.startsWith("mini-off"))
        a2.push(i.start);
      else if (p.startsWith("mini-on")) {
        const f3 = a2.pop();
        n.push([f3, i.end]);
      }
    }
    for (; a2.length; ) {
      const i = a2.pop();
      n.push([i, t]);
    }
    return n;
  }
  function q3(e, t) {
    for (const [n, a2] of t)
      if (e >= n && e < a2)
        return true;
    return false;
  }

  // entry.mjs
  for (const mod of [dist_exports, dist_exports2]) {
    for (const [name, value] of Object.entries(mod)) {
      globalThis[name] = value;
    }
  }
  Qr2();
  var TIME_DEN = 1 << 16;
  var toFraction = (x2) => new Fraction(Math.round(x2 * TIME_DEN), TIME_DEN);
  var patterns = /* @__PURE__ */ new Map();
  var columns = /* @__PURE__ */ new Map();
  var errorText = (e) => String(e && e.message || e);
  function evalCell(code) {
    const out = F3(code, { wrapAsync: false, addReturn: true, emitMiniLocations: false, emitWidgets: false });
    return new Function(out.output)();
  }
  globalThis.descartes_compile = (id2, code) => {
    try {
      let pat;
      try {
        pat = evalCell(code);
      } catch (e) {
        const looksLikeMini = !/\w\s*\(/.test(code);
        const fallbackable = e instanceof SyntaxError || e instanceof ReferenceError || /Unexpected (token|character)/.test(errorText(e));
        if (!(fallbackable && looksLikeMini)) throw e;
        pat = Ks(te3(code));
      }
      if (!pe2(pat)) {
        pat = Ks(te3(String(code)));
      }
      patterns.set(String(id2), pat);
      return "";
    } catch (e) {
      patterns.delete(String(id2));
      return errorText(e);
    }
  };
  globalThis.descartes_buildColumn = (colId, starterId, stepsJson, resolution) => {
    try {
      const starter = patterns.get(String(starterId));
      if (!starter) return `unknown starter ${starterId}`;
      const n = Math.max(1, resolution | 0);
      const layers = [starter];
      for (const [k3, cellId, speed] of JSON.parse(stepsJson)) {
        let p = patterns.get(String(cellId));
        if (!p) continue;
        if (speed != null && speed !== 1) p = p.fast(speed);
        layers.push(p.compress(new Fraction(k3, n), new Fraction(k3 + 1, n)));
      }
      columns.set(String(colId), layers.length === 1 ? starter : z(...layers));
      return "";
    } catch (e) {
      return errorText(e);
    }
  };
  var toMidi = (v) => {
    if (v == null) return null;
    if (typeof v === "object") {
      if (v.note != null) return toMidi(v.note);
      if (v.n != null && typeof v.n === "number") return v.n;
      return null;
    }
    if (typeof v === "number") return v;
    if (typeof v === "string" && Mt2(v)) return gt2(v);
    return null;
  };
  globalThis.descartes_query = (colId, begin, end) => {
    const pat = columns.get(String(colId));
    const out = [];
    if (!pat) return out;
    for (const hap of pat.queryArc(toFraction(begin), toFraction(end))) {
      if (!hap.hasOnset()) continue;
      const midi2 = toMidi(hap.value);
      if (midi2 == null) continue;
      const vel = typeof hap.value === "object" && hap.value != null ? hap.value.velocity ?? hap.value.gain ?? 1 : 1;
      out.push(hap.whole.begin.valueOf(), hap.whole.end.valueOf(), midi2, Number(vel));
    }
    return out;
  };
})();
/*! Bundled license information:

fraction.js/fraction.js:
  (**
   * @license Fraction.js v4.3.7 31/08/2023
   * https://www.xarg.org/2014/03/rational-numbers-in-javascript/
   *
   * Copyright (c) 2023, Robert Eisele (robert@raw.org)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   **)
*/
