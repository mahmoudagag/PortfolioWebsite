class skillInformation{
    constructor(name,percentage,className){
        this.name = name
        this.percentage = percentage
        this.class = className
    }
}

export const skills = [
    new skillInformation("Python",80,"skill1percent"),
    new skillInformation("JavaScript",70,"skill2percent"),
    new skillInformation("HTML",70,"skill3percent"), 
    new skillInformation("CSS",30,"skill4percent"), 
    new skillInformation("React",60,"skill5percent"), 
    new skillInformation("Django",45,"skill6percent"),
    new skillInformation("C++",25,"skill7percent"), 
    new skillInformation("Java",30,"skill8percent")
    ]
