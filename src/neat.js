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
import assert from "assert";
var crossover = function (a, b) {
    var e_1, _a, e_2, _b, e_3, _c;
    assert(a.domain.inputs === b.domain.inputs);
    assert(a.domain.outputs === b.domain.outputs);
    var innovations = new Set();
    try {
        for (var _d = __values(a.edges), _e = _d.next(); !_e.done; _e = _d.next()) {
            var edge = _e.value;
            innovations.add(edge.innovation);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
        }
        finally { if (e_1) throw e_1.error; }
    }
    try {
        for (var _f = __values(b.edges), _g = _f.next(); !_g.done; _g = _f.next()) {
            var edge = _g.value;
            innovations.add(edge.innovation);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
        }
        finally { if (e_2) throw e_2.error; }
    }
    var edges = [];
    var _loop_1 = function (innovation) {
        var edgeA = a.edges.find(function (edge) { return edge.innovation === innovation; });
        var edgeB = b.edges.find(function (edge) { return edge.innovation === innovation; });
        if (!edgeA) {
            edges.push(edgeB);
            return "continue";
        }
        else if (!edgeB) {
            edges.push(edgeA);
            return "continue";
        }
        assert(edgeA.from === edgeB.from);
        assert(edgeA.to === edgeB.to);
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
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (innovations_1_1 && !innovations_1_1.done && (_c = innovations_1.return)) _c.call(innovations_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return {
        domain: a.domain,
        edges: edges,
        nodeCount: Math.max(a.nodeCount, b.nodeCount),
    };
};
var insertEdgeMutation = function (genome, edgeIndex, innovation) {
    var edges = genome.edges.map(function (edge) { return (__assign({}, edge)); });
    var edge = edges[edgeIndex];
    assert(edge.enabled);
    edge.enabled = false;
    edges.push({
        from: edge.from,
        to: genome.nodeCount,
        weight: Math.random() * 2 - 1,
        innovation: innovation,
        enabled: true,
    });
    edges.push({
        from: genome.nodeCount,
        to: edge.to,
        weight: Math.random() * 2 - 1,
        innovation: innovation + 1,
        enabled: true,
    });
    return {
        genome: {
            domain: genome.domain,
            edges: edges,
            nodeCount: genome.nodeCount + 1,
        },
        innovationIndex: innovation + 2,
    };
};
var connectMutation = function (genome, innovation, from, to) {
    assert(to !== from);
    assert(to < genome.nodeCount);
    assert(from < genome.nodeCount);
    var edgeCheck = genome.edges.find(function (edge) { return edge.from === from && edge.to === to; });
    if (edgeCheck) {
        return { genome: genome, innovationIndex: innovation };
    }
    var edges = genome.edges.map(function (edge) { return (__assign({}, edge)); });
    edges.push({
        from: from,
        to: to,
        weight: Math.random() * 2 - 1,
        innovation: innovation,
        enabled: true,
    });
    return {
        genome: {
            domain: genome.domain,
            edges: edges,
            nodeCount: genome.nodeCount,
        },
        innovationIndex: innovation + 1,
    };
};
var printGenome = function (genome) {
    var e_4, _a;
    console.log("Genome: ".concat(genome.nodeCount, " nodes"));
    try {
        for (var _b = __values(genome.edges), _c = _b.next(); !_c.done; _c = _b.next()) {
            var edge = _c.value;
            console.log("Edge: ".concat(edge.from, " -> ").concat(edge.to, " (").concat(edge.weight, ") ").concat(edge.enabled ? "enabled" : "disabled", " Innovation: ").concat(edge.innovation));
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_4) throw e_4.error; }
    }
};
// This hangs if the dag is not a dag (it shouldn't)
var computePlan = function (genome) {
    var e_5, _a;
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
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_5) throw e_5.error; }
    }
    var nodeComputed = new Array(genome.nodeCount).fill(false);
    for (var i = 0; i < genome.domain.inputs; i++) {
        nodeComputed[i] = true;
    }
    var plan = [];
    var computeNode = function (node) {
        var e_6, _a;
        if (nodeComputed[node]) {
            return;
        }
        var deps = nodeDeps[node];
        if (!deps) {
            throw new Error("Invalid topology found while building compute plan (non-input node has no inputs)");
        }
        try {
            for (var deps_1 = __values(deps), deps_1_1 = deps_1.next(); !deps_1_1.done; deps_1_1 = deps_1.next()) {
                var dep = deps_1_1.value;
                computeNode(dep.from);
                plan.push(dep);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (deps_1_1 && !deps_1_1.done && (_a = deps_1.return)) _a.call(deps_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        nodeComputed[node] = true;
        plan.push("activation");
    };
    for (var i = 0; i < genome.domain.outputs; i++) {
        computeNode(genome.domain.inputs + i);
    }
    return { plan: plan, nodeCount: genome.nodeCount };
};
var printPlan = function (plan) {
    var e_7, _a;
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
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (plan_1_1 && !plan_1_1.done && (_a = plan_1.return)) _a.call(plan_1);
        }
        finally { if (e_7) throw e_7.error; }
    }
};
// Sigmoid activation function from the NEAT paper
var activation = function (x) { return 1 / (1 + Math.exp(-x)); };
var compute = function (_a, inputs) {
    var e_8, _b;
    var plan = _a.plan, nodeCount = _a.nodeCount;
    var nodes = new Array(nodeCount).fill(0);
    for (var i = 0; i < inputs.length; i++) {
        nodes[i] = inputs[i];
    }
    var lastNode = Number.NaN;
    try {
        for (var plan_2 = __values(plan), plan_2_1 = plan_2.next(); !plan_2_1.done; plan_2_1 = plan_2.next()) {
            var step = plan_2_1.value;
            if (typeof step === "string") {
                // assert(step === "activation");
                nodes[lastNode] = activation(nodes[lastNode]);
                continue;
            }
            nodes[step.to] += nodes[step.from] * step.weight;
            lastNode = step.to;
        }
    }
    catch (e_8_1) { e_8 = { error: e_8_1 }; }
    finally {
        try {
            if (plan_2_1 && !plan_2_1.done && (_b = plan_2.return)) _b.call(plan_2);
        }
        finally { if (e_8) throw e_8.error; }
    }
    return nodes.slice(inputs.length);
};
var mutateWeights = function (genome) {
    var e_9, _a;
    var edges = genome.edges.map(function (edge) { return (__assign({}, edge)); });
    try {
        for (var edges_1 = __values(edges), edges_1_1 = edges_1.next(); !edges_1_1.done; edges_1_1 = edges_1.next()) {
            var edge = edges_1_1.value;
            if (Math.random() < 0.8) {
                edge.weight += Math.random() * 0.4 - 0.2;
            }
        }
    }
    catch (e_9_1) { e_9 = { error: e_9_1 }; }
    finally {
        try {
            if (edges_1_1 && !edges_1_1.done && (_a = edges_1.return)) _a.call(edges_1);
        }
        finally { if (e_9) throw e_9.error; }
    }
    return {
        domain: genome.domain,
        edges: edges,
        nodeCount: genome.nodeCount,
    };
};
var progenerate = function (domain, size) {
    var genomes = [];
    var progenitor = {
        domain: domain,
        edges: [],
        nodeCount: domain.inputs + domain.outputs,
    };
    var innovation = 0;
    for (var i = 0; i < domain.outputs; i++) {
        for (var j = 0; j < domain.inputs; j++) {
            var _a = connectMutation(progenitor, innovation, j, domain.inputs + i), genome = _a.genome, innovationIndex = _a.innovationIndex;
            progenitor = genome;
            innovation = innovationIndex;
        }
    }
    for (var i = 0; i < size; i++) {
        genomes.push(mutateWeights(progenitor));
    }
    return { genomes: genomes, innovation: innovation };
};
export { progenerate, compute, printGenome, printPlan, computePlan };
