'use strict';

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/sandbox");

var db = mongoose.connection;

db.on("error", function(err) {
    console.error("connection error:", err);
});

db.once("open", function() {
    console.log("db connction successful");

    var schema = mongoose.Schema;
    var animalSchema = new schema({
        type: { type: String, default: "Fish" },
        color: { type: String, default: "Gold" },
        size: { type: String, default: "small" },
        mass: { type: Number, default: 0.077 },
        name: { type: String, default: "HAHAHAHA" }
    });

    animalSchema.pre("save", function(next) {
        if (this.mass >= 100) {
            this.size = "big";
        } else if (this.mass >= 5 && this.mass < 100) {
            this.size = "medium";
        } else this.size = "small";
        next();
    });

    animalSchema.statics.findSize = function(size, callback) {
        return this.find({ size: size }, callback);
    }

    animalSchema.methods.findSameColor = function(callback) {
        return this.model("Animal").find({ color: this.color }, callback)
    }

    var Animal = mongoose.model("Animal", animalSchema);

    var elephant = new Animal({
        type: "Elephant",
        color: "gray",
        size: "big",
        mass: 6000,
        name: "BLAH"
    });


    var fish = new Animal({});

    var whale = new Animal({
        type: "Whale",
        size: "enourmous",
        mass: 12000,
        name: "WHALELELELELEL"
    });

    var animalData = [{
            type: "mouse",
            color: "gray",
            mass: 0.11,
            name: "MOOOOOOUSEEEe"
        }, {
            type: "nutria",
            color: "brown",
            mass: 5.55,
            name: "Griiim"
        }, {
            type: "wolf",
            color: "gray",
            mass: 50,
            name: "WOOOOOO"
        },
        elephant,
        fish,
        whale
    ];

    Animal.remove({}, function() {

        Animal.create(animalData, function(err, animals) {
            if (err) {
                console.error("Save Failed", err);
            }

            Animal.findOne({ type: "Elephant" }, function(err, animals) {
                elephant.findSameColor(function(err, animals) {
                    if (err) console.error(err);

                    animals.forEach(function(animal) {
                        console.log(animal.name + "      " + animal.type + "        " + animal.size);
                    });
                    db.close(function() { console.log("Connection Closed") });
                });
            });
        });
    });
});
