const axios = require("axios");

module.exports = {

    getCategories: async () => {
        try {
            var response = await axios.get("http://localhost:3005/api/v1/quiz/cat");
            return response.data;
        } catch (error) {
            throw new Error("Unable to fetch categories", error);
        };

    },

    getQuestions: async (category, difficulty, questions) => {
        var url;
        if(category === "0" && difficulty === "any") {
            url = `http://localhost:3005/api/v1/quiz/get?amount=${questions}`;
        } else if(category === "0") {
            url = `http://localhost:3005/api/v1/quiz/get?amount=${questions}&difficulty=${difficulty}`;
        } else if(difficulty === "any") {
            url = `http://localhost:3005/api/v1/quiz/get?amount=${questions}&category=${category}`;
        } else {
            url = `http://localhost:3005/api/v1/quiz/get?amount=${questions}&category=${category}&difficulty=${difficulty}`;
        };

        try {
            console.log(url);
            var response = await axios.get(url);
            console.log("hello bhai ");
            console.log(response.data);
            console.log("hmm");


            // url = `https://opentdb.com/api.php?amount=${questions}&encode=url3986`;


            // var response = await axios.get(url);
            // console.log("hello bhai ");
            // console.log(response.data.results.incorrect_answers);
            // console.log("hmm");

            return response.data;
        } catch (error) {
            throw new Error("Unable to fetch questions", error);
        }

    },

    shuffleArray: (array) => {
    
        for(var i =0; i < array.length; i++) {
            array[i] = decodeURIComponent(array[i]);
        }

        for(let i = array.length - 1; i >= 0; i--) {
            
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
            
        }
        return array;
        
    }


};