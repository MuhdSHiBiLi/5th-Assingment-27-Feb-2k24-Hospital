const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../Hospital Data", "hospitalData.json");

function read(req, res, next) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        try {
            req.hospitalData = JSON.parse(data);
            next();
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error: Failed to parse JSON data');
        }
    });
}

function write(req,res,next){
    const name = req.params.name; 
    if(name){
    const data = req.hospitalData;
    const index = data.findIndex(value => value.name === name); // Find index of object with matching name

    if (index !== -1) {
        // Update properties of the object with matching name
        data[index].property = req.body.property; // Example: Update 'property' with new value from req.body

        // Convert updated data to JSON string
        const updatedData = JSON.stringify(data, null, 2);

        // Write updated data back to the file
        fs.writeFile(filePath, updatedData, 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
        next()
        return;
        })
    }
}
    // Append the new data to the array
    req.hospitalData.push(req.body);
    // Convert the updated JavaScript object back to JSON format
    const updatedData = JSON.stringify(req.hospitalData, null, 2);
    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        next();
    });
}
module.exports = { read,write };