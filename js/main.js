const app = Vue.createApp({
    data() {
        return {
            title: "Contador App",
            count: 0
        };
    },

    methods: {
        /*
        subCount() {
            this.count -= 1;
        },

        addCount() {
            this.count += 1;
        },
        */
        // Optimizamos los anteriores en este
        setCount(instruction = "add", limit) {
            if(instruction === "sub") {
                if(this.count > limit) {
                    this.count -= 1;
                }
            } else {
                if(this.count < limit) {
                    this.count += 1;
                }
            }
        },

        resetCount() {
            this.count = 0;
        }
    }
})