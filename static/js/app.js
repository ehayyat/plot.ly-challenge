// Set up Drop down menu
function optionChanged (selectID){

    console.log(selectID);
    // Read data from JSON file
    d3.json("data/samples.json").then ((data) => {
    d3.select("#selDataset").html("");
    data.metadata.forEach (item =>
        {
        d3.select ("#selDataset").append("option").attr("value", item.id).text(item.id);
        });
    d3.select("#selDataset").node().value = selectID;   
    const idData = data.metadata.filter (item => (item.id == selectID));
    console.log(idData);
    const displayBoard = d3.select("#sample-metadata");
    displayBoard.html("");
    Object.entries(idData[0]).forEach(item =>
        {
            displayBoard.append("p").text('${item[0]}: ${item[1]}')

        });
    const sampleID = data.samples.filter(item => parseInt(item.id) == selectID);
    let idSample = sampleID[0].sample_values.slice(0,10);
    idSample = idSample.reverse();
    let otuID = sampleID[0].otu_ids.slice(0,10);
    otuID = sampleID.reverse();
    let otuLabels = sampleID[0].otu_labels
    otuLabels = otuLabels.reverse();

    const y = otuID.map(item => 'OTU' + " " + item);
        const trace = {
            y: y,
            x: idSample,
            type: 'bar',
            orientation: 'h',
            text: otuLabels
        };
        //Plotting
        Plotly.newPlot ('bar', [trace] {responsive: true});

// Next Chart
        

