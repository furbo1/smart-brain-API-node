// const Clarifai = require('clarifai');

const stub = ClarifaiCStub.insecureGrpc();

const metadata = new insecureGrpc.Metadata();
metadata.set("authorization", "0b761837762a497ebb62efc42c602563");

const FACE_DETECT_MODEL = "d02b4508df58432fbb84e800597b8959";

stub.PostModelOutputs(
    {
        model_id: FACE_DETECT_MODEL,
        inputs: [{data: {image: {url: req.body.input}}}]
    },
    metadata,
    (err, response) => {
        if (err) {
            console.log("Error: " + err);
            return;
        }

        if (response.status.code !== 10000) {
            console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
            return;
        }

        for (const c of response.outputs[0].data.concepts) {
            console.log(c.name + ": " + c.value);
        }
    }
);


const handleApiCall = (req, res) => {
    app.models.predict(PostModelOutputs.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API.'))
}



// const app = new Clarifai.App({
//     apiKey: '1d6bdad33c7b4d28b02facb9101457d8'
// });

// const handleApiCall = (req, res) => {
//     app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
//     .then(data => {
//         res.json(data);
//     })
//     .catch(err => res.status(400).json('Unable to work with API.'))
// }

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('error when getting entries'));
};

module.exports = {
    handleImage,
    handleApiCall
}