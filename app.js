function metaData (sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var results = metadata.filter(sampleobject =>
            sampleobject.id == sample);
        var result = results [0]
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        })


    })



}
        

function createChart (sample) {


    d3.json ("samples.json").then((data) =>{
        var samples = data.samples;
        var results = samples.filter(sampleobject => 
            sampleobject.id == sample);
        var result= results[0]
        var ids = result.otu_ids;
        var labels = result.otu_labels;
        var values = result.sample_values;
        
        // Build Chart
        var layout = {
            margin: {t: 0},
            xaxis: { title: "OTU ID" }
        };

        var trace1 = [
            {
                x: ids,
                y: values,
                text: labels,
                mode: "markers",
                marker: {
                color: ids,
                size: values,
            }}
        ];
    Plotly.newPlot ("bubble", trace1, layout);
    
    var bar_graph = [{
        y: ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        x: values.slice(0,10).reverse(),
        text: labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h",
        text: labels
    }];

    var layout2 = {
        title: "Top 10 Bacteria Found in BB"
    };

    Plotly.newPlot ("bar", bar_graph, layout2)


    });
}

function init() {
    var select = d3.select("#selDataset");
    d3.json ("samples.json").then((data) => {
        var names = data.names;
        names.forEach((sample) => {
          select
            .append("option")
            .text(sample)
            .property("value", sample);
        });
    const frstSample = names[0];
    createChart(frstSample);
    metaData(frstSample);
});
}

function optionChanged(newSample) {
createChart(newSample);
metaData(newSample);
}

init();
