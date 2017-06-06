 //apiKey: Replace this with your own Project Oxford Emotion API key, please do not use my key. I include it here so you can get up and running quickly but you can get your own key for free at https://www.projectoxford.ai/emotion 
 var apiKey = "c0723150ad4a4d72b2e2249d5a48e99a";
 
 //apiUrl: The base URL for the API. Find out what this is for other APIs via the API documentation
 var apiUrl = "https://api.projectoxford.ai/emotion/v1.0/recognize?";
function readURL(input) {
    document.getElementById('photo').style.display = 'block';
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#photo')
                .attr('src', e.target.result)
        };

        reader.readAsDataURL(input.files[0]);
    }
}
 $('#btn').click(function () {
 //file: The file that will be sent to the api
 var file = document.getElementById('filename').files[0];
 CallAPI(file, apiUrl, apiKey);
 });
 
 function CallAPI(file, apiUrl, apiKey)
 {
 $.ajax({
 url: apiUrl,
 beforeSend: function (xhrObj) {
 xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
 xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);
 },
 type: "POST",
 data: file,
 processData: false
 })
 .done(function (response) {
 ProcessResult(response);
 })
 .fail(function (error) {
 $("#response").text(error.getAllResponseHeaders());
 });
 }
 
 function ProcessResult(response)
 {
    let emotion = ["anger","contempt","disgust","fear","happiness","neutral","sadness","surprise"];
    if(Array.isArray(response)&&response.length==0){
        for(let i=0;i<8;i++){
            if(i==0)
                $("#"+emotion[i]).text("Can't Find Face QAQ");
            else
                $("#"+emotion[i]).text("  ");
        }
        return;
    }
    var data = response[0].scores;
    let vec = [data.anger,data.contempt,data.disgust,data.fear,data.happiness,data.neutral,data.sadness,data.surprise];
    for(let i=0;i<8;i++){
        if(!vec[i]){
            vec[i]=0;
        }
        //if(vec[i]*100>=0.001)
        //Math.round(original*100)/100
        $("#"+emotion[i]).text(emotion[i]+": "+(Math.round(vec[i]*100*100)/ 100)+"%");
    }
 }
 /*
    <div id="anger"></div>
     <div id="contempt"></div>
     <div id="disgust"></div>
     <div id="fear"></div>
     <div id="happiness"></div>
     <div id="neutral"></div>
     <div id="sadness"></div>
     <div id="surprise"></div>
 */