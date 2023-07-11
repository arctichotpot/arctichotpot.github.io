```javascript
class Me extends Person {

    constructor() {
        this.name = "Liu Lin"
        this.professional = "Front-end Development"
        this.skills = {
            language: ["JavaScript","TypeScript"],
            framework: ["Vue", "React", "Koa",'Express']
        }
        this.hobby = " travel and coding"
    }
 
    Introduction () {
        return {
            name: this.name,
            professional: this.professional,
            skills: this.skills,
            hobby: this.hobby
        }
    }
}

```