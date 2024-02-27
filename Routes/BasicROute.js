const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../Hospital Data", "hospitalData.json");

const { read,write } = require("../Middlewear/mid");

router.get('/', read, (req, res) => {
    if(req.hospitalData.length<=0){
        res.send("No Data in this file, Please Add First");
    }else{
        res.json(req.hospitalData);
    }
});

router.post('/add', read,write, (req, res) => {
    
    res.send('Data added successfully');
    
});

router.get('/:name', read, (req, res) => {
    const name = req.params.name; 
    const data = req.hospitalData;
    const sdata = data.filter((value) => value.name === name); // Filter based on the provided name
    res.json(sdata);
});                                                   

router.put('/:name', read, (req, res) => {
    const name = req.params.name;
    const data = req.hospitalData;
     // Find the index of the object with the provided name
     const index = data.findIndex(value => value.name === name);

     if (index !== -1) {
         // Object with the provided name found, you can access it using data[index]
         
         data[index] = req.body;
        //  const foundObject = data[index];

        // Convert updated data to JSON string
    
        const updatedData=JSON.stringify(data, null, 2);

        // Write updated data back to the file
        fs.writeFile(filePath, updatedData, 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.json('Data updated successfully');
            }
        });
    } else {
        res.status(404).send('Data not found');
    }
});
 
router.delete('/:name', read, (req, res) => {
    const name = req.params.name;
    const data = req.hospitalData;

    // Find the index of the object with the provided name
    const index = data.findIndex(value => value.name === name);

    if (index !== -1) {
        // Object with the provided name found, you can access it using data[index]
        
        // Remove the object at the found index
        data.splice(index, 1);

        // Convert updated data to JSON string
        const updatedData = JSON.stringify(data, null, 2);

        // Write updated data back to the file
        fs.writeFile(filePath, updatedData, 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.json('Data deleted successfully');
            }
        });
    } else {
        res.status(404).send('Data not found');
    }
});







module.exports = router;


