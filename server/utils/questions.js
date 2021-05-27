const axios = require("axios");

module.exports = {

    getCategories: async () => {
        try {
            var response = await axios.get("http://localhost:3005/api/v1/quiz/cat");

            // var response = await axios.get("https://opentdb.com/api_category.php");
            return response.data;
        } catch (error) {
            throw new Error("Unable to fetch categories", error);
        };

    },

    getQuestions: async (category, difficulty, questions,roomName) => {
        // var url;
        // if(category === "0" && difficulty === "any") {
        //     url = `http://localhost:3005/api/v1/quiz/get?amount=${questions}`;
        // } else if(category === "0") {
        //     url = `http://localhost:3005/api/v1/quiz/get?amount=${questions}&difficulty=${difficulty}`;
        // } else if(difficulty === "any") {
        //     url = `http://localhost:3005/api/v1/quiz/get?amount=${questions}&category=${category}`;
        // } else {
        //     url = `http://localhost:3005/api/v1/quiz/get?amount=${questions}&category=${category}&difficulty=${difficulty}`;
        // };


        var url;
        if(category === "0" && difficulty === "any") {

            url = 'http://localhost:3005/api/v1/quiz/get?amount=${questions}&room=${roomName}';
            // url = `https://opentdb.com/api.php?amount=${questions}&encode=url3986`;
        } else if(category === "0") {
            
            url = `http://localhost:3005/api/v1/quiz/get?amount=${questions}&difficulty=${difficulty}&room=${roomName}`;
            // url = `https://opentdb.com/api.php?amount=${questions}&difficulty=${difficulty}&encode=url3986`;
        } else if(difficulty === "any") {
            
            url = `http://localhost:3005/api/v1/quiz/get?amount=${questions}&category=${category}&room=${roomName}`;
            // url = `https://opentdb.com/api.php?amount=${questions}&category=${category}&encode=url3986`;
        } else {
            
            url = `http://localhost:3005/api/v1/quiz/get?amount=${questions}&category=${category}&difficulty=${difficulty}&room=${roomName}`;
            // url = `https://opentdb.com/api.php?amount=${questions}&category=${category}&difficulty=${difficulty}&encode=url3986`;
        };


        try {

            var response = await axios.get(url);
            console.log(response.data);
            return response.data.results;
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