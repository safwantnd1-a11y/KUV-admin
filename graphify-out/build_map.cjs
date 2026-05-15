const fs = require('fs');

const astData = fs.readFileSync('.graphify_ast.json', 'utf8');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Graphify AST Code Map</title>
  <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
  <style type="text/css">
    body, html { margin: 0; padding: 0; width: 100%; height: 100%; font-family: sans-serif; background: #1e1e1e; color: #fff; }
    #mynetwork { width: 100%; height: 100vh; border: none; }
  </style>
</head>
<body>
<div id="mynetwork"></div>

<script type="text/javascript">
  const data = ${astData};
  
  const nodes = data.nodes.map(n => ({
    id: n.id,
    label: n.label || n.id,
    title: n.source_file || n.id,
    shape: n.file_type === 'code' ? 'box' : 'ellipse',
    color: n.file_type === 'code' ? '#4CAF50' : '#2196F3',
    font: { color: 'white' }
  }));

  const edges = (data.edges || []).map(e => ({
    from: e.source,
    to: e.target,
    arrows: 'to',
    color: { color: '#888', highlight: '#fff' }
  }));

  const container = document.getElementById('mynetwork');
  const graphData = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };
  const options = {
    physics: {
      stabilization: true,
      barnesHut: { gravitationalConstant: -2000, centralGravity: 0.3, springLength: 150 }
    },
    nodes: { borderWidth: 2, shadow: true },
    edges: { width: 1, smooth: { type: 'continuous' } },
    interaction: { hover: true, tooltipDelay: 200 }
  };
  
  new vis.Network(container, graphData, options);
</script>
</body>
</html>`;

fs.writeFileSync('code-map.html', html);
