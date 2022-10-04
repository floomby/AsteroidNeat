var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
require(['index']);
define("asteroids", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = [
        {
            heading: { x: 0.24659300101214976, y: -0.11066311653737948 },
            position: { x: 639.5966589923804, y: 300.9383572452827 },
            speed: 1.7741208522201983,
            radius: 20,
        },
        {
            heading: { x: 0.425045855226285, y: 0.1585146371754138 },
            position: { x: 175.93979689915304, y: 55.8658023526839 },
            speed: 1.5987627238451405,
            radius: 20,
        },
        {
            heading: { x: -0.2642206069173445, y: 0.05529981796292205 },
            position: { x: 712.5153863645352, y: 231.36527779070124 },
            speed: 1.8005509086003744,
            radius: 20,
        },
        {
            heading: { x: 0.0721580491949716, y: 0.4953368952530812 },
            position: { x: 46.33964388999399, y: 335.232460239502 },
            speed: 1.860982760701861,
            radius: 20,
        },
        {
            heading: { x: -0.21287487040214037, y: -0.27552644966104034 },
            position: { x: 45.2990049624411, y: 252.44789330746315 },
            speed: 1.5276663659690106,
            radius: 20,
        },
        {
            heading: { x: -0.3794020158765181, y: 0.0019672949962568076 },
            position: { x: 606.577621502165, y: 244.81867559220584 },
            speed: 1.5069666901051884,
            radius: 20,
        },
        {
            heading: { x: 0.3240204427341242, y: 0.27861700452229377 },
            position: { x: 375.19134792941816, y: 470.6943845938987 },
            speed: 1.694472290807933,
            radius: 20,
        },
        {
            heading: { x: 0.06344771387787196, y: 0.17325274855879025 },
            position: { x: 642.8979821015399, y: 384.63862705594795 },
            speed: 1.9088297169156001,
            radius: 20,
        },
        {
            heading: { x: 0.3171709782804266, y: -0.2010902269328383 },
            position: { x: 642.4963296133099, y: 66.89841381950261 },
            speed: 1.30632256544642145,
            radius: 20,
        },
        {
            heading: { x: 0.24977928600685595, y: -0.48351304373469217 },
            position: { x: 679.2011628182141, y: 597.2789625771209 },
            speed: 1.9449852402166208,
            radius: 20,
        },
    ];
});
// import assert from "assert";
define("neat", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isInputNode = exports.isOutputNode = exports.isHiddenNode = exports.crossover = exports.geneticDistance = exports.topologicalInsertionMutation = exports.topologicalConnectionMutation = exports.insertEdgeMutation = exports.connectMutation = exports.mutateWeights = exports.computePlan = exports.printPlan = exports.printGenome = exports.compute = exports.progenerate = void 0;
    var cloneGenome = function (genome) {
        return {
            domain: genome.domain,
            edges: genome.edges.map(function (edge) { return (__assign({}, edge)); }),
            nodeCount: genome.nodeCount,
        };
    };
    var isInputNode = function (genome, node) {
        return node < genome.domain.inputs;
    };
    exports.isInputNode = isInputNode;
    var isOutputNode = function (genome, node) {
        return node >= genome.domain.inputs && node < genome.domain.inputs + genome.domain.outputs;
    };
    exports.isOutputNode = isOutputNode;
    var isHiddenNode = function (genome, node) {
        return node >= genome.domain.inputs + genome.domain.outputs;
    };
    exports.isHiddenNode = isHiddenNode;
    var canConnect = function (genome, from, to) {
        var e_1, _a;
        if (isInputNode(genome, to)) {
            return false;
        }
        if (isOutputNode(genome, from)) {
            return false;
        }
        // check if there is a cycle
        var visited = new Set();
        var queue = [to];
        while (queue.length > 0) {
            var node = queue.pop();
            if (node === from) {
                return false;
            }
            if (visited.has(node)) {
                continue;
            }
            visited.add(node);
            try {
                for (var _b = (e_1 = void 0, __values(genome.edges)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var edge = _c.value;
                    if (edge.from === node && edge.enabled) {
                        queue.push(edge.to);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return true;
    };
    var onlyNew = function (genome) {
        var innovationBound = genome.domain.inputs + genome.domain.outputs;
        return {
            domain: genome.domain,
            edges: genome.edges.filter(function (edge) { return edge.innovation >= innovationBound; }),
            nodeCount: genome.nodeCount,
        };
    };
    // I thought that cycles appearing was a bug, but it is not.
    // The appearance of cycles is consistent with what is outlined in the paper.
    // Nevertheless the crossover rejects cycles when creating a merged topology.
    var crossover = function (a, b) {
        var e_2, _a, e_3, _b, e_4, _c;
        console.assert(a.domain.inputs === b.domain.inputs);
        console.assert(a.domain.outputs === b.domain.outputs);
        var innovations = new Set();
        try {
            for (var _d = __values(a.edges), _e = _d.next(); !_e.done; _e = _d.next()) {
                var edge = _e.value;
                innovations.add(edge.innovation);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_2) throw e_2.error; }
        }
        try {
            for (var _f = __values(b.edges), _g = _f.next(); !_g.done; _g = _f.next()) {
                var edge = _g.value;
                innovations.add(edge.innovation);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var edges = [];
        var _loop_1 = function (innovation) {
            var edgeA = a.edges.find(function (edge) { return edge.innovation === innovation; });
            var edgeB = b.edges.find(function (edge) { return edge.innovation === innovation; });
            if (!edgeA) {
                if (!canConnect({ domain: a.domain, edges: edges, nodeCount: Math.max(a.nodeCount, b.nodeCount) }, edgeB.from, edgeB.to)) {
                    console.log("Cannot connect", edgeB.from, edgeB.to);
                    return "continue";
                }
                edges.push(edgeB);
                return "continue";
            }
            else if (!edgeB) {
                edges.push(edgeA);
                if (!canConnect({ domain: a.domain, edges: edges, nodeCount: Math.max(a.nodeCount, b.nodeCount) }, edgeA.from, edgeA.to)) {
                    console.log("Cannot connect", edgeA.from, edgeA.to);
                    return "continue";
                }
                return "continue";
            }
            console.assert(edgeA.from === edgeB.from);
            console.assert(edgeA.to === edgeB.to);
            if (!canConnect({ domain: a.domain, edges: edges, nodeCount: Math.max(a.nodeCount, b.nodeCount) }, edgeA.from, edgeA.to)) {
                console.log("Cannot connect", edgeA.from, edgeA.to);
                return "continue";
            }
            edges.push({
                from: edgeA.from,
                to: edgeA.to,
                weight: Math.random() < 0.5 ? edgeA.weight : edgeB.weight,
                innovation: innovation,
                enabled: edgeA.enabled && edgeB.enabled,
            });
        };
        try {
            for (var innovations_1 = __values(innovations), innovations_1_1 = innovations_1.next(); !innovations_1_1.done; innovations_1_1 = innovations_1.next()) {
                var innovation = innovations_1_1.value;
                _loop_1(innovation);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (innovations_1_1 && !innovations_1_1.done && (_c = innovations_1.return)) _c.call(innovations_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return {
            domain: a.domain,
            edges: edges,
            nodeCount: Math.max(a.nodeCount, b.nodeCount),
        };
    };
    exports.crossover = crossover;
    var insertEdgeMutation = function (genome, edgeIndex, innovation) {
        var edges = genome.edges.map(function (edge) { return (__assign({}, edge)); });
        var edge = edges[edgeIndex];
        console.assert(edge.enabled);
        edge.enabled = false;
        edges.push({
            from: edge.from,
            to: genome.nodeCount,
            weight: edge.weight,
            innovation: innovation,
            enabled: true,
        });
        // console.log("innovation", innovation);
        edges.push({
            from: genome.nodeCount,
            to: edge.to,
            weight: 0.75 + Math.random() * 0.5,
            innovation: innovation + 1,
            enabled: true,
        });
        // console.log("innovation", innovation + 1);
        return {
            genome: {
                domain: genome.domain,
                edges: edges,
                nodeCount: genome.nodeCount + 1,
            },
            innovationIndex: innovation + 2,
        };
    };
    exports.insertEdgeMutation = insertEdgeMutation;
    var connectMutation = function (genome, innovation, from, to) {
        console.assert(to !== from);
        console.assert(to < genome.nodeCount);
        console.assert(from < genome.nodeCount);
        var edgeCheck = genome.edges.find(function (edge) { return edge.from === from && edge.to === to; });
        if (edgeCheck) {
            return { genome: genome, innovationIndex: innovation };
        }
        var edges = genome.edges.map(function (edge) { return (__assign({}, edge)); });
        edges.push({
            from: from,
            to: to,
            weight: Math.random() * 0.5 - 0.25,
            innovation: innovation,
            enabled: true,
        });
        // console.log("innovation", innovation);
        return {
            genome: {
                domain: genome.domain,
                edges: edges,
                nodeCount: genome.nodeCount,
            },
            innovationIndex: innovation + 1,
        };
    };
    exports.connectMutation = connectMutation;
    var connectableTo = function (genome, from) {
        var nodes = [];
        for (var i = 0; i < genome.nodeCount; i++) {
            if (canConnect(genome, from, i)) {
                nodes.push(i);
            }
        }
        return nodes;
    };
    var connectableFrom = function (genome, to) {
        var nodes = [];
        for (var i = 0; i < genome.nodeCount; i++) {
            if (canConnect(genome, i, to)) {
                nodes.push(i);
            }
        }
        return nodes;
    };
    var topologicalConnectionMutation = function (genome, innovation) {
        // let randomHiddenOrOutputNode = Math.floor(Math.random() * (genome.nodeCount - genome.domain.inputs)) + genome.domain.inputs;
        // const connectable = allConnectable(genome, randomHiddenOrOutputNode);
        // if (connectable.length === 0) {
        //   return { genome, innovationIndex: innovation };
        // }
        // const randomConnectable = connectable[Math.floor(Math.random() * connectable.length)];
        // return connectMutation(genome, innovation, randomConnectable, randomHiddenOrOutputNode);
        throw new Error("not implemented");
    };
    exports.topologicalConnectionMutation = topologicalConnectionMutation;
    var acceptConnectionRate = 0.02;
    var topologicalInsertionMutation = function (genome, innovation) {
        var e_5, _a, e_6, _b;
        var randomEdgeIndex = -1;
        while (randomEdgeIndex === -1) {
            randomEdgeIndex = Math.floor(Math.random() * genome.edges.length);
            if (!genome.edges[randomEdgeIndex].enabled) {
                randomEdgeIndex = -1;
            }
        }
        var done = insertEdgeMutation(genome, randomEdgeIndex, innovation);
        var newGenome = done.genome;
        var newInnovation = done.innovationIndex;
        // connect every possible node to the new node
        var connectTo = connectableTo(newGenome, newGenome.nodeCount - 1);
        try {
            for (var connectTo_1 = __values(connectTo), connectTo_1_1 = connectTo_1.next(); !connectTo_1_1.done; connectTo_1_1 = connectTo_1.next()) {
                var connectableNode = connectTo_1_1.value;
                if (Math.random() < acceptConnectionRate) {
                    done = connectMutation(newGenome, newInnovation, newGenome.nodeCount - 1, connectableNode);
                    newGenome = done.genome;
                    newInnovation = done.innovationIndex;
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (connectTo_1_1 && !connectTo_1_1.done && (_a = connectTo_1.return)) _a.call(connectTo_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        var connectFrom = connectableFrom(newGenome, newGenome.nodeCount - 1);
        try {
            for (var connectFrom_1 = __values(connectFrom), connectFrom_1_1 = connectFrom_1.next(); !connectFrom_1_1.done; connectFrom_1_1 = connectFrom_1.next()) {
                var connectableNode = connectFrom_1_1.value;
                if (Math.random() < acceptConnectionRate) {
                    done = connectMutation(newGenome, newInnovation, connectableNode, newGenome.nodeCount - 1);
                    newGenome = done.genome;
                    newInnovation = done.innovationIndex;
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (connectFrom_1_1 && !connectFrom_1_1.done && (_b = connectFrom_1.return)) _b.call(connectFrom_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return { genome: newGenome, innovationIndex: newInnovation };
    };
    exports.topologicalInsertionMutation = topologicalInsertionMutation;
    var printGenome = function (genome) {
        var e_7, _a;
        console.log("Genome: ".concat(genome.nodeCount, " nodes"));
        try {
            for (var _b = __values(genome.edges), _c = _b.next(); !_c.done; _c = _b.next()) {
                var edge = _c.value;
                console.log("Edge: ".concat(edge.from, " -> ").concat(edge.to, " (").concat(edge.weight, ") ").concat(edge.enabled ? "enabled" : "disabled", " Innovation: ").concat(edge.innovation));
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
    };
    exports.printGenome = printGenome;
    // This hangs if the dag is not a dag (it shouldn't)
    var computePlan = function (genome) {
        var e_8, _a;
        var nodeDeps = new Array(genome.nodeCount);
        try {
            for (var _b = __values(genome.edges), _c = _b.next(); !_c.done; _c = _b.next()) {
                var edge = _c.value;
                if (!edge.enabled) {
                    continue;
                }
                if (!nodeDeps[edge.to]) {
                    nodeDeps[edge.to] = [];
                }
                nodeDeps[edge.to].push(edge);
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_8) throw e_8.error; }
        }
        var nodeComputed = new Array(genome.nodeCount).fill(false);
        for (var i = 0; i < genome.domain.inputs; i++) {
            nodeComputed[i] = true;
        }
        var plan = [];
        var computeNode = function (node) {
            var e_9, _a;
            if (nodeComputed[node]) {
                return;
            }
            var deps = nodeDeps[node];
            if (!deps) {
                // throw new Error("Invalid topology found while building compute plan (non-input node has no inputs)");
            }
            else {
                try {
                    for (var deps_1 = __values(deps), deps_1_1 = deps_1.next(); !deps_1_1.done; deps_1_1 = deps_1.next()) {
                        var dep = deps_1_1.value;
                        computeNode(dep.from);
                        plan.push(dep);
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (deps_1_1 && !deps_1_1.done && (_a = deps_1.return)) _a.call(deps_1);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
            }
            nodeComputed[node] = true;
            plan.push("activation");
        };
        for (var i = 0; i < genome.domain.outputs; i++) {
            computeNode(genome.domain.inputs + i);
        }
        return { plan: plan, genome: genome, protection: 0 };
    };
    exports.computePlan = computePlan;
    var printPlan = function (plan) {
        var e_10, _a;
        console.log("Plan: ".concat(plan.length, " steps"));
        try {
            for (var plan_1 = __values(plan), plan_1_1 = plan_1.next(); !plan_1_1.done; plan_1_1 = plan_1.next()) {
                var step = plan_1_1.value;
                if (typeof step === "string") {
                    console.log("Step: ".concat(step));
                    continue;
                }
                console.log("Step: ".concat(step.from, " -> ").concat(step.to, " (").concat(step.weight, ") ").concat(step.enabled ? "enabled" : "disabled", " Innovation: ").concat(step.innovation));
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (plan_1_1 && !plan_1_1.done && (_a = plan_1.return)) _a.call(plan_1);
            }
            finally { if (e_10) throw e_10.error; }
        }
    };
    exports.printPlan = printPlan;
    // Sigmoid activation function from the NEAT paper
    var activation = function (x) { return 1 / (1 + Math.exp(-x)); };
    // This can be made more efficient by performing the plan in place on an existing array of the correct size
    var compute = function (_a, inputs) {
        var e_11, _b;
        var plan = _a.plan, genome = _a.genome;
        var nodes = new Array(genome.nodeCount).fill(0);
        for (var i = 0; i < inputs.length; i++) {
            nodes[i] = inputs[i];
        }
        var lastNode = Number.NaN;
        try {
            for (var plan_2 = __values(plan), plan_2_1 = plan_2.next(); !plan_2_1.done; plan_2_1 = plan_2.next()) {
                var step = plan_2_1.value;
                if (typeof step === "string") {
                    // console.assert(step === "activation");
                    nodes[lastNode] = activation(nodes[lastNode]);
                    continue;
                }
                nodes[step.to] += nodes[step.from] * step.weight;
                lastNode = step.to;
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (plan_2_1 && !plan_2_1.done && (_b = plan_2.return)) _b.call(plan_2);
            }
            finally { if (e_11) throw e_11.error; }
        }
        return nodes.slice(inputs.length);
    };
    exports.compute = compute;
    var mutateWeights = function (genome) {
        var e_12, _a;
        var edges = genome.edges.map(function (edge) { return (__assign({}, edge)); });
        try {
            for (var edges_1 = __values(edges), edges_1_1 = edges_1.next(); !edges_1_1.done; edges_1_1 = edges_1.next()) {
                var edge = edges_1_1.value;
                if (Math.random() < 0.8) {
                    edge.weight += Math.random() * 0.3 - 0.15;
                }
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (edges_1_1 && !edges_1_1.done && (_a = edges_1.return)) _a.call(edges_1);
            }
            finally { if (e_12) throw e_12.error; }
        }
        return {
            domain: genome.domain,
            edges: edges,
            nodeCount: genome.nodeCount,
        };
    };
    exports.mutateWeights = mutateWeights;
    var progenerationConnectionRate = 0.05;
    var progenerate = function (domain, size) {
        var genomes = [];
        var innovation = 0;
        for (var i = 0; i < size; i++) {
            var progenitor = {
                domain: domain,
                edges: [],
                nodeCount: domain.inputs + domain.outputs,
            };
            for (var i_1 = 0; i_1 < domain.outputs; i_1++) {
                for (var j = 0; j < domain.inputs; j++) {
                    if (Math.random() < progenerationConnectionRate) {
                        var done = connectMutation(progenitor, innovation, j, domain.inputs + i_1);
                        progenitor = done.genome;
                        innovation = done.innovationIndex;
                    }
                }
            }
            genomes.push(mutateWeights(progenitor));
        }
        return { genomes: genomes, innovation: innovation };
    };
    exports.progenerate = progenerate;
    var geneticDistance = function (a, b) {
        var e_13, _a, e_14, _b, e_15, _c;
        var aEdges = new Map();
        try {
            for (var _d = __values(a.edges), _e = _d.next(); !_e.done; _e = _d.next()) {
                var edge = _e.value;
                aEdges.set(edge.innovation, edge);
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_13) throw e_13.error; }
        }
        var bEdges = new Map();
        try {
            for (var _f = __values(b.edges), _g = _f.next(); !_g.done; _g = _f.next()) {
                var edge = _g.value;
                bEdges.set(edge.innovation, edge);
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_14) throw e_14.error; }
        }
        var aKeys = new Set(aEdges.keys());
        var bKeys = new Set(bEdges.keys());
        var disjoint = new Set(__spreadArray([], __read(aKeys), false).filter(function (x) { return !bKeys.has(x); }));
        var excess = new Set(__spreadArray([], __read(bKeys), false).filter(function (x) { return !aKeys.has(x); }));
        var matching = new Set(__spreadArray([], __read(aKeys), false).filter(function (x) { return bKeys.has(x); }));
        var weightDiff = 0;
        try {
            for (var matching_1 = __values(matching), matching_1_1 = matching_1.next(); !matching_1_1.done; matching_1_1 = matching_1.next()) {
                var key = matching_1_1.value;
                weightDiff += Math.abs(aEdges.get(key).weight - bEdges.get(key).weight);
            }
        }
        catch (e_15_1) { e_15 = { error: e_15_1 }; }
        finally {
            try {
                if (matching_1_1 && !matching_1_1.done && (_c = matching_1.return)) _c.call(matching_1);
            }
            finally { if (e_15) throw e_15.error; }
        }
        var n = Math.max(a.nodeCount, b.nodeCount);
        return (disjoint.size + excess.size) / n + weightDiff / matching.size;
    };
    exports.geneticDistance = geneticDistance;
});
define("game", ["require", "exports", "neat"], function (require, exports, neat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.clearCanvas = exports.drawLine = exports.drawCircle = exports.drawPoint = exports.setupCanvas = exports.initDB = exports.resumeFromCheckpoint = exports.startSimulations = exports.playGame = void 0;
    var linePointDistance = function (line, point) {
        return line.norm.x * point.x + line.norm.y * point.y - line.dist;
    };
    var normalize = function (point) {
        var length = Math.sqrt(point.x * point.x + point.y * point.y);
        return { x: point.x / length, y: point.y / length };
    };
    var pointsToLine = function (p1, p2) {
        var norm = normalize({ x: p2.y - p1.y, y: p1.x - p2.x });
        var dist = norm.x * p1.x + norm.y * p1.y;
        return { norm: norm, dist: dist };
    };
    var scalePoint = function (point, scale) {
        return { x: point.x * scale, y: point.y * scale };
    };
    var dot = function (p1, p2) {
        return p1.x * p2.x + p1.y * p2.y;
    };
    var subtractPoints = function (p1, p2) {
        return { x: p1.x - p2.x, y: p1.y - p2.y };
    };
    var linesFromTriangle = function (triangle) {
        var _a = __read(triangle, 3), p1 = _a[0], p2 = _a[1], p3 = _a[2];
        return [pointsToLine(p1, p2), pointsToLine(p2, p3), pointsToLine(p3, p1)];
    };
    var isPointInTriangle = function (triangle, point) {
        var lines = linesFromTriangle(triangle);
        var side1 = linePointDistance(lines[0], point);
        var side2 = linePointDistance(lines[1], point);
        var side3 = linePointDistance(lines[2], point);
        return side1 >= 0 && side2 >= 0 && side3 >= 0;
    };
    var isPointInCircle = function (circle, point) {
        var dx = circle.center.x - point.x;
        var dy = circle.center.y - point.y;
        return dx * dx + dy * dy <= circle.radius * circle.radius;
    };
    var isTriangleVertexInCircle = function (triangle, circle) {
        return triangle.some(function (vertex) { return isPointInCircle(circle, vertex); });
    };
    var isLineIntersectingCircle = function (line, circle) {
        var dist = linePointDistance(line, circle.center);
        return dist * dist <= circle.radius * circle.radius;
    };
    var perpendicularLine = function (line, point) {
        var norm = normalize({ x: -line.norm.y, y: line.norm.x });
        var dist = norm.x * point.x + norm.y * point.y;
        return { norm: norm, dist: dist };
    };
    var perpendicularLinesForTriangle = function (triangle) {
        var lines = linesFromTriangle(triangle);
        var _a = __read(triangle, 3), p1 = _a[0], p2 = _a[1], p3 = _a[2];
        return [
            perpendicularLine(lines[0], p1),
            perpendicularLine(lines[0], p2),
            perpendicularLine(lines[1], p2),
            perpendicularLine(lines[1], p3),
            perpendicularLine(lines[2], p3),
            perpendicularLine(lines[2], p1),
        ];
    };
    var isPointBetweenLines = function (point, line1, line2) {
        var dist1 = linePointDistance(line1, point);
        var dist2 = linePointDistance(line2, point);
        return dist1 * dist2 <= 0;
    };
    var doesTriangleEdgeIntersectCircle = function (triangle, circle) {
        var perps = perpendicularLinesForTriangle(triangle);
        var lines = linesFromTriangle(triangle);
        for (var i = 0; i < 3; i++) {
            if (isLineIntersectingCircle(lines[i], circle)) {
                if (isPointBetweenLines(circle.center, perps[i * 2], perps[i * 2 + 1])) {
                    return true;
                }
            }
        }
        return false;
    };
    // This is slow, I should probably optimize to remove recalculating the lines
    var isCircleIntersectingOrInsideTriangle = function (triangle, circle) {
        return (isTriangleVertexInCircle(triangle, circle) || doesTriangleEdgeIntersectCircle(triangle, circle) || isPointInTriangle(triangle, circle.center));
    };
    // drawing code for the basic geometry stuff
    var canvas;
    var ctx;
    var setupCanvas = function () {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    exports.setupCanvas = setupCanvas;
    var drawTriangle = function (triangle) {
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(triangle[0].x, triangle[0].y);
        ctx.lineTo(triangle[1].x, triangle[1].y);
        ctx.lineTo(triangle[2].x, triangle[2].y);
        ctx.closePath();
        ctx.stroke();
    };
    var drawPoint = function (point) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    };
    exports.drawPoint = drawPoint;
    var drawCircle = function (circle, color) {
        if (color === void 0) { color = "black"; }
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI);
        ctx.stroke();
    };
    exports.drawCircle = drawCircle;
    var drawLine = function (line) {
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(0, line.dist / line.norm.y);
        ctx.lineTo(canvas.width, (line.dist - canvas.width * line.norm.x) / line.norm.y);
        ctx.stroke();
    };
    exports.drawLine = drawLine;
    var clearCanvas = function () {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    exports.clearCanvas = clearCanvas;
    // I forgot that asteroids is on a torus and I made the above math for affine space
    var Boundaries;
    (function (Boundaries) {
        Boundaries[Boundaries["Top"] = 0] = "Top";
        Boundaries[Boundaries["Right"] = 1] = "Right";
        Boundaries[Boundaries["Bottom"] = 2] = "Bottom";
        Boundaries[Boundaries["Left"] = 3] = "Left";
    })(Boundaries || (Boundaries = {}));
    var nearBoundary = function (point, canvasSize) {
        var x = point.x, y = point.y;
        var width = canvasSize.x, height = canvasSize.y;
        var nearTop = y < 50;
        var nearRight = x > width - 50;
        var nearBottom = y > height - 50;
        var nearLeft = x < 50;
        var bounds = [];
        if (nearTop)
            bounds.push(Boundaries.Top);
        if (nearRight)
            bounds.push(Boundaries.Right);
        if (nearBottom)
            bounds.push(Boundaries.Bottom);
        if (nearLeft)
            bounds.push(Boundaries.Left);
        return bounds;
    };
    var pointEquivalence = function (point, canvasSize) {
        var near = nearBoundary(point, canvasSize);
        var x = point.x, y = point.y;
        if (near.length === 1) {
            var _a = __read(near, 1), boundary = _a[0];
            switch (boundary) {
                case Boundaries.Top:
                    return [{ x: x, y: y + canvasSize.y }];
                case Boundaries.Right:
                    return [{ x: x - canvasSize.x, y: y }];
                case Boundaries.Bottom:
                    return [{ x: x, y: y - canvasSize.y }];
                case Boundaries.Left:
                    return [{ x: x + canvasSize.x, y: y }];
            }
        }
        if (near.length === 2) {
            var _b = __read(near, 2), boundary1 = _b[0], boundary2 = _b[1];
            if (boundary1 === Boundaries.Top && boundary2 === Boundaries.Right) {
                return [
                    { x: x, y: y + canvasSize.y },
                    { x: x - canvasSize.x, y: y },
                    { x: x - canvasSize.x, y: y + canvasSize.y },
                ];
            }
            if (boundary1 === Boundaries.Right && boundary2 === Boundaries.Bottom) {
                return [
                    { x: x - canvasSize.x, y: y },
                    { x: x, y: y - canvasSize.y },
                    { x: x - canvasSize.x, y: y - canvasSize.y },
                ];
            }
            if (boundary1 === Boundaries.Bottom && boundary2 === Boundaries.Left) {
                return [
                    { x: x, y: y - canvasSize.y },
                    { x: x + canvasSize.x, y: y },
                    { x: x + canvasSize.x, y: y - canvasSize.y },
                ];
            }
            if (boundary1 === Boundaries.Top && boundary2 === Boundaries.Left) {
                return [
                    { x: x + canvasSize.x, y: y },
                    { x: x, y: y + canvasSize.y },
                    { x: x + canvasSize.x, y: y + canvasSize.y },
                ];
            }
        }
        if (near.length > 3) {
            console.assert(false, "shouldn't be possible");
        }
        return [];
    };
    var toroidalDistance = function (point1, point2, canvasSize) {
        var width = canvasSize.x, height = canvasSize.y;
        var x1 = point1.x, y1 = point1.y;
        var x2 = point2.x, y2 = point2.y;
        var dx = Math.min(Math.abs(x1 - x2), Math.abs(x1 - x2 + width), Math.abs(x1 - x2 - width));
        var dy = Math.min(Math.abs(y1 - y2), Math.abs(y1 - y2 + height), Math.abs(y1 - y2 - height));
        return Math.sqrt(dx * dx + dy * dy);
    };
    var positiveModulo = function (x, n) {
        return ((x % n) + n) % n;
    };
    var randomAsteroids = function (count) {
        console.assert(canvas !== undefined, "canvas not initialized");
        var asteroids = [];
        var radius = 20;
        for (var i = 0; i < count; i++) {
            var heading_1 = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
            var position_1 = { x: Math.random() * canvas.width, y: Math.random() * canvas.height };
            var speed = Math.random() * 2 + 1;
            if (toroidalDistance(position_1, { x: canvas.width / 2, y: canvas.height / 2 }, { x: canvas.width, y: canvas.height }) < 135) {
                i--;
                continue;
            }
            asteroids.push({ heading: heading_1, position: position_1, speed: speed, radius: radius });
        }
        // create an asteroid heading for the middle
        var theta = Math.random() * 2 * Math.PI;
        var heading = { x: Math.cos(theta), y: Math.sin(theta) };
        var position = { x: canvas.width / 2 + 150 * -heading.x, y: canvas.height / 2 + 150 * -heading.y };
        asteroids.push({ heading: heading, position: position, speed: 1, radius: radius });
        return asteroids;
    };
    var bulletMaxLifetime = 40;
    var repositionedEntity = function (entity, position) {
        var copy = __assign({}, entity);
        copy.position = position;
        return copy;
    };
    var allEquivalences = function (entity, canvasSize) {
        var position = entity.position;
        var equivalences = pointEquivalence(position, canvasSize);
        var ret = equivalences.map(function (equivalence) { return repositionedEntity(entity, equivalence); });
        ret.push(entity);
        return ret;
    };
    var initialState = function () {
        return {
            ship: {
                heading: { x: 0, y: -1 },
                position: { x: canvas.width / 2, y: canvas.height / 2 },
                speed: 0,
                framesSinceFired: 11,
            },
            asteroids: [],
            bullets: [],
            score: 0,
            alive: true,
        };
    };
    var shipTriangle = function (ship) {
        var triangle = [
            {
                x: ship.position.x + ship.heading.x * 10,
                y: ship.position.y + ship.heading.y * 10,
            },
            {
                x: ship.position.x + ship.heading.y * 5 - ship.heading.x * 5,
                y: ship.position.y - ship.heading.x * 5 - ship.heading.y * 5,
            },
            {
                x: ship.position.x - ship.heading.y * 5 - ship.heading.x * 5,
                y: ship.position.y + ship.heading.x * 5 - ship.heading.y * 5,
            },
        ];
        return triangle;
    };
    var moveEntity = function (entity) {
        entity.position.x += entity.heading.x * entity.speed;
        entity.position.y += entity.heading.y * entity.speed;
    };
    var turnEntity = function (entity, angle) {
        var _a = entity.heading, x = _a.x, y = _a.y;
        entity.heading.x = x * Math.cos(angle) - y * Math.sin(angle);
        entity.heading.y = x * Math.sin(angle) + y * Math.cos(angle);
    };
    var accelerateEntity = function (entity, amount) {
        entity.speed += amount;
    };
    var decelerateEntity = function (entity, amount) {
        entity.speed -= amount;
        if (entity.speed < 0) {
            entity.speed = 0;
        }
    };
    var fireBullet = function (gameState) {
        var ship = gameState.ship;
        var bullet = {
            heading: __assign({}, ship.heading),
            position: __assign({}, ship.position),
            speed: ship.speed + 5,
            lifetime: 0,
        };
        gameState.bullets.push(bullet);
    };
    // A bit discombobulated, but whatever
    var updateGameState = function (gameState, inputs) {
        var ship = gameState.ship, asteroids = gameState.asteroids, bullets = gameState.bullets;
        // update ship
        if (inputs.left) {
            turnEntity(ship, -0.1);
        }
        if (inputs.right) {
            turnEntity(ship, 0.1);
        }
        if (inputs.up) {
            accelerateEntity(ship, 0.1);
        }
        if (inputs.down) {
            decelerateEntity(ship, 0.1);
        }
        if (inputs.space) {
            if (ship.framesSinceFired > 10) {
                fireBullet(gameState);
                ship.framesSinceFired = 0;
            }
        }
        moveEntity(ship);
        ship.framesSinceFired++;
        asteroids.forEach(function (asteroid) { return moveEntity(asteroid); });
        bullets.forEach(function (bullet) { return moveEntity(bullet); });
        bullets.forEach(function (bullet) { return bullet.lifetime++; });
        // check for collisions
        var newAsteroids = [];
        var xOffset = 0;
        var yOffset = 0;
        var near = nearBoundary(ship.position, { x: canvas.width, y: canvas.height });
        if (near.includes(Boundaries.Top) || near.includes(Boundaries.Bottom)) {
            yOffset = canvas.height / 2;
        }
        if (near.includes(Boundaries.Left) || near.includes(Boundaries.Right)) {
            xOffset = canvas.width / 2;
        }
        asteroids.forEach(function (asteroid) {
            var tri = shipTriangle(ship).map(function (_a) {
                var x = _a.x, y = _a.y;
                return ({
                    x: positiveModulo(x + xOffset, canvas.width),
                    y: positiveModulo(y + yOffset, canvas.height),
                });
            });
            if (toroidalDistance(asteroid.position, ship.position, { x: canvas.width, y: canvas.height }) < 100 &&
                isCircleIntersectingOrInsideTriangle(tri, {
                    center: { x: positiveModulo(asteroid.position.x + xOffset, canvas.width), y: positiveModulo(asteroid.position.y + yOffset, canvas.height) },
                    radius: asteroid.radius,
                })) {
                gameState.alive = false;
            }
            bullets.forEach(function (bullet) {
                if (asteroid.radius > 0 &&
                    bullet.lifetime < bulletMaxLifetime &&
                    toroidalDistance(asteroid.position, bullet.position, { x: canvas.width, y: canvas.height }) < asteroid.radius) {
                    gameState.score++;
                    var radius = asteroid.radius - 5;
                    var heading = { x: asteroid.heading.x + (bullet.heading.x * 4) / radius, y: asteroid.heading.y + (bullet.heading.y * 4) / radius };
                    if (radius > 0) {
                        var a = {
                            heading: __assign({}, heading),
                            position: { x: asteroid.position.x, y: asteroid.position.y },
                            speed: asteroid.speed,
                            radius: radius,
                        };
                        turnEntity(a, 5.1);
                        asteroids.push(a);
                        var b = {
                            heading: heading,
                            position: { x: asteroid.position.x, y: asteroid.position.y },
                            speed: asteroid.speed,
                            radius: radius,
                        };
                        turnEntity(b, -5.1);
                        asteroids.push(b);
                    }
                    asteroid.radius = 0;
                    bullet.lifetime = bulletMaxLifetime;
                }
            });
        });
        gameState.bullets = gameState.bullets.filter(function (bullet) { return bullet.lifetime < bulletMaxLifetime; });
        // remove asteroids that have been destroyed
        gameState.asteroids = gameState.asteroids.filter(function (asteroid) { return asteroid.radius > 0; });
        // wrap everything
        gameState.ship.position.x = positiveModulo(gameState.ship.position.x, canvas.width);
        gameState.ship.position.y = positiveModulo(gameState.ship.position.y, canvas.height);
        gameState.asteroids.forEach(function (asteroid) {
            asteroid.position.x = positiveModulo(asteroid.position.x, canvas.width);
            asteroid.position.y = positiveModulo(asteroid.position.y, canvas.height);
        });
        gameState.bullets.forEach(function (bullet) {
            bullet.position.x = positiveModulo(bullet.position.x, canvas.width);
            bullet.position.y = positiveModulo(bullet.position.y, canvas.height);
        });
    };
    var drawEverything = function (gameState, onlyHighlighted) {
        var e_16, _a;
        if (onlyHighlighted === void 0) { onlyHighlighted = false; }
        clearCanvas();
        try {
            for (var _b = __values(allEquivalences(gameState.ship, { x: canvas.width, y: canvas.height })), _c = _b.next(); !_c.done; _c = _b.next()) {
                var shipInstance = _c.value;
                drawTriangle(shipTriangle(shipInstance));
            }
        }
        catch (e_16_1) { e_16 = { error: e_16_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_16) throw e_16.error; }
        }
        gameState.asteroids.forEach(function (asteroid) {
            var e_17, _a;
            try {
                for (var _b = __values(allEquivalences(asteroid, { x: canvas.width, y: canvas.height })), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var asteroidInstance = _c.value;
                    if (!onlyHighlighted || asteroidInstance.highlighted) {
                        drawCircle({ center: asteroidInstance.position, radius: asteroid.radius }, asteroidInstance.highlighted ? "red" : "black");
                    }
                }
            }
            catch (e_17_1) { e_17 = { error: e_17_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_17) throw e_17.error; }
            }
        });
        gameState.bullets.forEach(function (bullet) {
            var e_18, _a;
            try {
                for (var _b = __values(allEquivalences(bullet, { x: canvas.width, y: canvas.height })), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var bulletInstance = _c.value;
                    drawPoint(bulletInstance.position);
                }
            }
            catch (e_18_1) { e_18 = { error: e_18_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_18) throw e_18.error; }
            }
        });
    };
    // NEAT state space
    // There are so many arbitrary decisions in this section
    var positionDelta = function (a, b, canvasSize) {
        var minX = Math.min(a.x, b.x);
        var maxX = Math.max(a.x, b.x);
        var minY = Math.min(a.y, b.y);
        var maxY = Math.max(a.y, b.y);
        var directX = maxX - minX;
        var directY = maxY - minY;
        var wrapX = directX - canvasSize.x;
        var wrapY = directY - canvasSize.y;
        var x = Math.abs(wrapX) < Math.abs(directX) ? wrapX : directX;
        var y = Math.abs(wrapY) < Math.abs(directY) ? wrapY : directY;
        return { x: x, y: y };
    };
    // model parameters
    var closestCount = 10;
    var dangerCount = 10;
    // this does not modify the game state except for highlighting the asteroids that it is returning data for
    var stateSpace = function (gameState) {
        var ship = gameState.ship, asteroids = gameState.asteroids;
        var shipTheta = Math.atan2(ship.heading.y, ship.heading.x);
        var closestAsteroids = new Array(closestCount).fill({
            distance: Infinity,
            data: { velocity: 0, theta: 0, distance: 0, phi: 0, radius: 0, asteroid: null },
        });
        // I may want to have an additional field for the danger value
        var dangerAsteroids = new Array(dangerCount).fill({
            danger: 0,
            data: { velocity: 0, theta: 0, distance: 0, phi: 0, radius: 0, asteroid: null },
        });
        var nextShipPosition = {
            x: positiveModulo(ship.position.x + ship.heading.x * ship.speed, canvas.width),
            y: positiveModulo(ship.position.y + ship.heading.y * ship.speed, canvas.height),
        };
        asteroids.forEach(function (asteroid) {
            var _a = positionDelta(ship.position, asteroid.position, { x: canvas.width, y: canvas.height }), x = _a.x, y = _a.y;
            var distance = Math.sqrt(x * x + y * y);
            var phi = Math.atan2(asteroid.heading.y, asteroid.heading.x) - shipTheta;
            if (phi > Math.PI) {
                phi -= 2 * Math.PI;
            }
            else if (phi < -Math.PI) {
                phi += 2 * Math.PI;
            }
            var theta = Math.atan2(y, x);
            var velocityDifference = subtractPoints(scalePoint(asteroid.heading, asteroid.speed), scalePoint(ship.heading, ship.speed));
            var velocity = Math.sqrt(velocityDifference.x * velocityDifference.x + velocityDifference.y * velocityDifference.y);
            for (var i = 0; i < closestAsteroids.length; i++) {
                if (distance < closestAsteroids[i].distance) {
                    closestAsteroids.splice(i, 0, { distance: distance, data: { velocity: velocity, theta: theta, distance: distance, phi: phi, radius: asteroid.radius, asteroid: asteroid } });
                    asteroid.highlighted = true;
                    var ast = closestAsteroids.pop().data.asteroid;
                    if (ast) {
                        ast.highlighted = false;
                    }
                    break;
                }
            }
            var nextAsteroidPosition = {
                x: positiveModulo(asteroid.position.x + asteroid.heading.x * asteroid.speed, canvas.width),
                y: positiveModulo(asteroid.position.y + asteroid.heading.y * asteroid.speed, canvas.height),
            };
            var _b = positionDelta(nextShipPosition, nextAsteroidPosition, { x: canvas.width, y: canvas.height }), nextX = _b.x, nextY = _b.y;
            var nextDistance = Math.sqrt(nextX * nextX + nextY * nextY);
            // This is attempting to capture the idea of asteroids moving towards the ship that are nearby
            // dimensionally danger is time^-1 (distance differential over distance)
            // I chose this because it has good numerical stability
            var danger = (distance - nextDistance) / distance;
            for (var i = 0; i < dangerAsteroids.length; i++) {
                if (danger > 0 && danger > dangerAsteroids[i].danger) {
                    dangerAsteroids.splice(i, 0, { danger: danger, data: { velocity: velocity, theta: theta, distance: distance, phi: phi, radius: asteroid.radius, asteroid: asteroid } });
                    asteroid.highlighted = true;
                    var ast = dangerAsteroids.pop().data.asteroid;
                    if (ast) {
                        ast.highlighted = false;
                    }
                    break;
                }
            }
        });
        // Idk the best way to show that the data is empty, I am using negative velocities
        return closestAsteroids
            .map(function (_a) {
            var distance = _a.distance, data = _a.data;
            if (distance === Infinity) {
                return { velocity: 0, deltaTheta: 0, distance: 0, radius: 0 };
            }
            return data;
        })
            .concat(dangerAsteroids.map(function (_a) {
            var danger = _a.danger, data = _a.data;
            if (danger === 0) {
                return { velocity: 0, deltaTheta: 0, distance: 0, radius: 0 };
            }
            return data;
        }));
    };
    // hook up the nn to the game
    var domain = { inputs: (closestCount + dangerCount) * 5 + 2, outputs: 5 };
    // This code is wrong but I am writing and testing stuff incrementally
    var setupNetwork = function (count) {
        var _a = (0, neat_1.progenerate)(domain, count), genomes = _a.genomes, innovation = _a.innovation;
        return { plans: genomes.map(function (genome) { return (0, neat_1.computePlan)(genome); }), innovation: innovation };
    };
    var runStep = function (data, plan, framesSinceFired) {
        var inputs = new Array(domain.inputs);
        for (var i = 0; i < closestCount + dangerCount; i++) {
            var _a = data[i], velocity = _a.velocity, theta = _a.theta, distance = _a.distance, phi = _a.phi, radius = _a.radius;
            inputs[i * 5] = velocity;
            inputs[i * 5 + 1] = theta;
            inputs[i * 5 + 2] = distance;
            inputs[i * 5 + 3] = phi;
            inputs[i * 5 + 4] = radius;
        }
        inputs[inputs.length - 2] = framesSinceFired;
        inputs[inputs.length - 1] = 1;
        return (0, neat_1.compute)(plan, inputs);
    };
    var asteroids = [];
    var asteroidsCopy = function () {
        return asteroids.map(function (asteroid) {
            var position = __rest(asteroid.position, []), heading = __rest(asteroid.heading, []), speed = asteroid.speed, radius = asteroid.radius;
            return { position: __assign({}, position), heading: __assign({}, heading), speed: speed, radius: radius };
        });
    };
    // top level simulation functions
    // headless simulation
    var runSimulation = function (plan) {
        if (!canvas) {
            setupCanvas();
        }
        var state = initialState();
        // We load the asteroids the same every time for now
        state.asteroids = asteroidsCopy();
        state.asteroids.forEach(function (asteroid) { return (asteroid.heading = normalize(asteroid.heading)); });
        var inputs = {
            left: false,
            right: false,
            up: false,
            down: false,
            space: false,
        };
        var frame = 0;
        while (state.alive) {
            updateGameState(state, inputs);
            if (state.asteroids.length === 0) {
                console.log("It won!");
                throw new Error("It won!");
            }
            var space = stateSpace(state);
            frame++;
            // if (frame % 20 === 0) {
            //   console.log(space);
            // }
            var outputs = runStep(space, plan, state.ship.framesSinceFired);
            var _a = __read(outputs, 5), left = _a[0], right = _a[1], up = _a[2], down = _a[3], spacebar = _a[4];
            inputs.left = left > 0.5;
            inputs.right = right > 0.5;
            inputs.up = up > 0.5;
            inputs.down = down > 0.5;
            inputs.space = spacebar > 0.5;
        }
        var hiddenNodeCount = plan.genome.nodeCount - plan.genome.domain.inputs - plan.genome.domain.outputs;
        // console.log(`Simulation over with score ${state.score} on frame ${frame}`);
        return frame / 10 + state.score * 5 - 2 * hiddenNodeCount + (plan.protection > 0 ? 5 : 0);
    };
    var displaying = false;
    var afterDisplaying = function () { };
    var showSimulation = function (plan) {
        if (!canvas) {
            setupCanvas();
        }
        var state = initialState();
        state.asteroids = asteroidsCopy();
        state.asteroids.forEach(function (asteroid) { return (asteroid.heading = normalize(asteroid.heading)); });
        var inputs = {
            left: false,
            right: false,
            up: false,
            down: false,
            space: false,
        };
        var frame = 0;
        var loop = function () {
            if (!state.alive) {
                console.log("Simulation over with score ".concat(state.score, " on frame ").concat(frame));
                displaying = false;
                afterDisplaying();
                return;
            }
            updateGameState(state, inputs);
            if (state.asteroids.length === 0) {
                console.log("It won!");
                displaying = false;
                throw new Error("It won!");
            }
            var space = stateSpace(state);
            frame++;
            var outputs = runStep(space, plan, state.ship.framesSinceFired);
            var _a = __read(outputs, 5), left = _a[0], right = _a[1], up = _a[2], down = _a[3], spacebar = _a[4];
            inputs.left = left > 0.5;
            inputs.right = right > 0.5;
            inputs.up = up > 0.5;
            inputs.down = down > 0.5;
            inputs.space = spacebar > 0.5;
            drawEverything(state);
            requestAnimationFrame(loop);
        };
        displaying = true;
        loop();
    };
    var db;
    var initDB = function (callback) {
        if (db) {
            return;
        }
        var request = window.indexedDB.open("Checkpoint", 3);
        request.onerror = function (event) {
            console.log("Error opening database", event);
        };
        request.onsuccess = function (event) {
            db = request.result;
            db.onerror = function (event) {
                console.log("Database error", event);
            };
            // db.createObjectStore("Checkpoints", { keyPath: "id", autoIncrement: true });
            callback();
        };
        request.onupgradeneeded = function (event) {
            db = request.result;
            db.createObjectStore("Checkpoints", { keyPath: "id", autoIncrement: true });
            console.log("Yeah");
        };
        // request.onupgradeneeded = (event) => {
        //   db = request.result;
        //   if (event.oldVersion === 0) {
        //     console.log("First time setup");
        //     return;
        //   }
        //   console.log("Should never happen", event);
        // };
    };
    exports.initDB = initDB;
    var saveCheckpoint = function (checkpoint) {
        if (!db) {
            throw new Error("Database not initialized");
        }
        var transaction = db.transaction(["Checkpoints"], "readwrite");
        var objectStore = transaction.objectStore("Checkpoints");
        var request = objectStore.add(checkpoint);
        request.onsuccess = function (event) {
            console.log("Checkpoint saved");
        };
        request.onerror = function (event) {
            console.log("Error saving checkpoint", event);
        };
    };
    var loadCheckpoint = function (callback) {
        if (!db) {
            throw new Error("Database not initialized");
        }
        var transaction = db.transaction(["Checkpoints"], "readonly");
        var objectStore = transaction.objectStore("Checkpoints");
        var request = objectStore.getAll();
        request.onsuccess = function (event) {
            var checkpoints = request.result;
            if (checkpoints.length === 0) {
                console.log("No checkpoints found");
                return;
            }
            var checkpoint = checkpoints[checkpoints.length - 1];
            console.log("Loaded checkpoint", checkpoint);
            callback(checkpoint);
        };
        request.onerror = function (event) {
            console.log("Error loading checkpoint", event);
        };
    };
    var averageOverRunsCount = 10;
    var bestPerRound = 40;
    var copiesPerRound = 30;
    var startSimulations = function (checkpoint) {
        if (!canvas) {
            setupCanvas();
        }
        var plans = [];
        var innovation;
        var sorted = [];
        var best = undefined;
        var iteration = 1;
        asteroids = randomAsteroids(15);
        if (!checkpoint) {
            console.log("Starting from scratch");
            var setup = setupNetwork(bestPerRound * copiesPerRound);
            plans = setup.plans;
            innovation = setup.innovation;
            var fitnesses = plans.map(function (plan) { return ({ fitness: runSimulation(plan), plan: plan }); });
            sorted = fitnesses.sort(function (a, b) { return b.fitness - a.fitness; });
            best = sorted[0];
            console.log("Best fitness", best.fitness);
            console.log(best);
        }
        else {
            sorted = checkpoint.data;
            innovation = checkpoint.innovation;
            iteration = checkpoint.iteration;
            console.log("Loading checkpoint from iteration ".concat(iteration));
        }
        var doIteration = function () {
            if (iteration % 15 === 0) {
                console.log("Iteration ".concat(iteration, " - TOPOLOGICAL MUTATIONS"));
                if (iteration % 2 === 0) {
                    console.log("DOING CROSSOVER");
                }
                var bestResults = sorted.slice(0, bestPerRound);
                plans = [];
                for (var j = 0; j < bestResults.length; j++) {
                    for (var i = 0; i < copiesPerRound; i++) {
                        if (i === 0) {
                            plans.push(bestResults[j].plan);
                        }
                        else {
                            if (iteration % 2 === 0) {
                                // get a random best result different from the one we are copying and breed them
                                var otherIndex = j;
                                while (otherIndex === j) {
                                    otherIndex = Math.floor(Math.random() * bestResults.length);
                                }
                                var other = bestResults[otherIndex].plan;
                                var genome = (0, neat_1.crossover)(bestResults[j].plan.genome, other.genome);
                                plans.push((0, neat_1.computePlan)(genome));
                                plans[plans.length - 1].protection = 5 * averageOverRunsCount;
                            }
                            else {
                                // Insertion mutation
                                var _a = (0, neat_1.topologicalInsertionMutation)(bestResults[j].plan.genome, innovation), genome = _a.genome, innovationIndex = _a.innovationIndex;
                                innovation = innovationIndex;
                                plans.push((0, neat_1.computePlan)(genome));
                                plans[plans.length - 1].protection = 5 * averageOverRunsCount;
                            }
                        }
                    }
                }
                var averages = new Array(plans.length).fill(0);
                for (var i = 0; i < averageOverRunsCount; i++) {
                    asteroids = randomAsteroids(15);
                    for (var j = 0; j < plans.length; j++) {
                        averages[j] += runSimulation(plans[j]);
                        if (!plans[j].protection) {
                            plans[j].protection = 0;
                        }
                        plans[j].protection -= 1;
                    }
                }
                averages = averages.map(function (fitness) { return fitness / averageOverRunsCount; });
                sorted = averages.map(function (fitness, i) { return ({ fitness: fitness, plan: plans[i] }); }).sort(function (a, b) { return b.fitness - a.fitness; });
                // console.log(sorted);
            }
            else {
                var bestResults = sorted.slice(0, bestPerRound);
                plans = [];
                for (var j = 0; j < bestResults.length; j++) {
                    for (var i = 0; i < copiesPerRound; i++) {
                        if (i === 0) {
                            plans.push(bestResults[j].plan);
                        }
                        else {
                            plans.push((0, neat_1.computePlan)((0, neat_1.mutateWeights)(bestResults[j].plan.genome)));
                        }
                        plans[plans.length - 1].protection = bestResults[j].plan.protection;
                    }
                }
                var averages = new Array(plans.length).fill(0);
                for (var i = 0; i < averageOverRunsCount; i++) {
                    asteroids = randomAsteroids(15);
                    for (var j = 0; j < plans.length; j++) {
                        averages[j] += runSimulation(plans[j]);
                        if (!plans[j].protection) {
                            plans[j].protection = 0;
                        }
                        plans[j].protection -= 1;
                    }
                }
                averages = averages.map(function (fitness) { return fitness / averageOverRunsCount; });
                sorted = averages.map(function (fitness, i) { return ({ fitness: fitness, plan: plans[i] }); }).sort(function (a, b) { return b.fitness - a.fitness; });
                // console.log(sorted);
            }
            iteration++;
            best = sorted[0];
            console.log("Best fitness", best.fitness, "on iteration", iteration);
            // console.log(best);
            if (iteration % 10 === 2) {
                console.log("Saving checkpoint - ".concat(iteration));
                var checkpoint_1 = {
                    data: sorted.slice(0, bestPerRound),
                    innovation: innovation,
                    iteration: iteration,
                };
                // localStorage.setItem("checkpoint", JSON.stringify(checkpoint));
                saveCheckpoint(checkpoint_1);
            }
            if (iteration % 1 === 0) {
                afterDisplaying = doIteration;
                showSimulation(best.plan);
            }
            else {
                doIteration();
            }
        };
        if (!checkpoint) {
            afterDisplaying = doIteration;
            showSimulation(best.plan);
        }
        else {
            doIteration();
        }
    };
    exports.startSimulations = startSimulations;
    var resumeFromCheckpoint = function () {
        // const data = JSON.parse(localStorage.getItem("checkpoint") || "");
        // if (data.hasOwnProperty("data")) {
        //   while (data.data.length < bestPerRound) {
        //     data.data = data.data.concat(data.data);
        //   }
        //   startSimulations(data);
        // } else {
        //   startSimulations();
        // }
        loadCheckpoint(startSimulations);
    };
    exports.resumeFromCheckpoint = resumeFromCheckpoint;
    // temporary test code
    var playGame = function (onlyHighlighted) {
        if (!canvas) {
            setupCanvas();
        }
        var state = initialState();
        // We load the asteroids the same every time for now
        asteroids = randomAsteroids(15);
        state.asteroids = asteroidsCopy();
        state.asteroids.forEach(function (asteroid) { return (asteroid.heading = normalize(asteroid.heading)); });
        var inputs = {
            left: false,
            right: false,
            up: false,
            down: false,
            space: false,
        };
        document.onkeydown = function (e) {
            if (e.key === "ArrowLeft") {
                inputs.left = true;
            }
            if (e.key === "ArrowRight") {
                inputs.right = true;
            }
            if (e.key === "ArrowUp") {
                inputs.up = true;
            }
            if (e.key === "ArrowDown") {
                inputs.down = true;
            }
            if (e.key === " ") {
                inputs.space = true;
            }
        };
        document.onkeyup = function (e) {
            if (e.key === "ArrowLeft") {
                inputs.left = false;
            }
            if (e.key === "ArrowRight") {
                inputs.right = false;
            }
            if (e.key === "ArrowUp") {
                inputs.up = false;
            }
            if (e.key === "ArrowDown") {
                inputs.down = false;
            }
            if (e.key === " ") {
                inputs.space = false;
            }
        };
        var frame = 0;
        var loop = function () {
            updateGameState(state, inputs);
            stateSpace(state);
            if (!state.alive) {
                console.log("You died!");
                return;
            }
            if (state.asteroids.length === 0) {
                console.log("You won!");
                return;
            }
            drawEverything(state, onlyHighlighted);
            requestAnimationFrame(loop);
        };
        loop();
    };
    exports.playGame = playGame;
});
define("index", ["require", "exports", "game"], function (require, exports, game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // const test = () => {
    //   const domain = { inputs: 3, outputs: 2 };
    //   const { genomes, innovation } = progenerate(domain, 10);
    //   for (const genome of genomes) {
    //     printGenome(genome);
    //     const plan = computePlan(genome);
    //     printPlan(plan.plan);
    //     console.log(compute(plan, [1, 2, 3]));
    //   }
    // };
    var toRun = function () {
        var restart = document.getElementById("restart");
        var resume = document.getElementById("resume");
        var play = document.getElementById("play");
        var onlyHighlighted = document.getElementById("onlyHighlighted");
        restart.onclick = function () {
            (0, game_1.startSimulations)();
        };
        resume.onclick = function () {
            (0, game_1.resumeFromCheckpoint)();
        };
        play.onclick = function () {
            play.blur();
            (0, game_1.playGame)(onlyHighlighted.checked);
        };
        (0, game_1.initDB)(function () {
            restart.disabled = false;
            resume.disabled = false;
            play.disabled = false;
            onlyHighlighted.disabled = false;
        });
    };
    if (document.readyState === "complete") {
        toRun();
    }
    else {
        document.addEventListener("DOMContentLoaded", toRun);
    }
});
define("neatTest", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.neatTest = void 0;
    var drawGenome = function (genome, where) {
        var domain = genome.domain;
    };
    var neatTest = function () { };
    exports.neatTest = neatTest;
});
