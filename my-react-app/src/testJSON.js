const test_data = {
    amazon_test_photo_1 : {
        "Labels": [{"Name": "Cap", "Confidence": 99.99995422363281, "Instances": [], "Parents": [{"Name": "Clothing"}, {"Name": "Hat"}], "Aliases": [], "Categories": [{"Name": "Apparel and Accessories"}]},
        {"Name": "Clothing", "Confidence": 99.99995422363281, "Instances": [], "Parents": [], "Aliases": [{"Name": "Apparel"}], "Categories": [{"Name": "Apparel and Accessories"}]},
        {"Name": "Hat", "Confidence": 99.99995422363281, "Instances": [], "Parents": [{"Name": "Clothing"}], "Aliases": [], "Categories": [{"Name": "Apparel and Accessories"}]},
        {"Name": "Accessories", "Confidence": 99.9974136352539, "Instances": [], "Parents": [], "Aliases": [{"Name": "Accessory"}], "Categories": [{"Name": "Apparel and Accessories"}]},
        {"Name": "Sunglasses", "Confidence": 99.9974136352539, "Instances": [{"BoundingBox": {"Width": 0.40393272042274475, "Height": 0.16745956242084503, "Left": 0.3166188597679138, "Top": 0.3577059805393219}, "Confidence": 99.9974136352539}], "Parents": [{"Name": "Accessories"}], "Aliases": [], "Categories": [{"Name": "Apparel and Accessories"}]},
        {"Name": "Adult", "Confidence": 99.33216094970703, "Instances": [{"BoundingBox": {"Width": 0.9175363183021545, "Height": 0.9318608045578003, "Left": 0.052498627454042435, "Top": 0.06787341833114624}, "Confidence": 99.33216094970703}], "Parents": [{"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
        {"Name": "Female", "Confidence": 99.33216094970703, "Instances": [{"BoundingBox": {"Width": 0.9175363183021545, "Height": 0.9318608045578003, "Left": 0.052498627454042435, "Top": 0.06787341833114624}, "Confidence": 99.33216094970703}], "Parents": [{"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
        {"Name": "Person", "Confidence": 99.33216094970703, "Instances": [{"BoundingBox": {"Width": 0.9175363183021545, "Height": 0.9318608045578003, "Left": 0.052498627454042435, "Top": 0.06787341833114624}, "Confidence": 99.33216094970703}], "Parents": [], "Aliases": [{"Name": "Human"}], "Categories": [{"Name": "Person Description"}]},
        {"Name": "Woman", "Confidence": 99.33216094970703, "Instances": [{"BoundingBox": {"Width": 0.9175363183021545, "Height": 0.9318608045578003, "Left": 0.052498627454042435, "Top": 0.06787341833114624}, "Confidence": 99.33216094970703}], "Parents": [{"Name": "Adult"}, {"Name": "Female"}, {"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
        {"Name": "Beanie", "Confidence": 99.21669006347656, "Instances": [], "Parents": [{"Name": "Cap"}, {"Name": "Clothing"}, {"Name": "Hat"}], "Aliases": [], "Categories": [{"Name": "Apparel and Accessories"}]},
        {"Name": "Blonde", "Confidence": 92.85770416259766, "Instances": [], "Parents": [{"Name": "Hair"}, {"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Beauty and Personal Care"}]},
        {"Name": "Hair", "Confidence": 92.85770416259766, "Instances": [], "Parents": [{"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Beauty and Personal Care"}]},
        {"Name": "Face", "Confidence": 82.72048950195312, "Instances": [], "Parents": [{"Name": "Head"}, {"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
        {"Name": "Head", "Confidence": 82.72048950195312, "Instances": [], "Parents": [{"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
        {"Name": "Glasses", "Confidence": 57.22354507446289, "Instances": [], "Parents": [{"Name": "Accessories"}], "Aliases": [], "Categories": [{"Name": "Apparel and Accessories"}]},
        {"Name": "Photography", "Confidence": 55.96187210083008, "Instances": [], "Parents": [], "Aliases": [{"Name": "Photo"}], "Categories": [{"Name": "Hobbies and Interests"}]},
        {"Name": "Portrait", "Confidence": 55.96187210083008, "Instances": [], "Parents": [{"Name": "Face"}, {"Name": "Head"}, {"Name": "Person"}, {"Name": "Photography"}], "Aliases": [], "Categories": [{"Name": "Hobbies and Interests"}]},
        {"Name": "Happy", "Confidence": 55.67817687988281, "Instances": [], "Parents": [{"Name": "Face"}, {"Name": "Head"}, {"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Expressions and Emotions"}]},
        {"Name": "Smile", "Confidence": 55.67817687988281, "Instances": [], "Parents": [{"Name": "Face"}, {"Name": "Happy"}, {"Name": "Head"}, {"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Expressions and Emotions"}]}],
        "LabelModelVersion": "3.0"
    },
    amazon_test_photo_4 : 
    {
        "Labels": [
            {"Name": "Blonde", "Confidence": 99.99959564208984, "Instances": [], "Parents": [{"Name": "Hair"}, {"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Beauty and Personal Care"}]},
            {"Name": "Hair", "Confidence": 99.99959564208984, "Instances": [], "Parents": [{"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Beauty and Personal Care"}]},
            {"Name": "Person", "Confidence": 99.99959564208984, "Instances": [{"BoundingBox": {"Width": 0.6809917688369751, "Height": 0.97385573387146, "Left": 0.1451244056224823, "Top": 0.026144294068217278}, "Confidence": 97.01953887939453}], "Parents": [], "Aliases": [{"Name": "Human"}], "Categories": [{"Name": "Person Description"}]},
            {"Name": "Face", "Confidence": 99.91544342041016, "Instances": [], "Parents": [{"Name": "Head"}, {"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
            {"Name": "Happy", "Confidence": 99.91544342041016, "Instances": [], "Parents": [{"Name": "Face"}, {"Name": "Head"}, {"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Expressions and Emotions"}]},
            {"Name": "Head", "Confidence": 99.91544342041016, "Instances": [], "Parents": [{"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
            {"Name": "Smile", "Confidence": 99.91544342041016, "Instances": [], "Parents": [{"Name": "Face"}, {"Name": "Happy"}, {"Name": "Head"}, {"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Expressions and Emotions"}]},
            {"Name": "Adult", "Confidence": 97.01953887939453, "Instances": [{"BoundingBox": {"Width": 0.6809917688369751, "Height": 0.97385573387146, "Left": 0.1451244056224823, "Top": 0.026144294068217278}, "Confidence": 97.01953887939453}], "Parents": [{"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
            {"Name": "Female", "Confidence": 97.01953887939453, "Instances": [{"BoundingBox": {"Width": 0.6809917688369751, "Height": 0.97385573387146, "Left": 0.1451244056224823, "Top": 0.026144294068217278}, "Confidence": 97.01953887939453}], "Parents": [{"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
            {"Name": "Woman", "Confidence": 97.01953887939453, "Instances": [{"BoundingBox": {"Width": 0.6809917688369751, "Height": 0.97385573387146, "Left": 0.1451244056224823, "Top": 0.026144294068217278}, "Confidence": 97.01953887939453}], "Parents": [{"Name": "Adult"}, {"Name": "Female"}, {"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
            {"Name": "Body Part", "Confidence": 80.20703887939453, "Instances": [], "Parents": [], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
            {"Name": "Neck", "Confidence": 80.20703887939453, "Instances": [], "Parents": [{"Name": "Body Part"}, {"Name": "Face"}, {"Name": "Head"}, {"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
            {"Name": "Dimples", "Confidence": 57.03767013549805, "Instances": [], "Parents": [{"Name": "Face"}, {"Name": "Head"}, {"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
            {"Name": "Photography", "Confidence": 56.358211517333984, "Instances": [], "Parents": [], "Aliases": [{"Name": "Photo"}], "Categories": [{"Name": "Hobbies and Interests"}]},
            {"Name": "Portrait", "Confidence": 56.358211517333984, "Instances": [], "Parents": [{"Name": "Face"}, {"Name": "Head"}, {"Name": "Person"}, {"Name": "Photography"}], "Aliases": [], "Categories": [{"Name": "Hobbies and Interests"}]}
        ],
        "LabelModelVersion": "3.0"
    },   
    amazon_test_photo_2 : {
        "Labels": [
            {"Name": "Animal", "Confidence": 99.98021697998047, "Instances": [], "Parents": [], "Aliases": [], "Categories": [{"Name": "Animals and Pets"}]},
            {"Name": "Canine", "Confidence": 99.98021697998047, "Instances": [], "Parents": [{"Name": "Animal"}, {"Name": "Mammal"}], "Aliases": [], "Categories": [{"Name": "Animals and Pets"}]},
            {"Name": "Dog", "Confidence": 99.98021697998047, "Instances": [{"BoundingBox": {"Width": 0.43564334511756897, "Height": 0.7982393503189087, "Left": 0.00003261976962676272, "Top": 0.20164471864700317}, "Confidence": 97.91858673095703}, {"BoundingBox": {"Width": 0.3571745753288269, "Height": 0.5488638877868652, "Left": 0.4230881333351135, "Top": 0.1927400380373001}, "Confidence": 95.15943145751953}, {"BoundingBox": {"Width": 0.11349883675575256, "Height": 0.06522460281848907, "Left": 0.5756949782371521, "Top": 0.1684044450521469}, "Confidence": 80.18421173095703}, {"BoundingBox": {"Width": 0.4160446226596832, "Height": 0.3773953318595886, "Left": 0.23613128066062927, "Top": 0.6221507787704468}, "Confidence": 74.4718246459961}, {"BoundingBox": {"Width": 0.10110632330179214, "Height": 0.0812574028968811, "Left": 0.6724371910095215, "Top": 0.20377561450004578}, "Confidence": 66.0235824584961}], "Parents": [{"Name": "Animal"}, {"Name": "Canine"}, {"Name": "Mammal"}, {"Name": "Pet"}], "Aliases": [], "Categories": [{"Name": "Animals and Pets"}]},
            {"Name": "Mammal", "Confidence": 99.98021697998047, "Instances": [], "Parents": [{"Name": "Animal"}], "Aliases": [], "Categories": [{"Name": "Animals and Pets"}]},
            {"Name": "Pet", "Confidence": 99.98021697998047, "Instances": [], "Parents": [{"Name": "Animal"}], "Aliases": [], "Categories": [{"Name": "Animals and Pets"}]},
            {"Name": "Puppy", "Confidence": 99.98021697998047, "Instances": [], "Parents": [{"Name": "Animal"}, {"Name": "Canine"}, {"Name": "Dog"}, {"Name": "Mammal"}, {"Name": "Pet"}], "Aliases": [], "Categories": [{"Name": "Animals and Pets"}]},
            {"Name": "Terrier", "Confidence": 84.25203704833984, "Instances": [], "Parents": [{"Name": "Animal"}, {"Name": "Canine"}, {"Name": "Dog"}, {"Name": "Mammal"}, {"Name": "Pet"}], "Aliases": [], "Categories": [{"Name": "Animals and Pets"}]},
            {"Name": "Floor", "Confidence": 80.49856567382812, "Instances": [], "Parents": [], "Aliases": [], "Categories": [{"Name": "Home and Indoors"}]},
            {"Name": "Flooring", "Confidence": 57.99126434326172, "Instances": [], "Parents": [{"Name": "Floor"}], "Aliases": [], "Categories": [{"Name": "Home and Indoors"}]},
            {"Name": "Couch", "Confidence": 57.68928527832031, "Instances": [], "Parents": [{"Name": "Furniture"}], "Aliases": [], "Categories": [{"Name": "Furniture and Furnishings"}]},
            {"Name": "Furniture", "Confidence": 57.68928527832031, "Instances": [], "Parents": [], "Aliases": [], "Categories": [{"Name": "Furniture and Furnishings"}]},
            {"Name": "Poodle", "Confidence": 55.05607604980469, "Instances": [], "Parents": [{"Name": "Animal"}, {"Name": "Canine"}, {"Name": "Dog"}, {"Name": "Mammal"}, {"Name": "Pet"}], "Aliases": [], "Categories": [{"Name": "Animals and Pets"}]}
        ],
        "LabelModelVersion": "3.0"
    },
    amazon_test_photo_3 : {
        "Labels": [
            {"Name": "Groupshot", "Confidence": 99.99976348876953, "Instances": [], "Parents": [{"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Colors and Visual Composition"}]},
            {"Name": "Person", "Confidence": 99.99976348876953, "Instances": [{"BoundingBox": {"Width": 0.23528073728084564, "Height": 0.8601586818695068, "Left": 0.05727560073137283, "Top": 0.13935859501361847}, "Confidence": 98.91244506835938}, {"BoundingBox": {"Width": 0.23897945880889893, "Height": 0.9450298547744751, "Left": 0.4070478081703186, "Top": 0.054439011961221695}, "Confidence": 98.62435150146484}, {"BoundingBox": {"Width": 0.2391696721315384, "Height": 0.8120312690734863, "Left": 0.5732776522636414, "Top": 0.18777698278427124}, "Confidence": 98.57967376708984}, {"BoundingBox": {"Width": 0.20078039169311523, "Height": 0.8657691478729248, "Left": 0.7403878569602966, "Top": 0.134195938706398}, "Confidence": 98.55963134765625}, {"BoundingBox": {"Width": 0.2422899752855301, "Height": 0.7763156890869141, "Left": 0.22523938119411469, "Top": 0.22365504503250122}, "Confidence": 97.2472152709961}], "Parents": [], "Aliases": [{"Name": "Human"}], "Categories": [{"Name": "Person Description"}]},
            {"Name": "Clothing", "Confidence": 99.55268859863281, "Instances": [], "Parents": [], "Aliases": [{"Name": "Apparel"}], "Categories": [{"Name": "Apparel and Accessories"}]},
            {"Name": "Formal Wear", "Confidence": 99.55268859863281, "Instances": [], "Parents": [], "Aliases": [], "Categories": [{"Name": "Apparel and Accessories"}]},
            {"Name": "Suit", "Confidence": 99.55268859863281, "Instances": [{"BoundingBox": {"Width": 0.23669637739658356, "Height": 0.7571906447410583, "Left": 0.05718059465289116, "Top": 0.24099259078502655}, "Confidence": 81.27312469482422}], "Parents": [{"Name": "Clothing"}, {"Name": "Formal Wear"}], "Aliases": [], "Categories": [{"Name": "Apparel and Accessories"}]},
            {"Name": "Adult", "Confidence": 98.91244506835938, "Instances": [{"BoundingBox": {"Width": 0.23528073728084564, "Height": 0.8601586818695068, "Left": 0.05727560073137283, "Top": 0.13935859501361847}, "Confidence": 98.91244506835938}, {"BoundingBox": {"Width": 0.23897945880889893, "Height": 0.9450298547744751, "Left": 0.4070478081703186, "Top": 0.054439011961221695}, "Confidence": 98.62435150146484}, {"BoundingBox": {"Width": 0.2391696721315384, "Height": 0.8120312690734863, "Left": 0.5732776522636414, "Top": 0.18777698278427124}, "Confidence": 98.57967376708984}, {"BoundingBox": {"Width": 0.20078039169311523, "Height": 0.8657691478729248, "Left": 0.7403878569602966, "Top": 0.134195938706398}, "Confidence": 98.55963134765625}, {"BoundingBox": {"Width": 0.2422899752855301, "Height": 0.7763156890869141, "Left": 0.22523938119411469, "Top": 0.22365504503250122}, "Confidence": 97.2472152709961}], "Parents": [{"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
            {"Name": "Male", "Confidence": 98.91244506835938, "Instances": [{"BoundingBox": {"Width": 0.23528073728084564, "Height": 0.8601586818695068, "Left": 0.05727560073137283, "Top": 0.13935859501361847}, "Confidence": 98.91244506835938}, {"BoundingBox": {"Width": 0.23897945880889893, "Height": 0.9450298547744751, "Left": 0.4070478081703186, "Top": 0.054439011961221695}, "Confidence": 98.62435150146484}, {"BoundingBox": {"Width": 0.2391696721315384, "Height": 0.8120312690734863, "Left": 0.5732776522636414, "Top": 0.18777698278427124}, "Confidence": 98.57967376708984}], "Parents": [{"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
            {"Name": "Man", "Confidence": 98.91244506835938, "Instances": [{"BoundingBox": {"Width": 0.23528073728084564, "Height": 0.8601586818695068, "Left": 0.05727560073137283, "Top": 0.13935859501361847}, "Confidence": 98.91244506835938}, {"BoundingBox": {"Width": 0.23897945880889893, "Height": 0.9450298547744751, "Left": 0.4070478081703186, "Top": 0.054439011961221695}, "Confidence": 98.62435150146484}, {"BoundingBox": {"Width": 0.2391696721315384, "Height": 0.8120312690734863, "Left": 0.5732776522636414, "Top": 0.18777698278427124}, "Confidence": 98.57967376708984}], "Parents": [{"Name": "Adult"}, {"Name": "Male"}, {"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
            {"Name": "Female", "Confidence": 98.55963134765625, "Instances": [{"BoundingBox": {"Width": 0.20078039169311523, "Height": 0.8657691478729248, "Left": 0.7403878569602966, "Top": 0.134195938706398}, "Confidence": 98.55963134765625}, {"BoundingBox": {"Width": 0.2422899752855301, "Height": 0.7763156890869141, "Left": 0.22523938119411469, "Top": 0.22365504503250122}, "Confidence": 97.2472152709961}], "Parents": [{"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
            {"Name": "Woman", "Confidence": 98.55963134765625, "Instances": [{"BoundingBox": {"Width": 0.20078039169311523, "Height": 0.8657691478729248, "Left": 0.7403878569602966, "Top": 0.134195938706398}, "Confidence": 98.55963134765625}, {"BoundingBox": {"Width": 0.2422899752855301, "Height": 0.7763156890869141, "Left": 0.22523938119411469, "Top": 0.22365504503250122}, "Confidence": 97.2472152709961}], "Parents": [{"Name": "Adult"}, {"Name": "Female"}, {"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
            {"Name": "Accessories", "Confidence": 97.53746032714844, "Instances": [], "Parents": [], "Aliases": [{"Name": "Accessory"}], "Categories": [{"Name": "Apparel and Accessories"}]},
            {"Name": "Glasses", "Confidence": 97.53746032714844, "Instances": [{"BoundingBox": {"Width": 0.07409247010946274, "Height": 0.032075297087430954, "Left": 0.6553877592086792, "Top": 0.25558966398239136}, "Confidence": 97.53746032714844}], "Parents": [{"Name": "Accessories"}], "Aliases": [], "Categories": [{"Name": "Apparel and Accessories"}]},
            {"Name": "Coat", "Confidence": 95.87158203125, "Instances": [{"BoundingBox": {"Width": 0.24207817018032074, "Height": 0.4121679365634918, "Left": 0.22593919932842255, "Top": 0.38330113887786865}, "Confidence": 94.98485565185547}, {"BoundingBox": {"Width": 0.20005670189857483, "Height": 0.43284663558006287, "Left": 0.742082953453064, "Top": 0.30050718784332275}, "Confidence": 91.46041870117188}, {"BoundingBox": {"Width": 0.24058160185813904, "Height": 0.6429755091667175, "Left": 0.4051778018474579, "Top": 0.20664654672145844}, "Confidence": 86.05642700195312}, {"BoundingBox": {"Width": 0.2407793551683426, "Height": 0.6678438186645508, "Left": 0.5741576552391052, "Top": 0.33215615153312683}, "Confidence": 84.44132232666016}], "Parents": [{"Name": "Clothing"}], "Aliases": [], "Categories": [{"Name": "Apparel and Accessories"}]},
            {"Name": "Jacket", "Confidence": 95.87158203125, "Instances": [], "Parents": [{"Name": "Clothing"}, {"Name": "Coat"}], "Aliases": [], "Categories": [{"Name": "Apparel and Accessories"}]},
            {"Name": "Blazer", "Confidence": 94.03804779052734, "Instances": [], "Parents": [{"Name": "Clothing"}, {"Name": "Coat"}, {"Name": "Jacket"}], "Aliases": [], "Categories": [{"Name": "Apparel and Accessories"}]},
            {"Name": "People", "Confidence": 93.6172103881836, "Instances": [], "Parents": [{"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
            {"Name": "Face", "Confidence": 73.14128875732422, "Instances": [], "Parents": [{"Name": "Head"}, {"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
            {"Name": "Head", "Confidence": 73.14128875732422, "Instances": [], "Parents": [{"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Person Description"}]},
            {"Name": "Happy", "Confidence": 57.84247970581055, "Instances": [], "Parents": [{"Name": "Face"}, {"Name": "Head"}, {"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Expressions and Emotions"}]},
            {"Name": "Smile", "Confidence": 57.84247970581055, "Instances": [], "Parents": [{"Name": "Face"}, {"Name": "Happy"}, {"Name": "Head"}, {"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Expressions and Emotions"}]},
            {"Name": "Tie", "Confidence": 55.581790924072266, "Instances": [], "Parents": [{"Name": "Accessories"}, {"Name": "Formal Wear"}], "Aliases": [], "Categories": [{"Name": "Apparel and Accessories"}]},
            {"Name": "Blonde", "Confidence": 55.506290435791016, "Instances": [], "Parents": [{"Name": "Hair"}, {"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Beauty and Personal Care"}]},
            {"Name": "Hair", "Confidence": 55.506290435791016, "Instances": [], "Parents": [{"Name": "Person"}], "Aliases": [], "Categories": [{"Name": "Beauty and Personal Care"}]}
        ],
        "LabelModelVersion": "3.0"
    },
    amazon_test_photo_5 : {
        "Labels": [
          { "Name": "Accessories", "Confidence": 100, "Instances": [], "Parents": [], "Aliases": [{ "Name": "Accessory" }], "Categories": [{ "Name": "Apparel and Accessories" }] },
          { "Name": "Glasses", "Confidence": 100, "Instances": [{ "BoundingBox": { "Width": 0.4502870738506317, "Height": 0.16225020587444305, "Left": 0.08653193712234497, "Top": 0.34648600220680237 }, "Confidence": 82.17159271240234 }], "Parents": [{ "Name": "Accessories" }], "Aliases": [], "Categories": [{ "Name": "Apparel and Accessories" }] },
          { "Name": "Face", "Confidence": 99.9867935180664, "Instances": [], "Parents": [{ "Name": "Head" }, { "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Person Description" }] },
          { "Name": "Head", "Confidence": 99.9867935180664, "Instances": [], "Parents": [{ "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Person Description" }] },
          { "Name": "Person", "Confidence": 99.9867935180664, "Instances": [{ "BoundingBox": { "Width": 0.8062224388122559, "Height": 0.9011920094490051, "Left": 0, "Top": 0.09877120703458786 }, "Confidence": 99.23601531982422 }], "Parents": [], "Aliases": [{ "Name": "Human" }], "Categories": [{ "Name": "Person Description" }] },
          { "Name": "Photography", "Confidence": 99.9867935180664, "Instances": [], "Parents": [], "Aliases": [{ "Name": "Photo" }], "Categories": [{ "Name": "Hobbies and Interests" }] },
          { "Name": "Portrait", "Confidence": 99.9867935180664, "Instances": [], "Parents": [{ "Name": "Face" }, { "Name": "Head" }, { "Name": "Person" }, { "Name": "Photography" }], "Aliases": [], "Categories": [{ "Name": "Hobbies and Interests" }] },
          { "Name": "Blonde", "Confidence": 99.97616577148438, "Instances": [], "Parents": [{ "Name": "Hair" }, { "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Beauty and Personal Care" }] },
          { "Name": "Hair", "Confidence": 99.97616577148438, "Instances": [], "Parents": [{ "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Beauty and Personal Care" }] },
          { "Name": "Happy", "Confidence": 99.94497680664062, "Instances": [], "Parents": [{ "Name": "Face" }, { "Name": "Head" }, { "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Expressions and Emotions" }] },
          { "Name": "Smile", "Confidence": 99.94497680664062, "Instances": [], "Parents": [{ "Name": "Face" }, { "Name": "Happy" }, { "Name": "Head" }, { "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Expressions and Emotions" }] },
          { "Name": "Adult", "Confidence": 99.23601531982422, "Instances": [{ "BoundingBox": { "Width": 0.8062224388122559, "Height": 0.9011920094490051, "Left": 0, "Top": 0.09877120703458786 }, "Confidence": 99.23601531982422 }], "Parents": [{ "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Person Description" }] },
          { "Name": "Female", "Confidence": 99.23601531982422, "Instances": [{ "BoundingBox": { "Width": 0.8062224388122559, "Height": 0.9011920094490051, "Left": 0, "Top": 0.09877120703458786 }, "Confidence": 99.23601531982422 }], "Parents": [{ "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Person Description" }] },
          { "Name": "Woman", "Confidence": 99.23601531982422, "Instances": [{ "BoundingBox": { "Width": 0.8062224388122559, "Height": 0.9011920094490051, "Left": 0, "Top": 0.09877120703458786 }, "Confidence": 99.23601531982422 }], "Parents": [{ "Name": "Adult" }, { "Name": "Female" }, { "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Person Description" }] },
          { "Name": "Body Part", "Confidence": 56.897674560546875, "Instances": [], "Parents": [], "Aliases": [], "Categories": [{ "Name": "Person Description" }] },
          { "Name": "Neck", "Confidence": 56.897674560546875, "Instances": [], "Parents": [{ "Name": "Body Part" }, { "Name": "Face" }, { "Name": "Head" }, { "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Person Description" }] }
        ],
        "LabelModelVersion": "3.0"
    },
    amazon_test_photo_6 :  {
        "Labels": [
          { "Name": "Face", "Confidence": 99.9994888305664, "Instances": [], "Parents": [{ "Name": "Head" }, { "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Person Description" }] },
          { "Name": "Happy", "Confidence": 99.9994888305664, "Instances": [], "Parents": [{ "Name": "Face" }, { "Name": "Head" }, { "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Expressions and Emotions" }] },
          { "Name": "Head", "Confidence": 99.9994888305664, "Instances": [], "Parents": [{ "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Person Description" }] },
          { "Name": "Person", "Confidence": 99.9994888305664, "Instances": [{ "BoundingBox": { "Width": 0.6167792677879333, "Height": 0.8374993801116943, "Left": 0.2734849452972412, "Top": 0.16086582839488983 }, "Confidence": 99.17813110351562 }], "Parents": [], "Aliases": [{ "Name": "Human" }], "Categories": [{ "Name": "Person Description" }] },
          { "Name": "Smile", "Confidence": 99.9994888305664, "Instances": [], "Parents": [{ "Name": "Face" }, { "Name": "Happy" }, { "Name": "Head" }, { "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Expressions and Emotions" }] },
          { "Name": "Adult", "Confidence": 99.17813110351562, "Instances": [{ "BoundingBox": { "Width": 0.6167792677879333, "Height": 0.8374993801116943, "Left": 0.2734849452972412, "Top": 0.16086582839488983 }, "Confidence": 99.17813110351562 }], "Parents": [{ "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Person Description" }] },
          { "Name": "Female", "Confidence": 99.17813110351562, "Instances": [{ "BoundingBox": { "Width": 0.6167792677879333, "Height": 0.8374993801116943, "Left": 0.2734849452972412, "Top": 0.16086582839488983 }, "Confidence": 99.17813110351562 }], "Parents": [{ "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Person Description" }] },
          { "Name": "Woman", "Confidence": 99.17813110351562, "Instances": [{ "BoundingBox": { "Width": 0.6167792677879333, "Height": 0.8374993801116943, "Left": 0.2734849452972412, "Top": 0.16086582839488983 }, "Confidence": 99.17813110351562 }], "Parents": [{ "Name": "Adult" }, { "Name": "Female" }, { "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Person Description" }] },
          { "Name": "Blonde", "Confidence": 97.79337310791016, "Instances": [], "Parents": [{ "Name": "Hair" }, { "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Beauty and Personal Care" }] },
          { "Name": "Hair", "Confidence": 97.79337310791016, "Instances": [], "Parents": [{ "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Beauty and Personal Care" }] },
          { "Name": "Photography", "Confidence": 92.54857635498047, "Instances": [], "Parents": [], "Aliases": [{ "Name": "Photo" }], "Categories": [{ "Name": "Hobbies and Interests" }] },
          { "Name": "Portrait", "Confidence": 92.54857635498047, "Instances": [], "Parents": [{ "Name": "Face" }, { "Name": "Head" }, { "Name": "Person" }, { "Name": "Photography" }], "Aliases": [], "Categories": [{ "Name": "Hobbies and Interests" }] },
          { "Name": "Dimples", "Confidence": 65.82597351074219, "Instances": [], "Parents": [{ "Name": "Face" }, { "Name": "Head" }, { "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Person Description" }] },
          { "Name": "Architecture", "Confidence": 57.64710235595703, "Instances": [], "Parents": [], "Aliases": [], "Categories": [{ "Name": "Buildings and Architecture" }] },
          { "Name": "Building", "Confidence": 57.64710235595703, "Instances": [], "Parents": [{ "Name": "Architecture" }], "Aliases": [], "Categories": [{ "Name": "Buildings and Architecture" }] },
          { "Name": "Wall", "Confidence": 57.64710235595703, "Instances": [], "Parents": [{ "Name": "Architecture" }, { "Name": "Building" }], "Aliases": [], "Categories": [{ "Name": "Buildings and Architecture" }] },
          { "Name": "Body Part", "Confidence": 56.41163635253906, "Instances": [], "Parents": [], "Aliases": [], "Categories": [{ "Name": "Person Description" }] },
          { "Name": "Neck", "Confidence": 56.41163635253906, "Instances": [], "Parents": [{ "Name": "Body Part" }, { "Name": "Face" }, { "Name": "Head" }, { "Name": "Person" }], "Aliases": [], "Categories": [{ "Name": "Person Description" }] },
          { "Name": "Laughing", "Confidence": 55.857540130615234, "Instances": [], "Parents": [{ "Name": "Face" }, { "Name": "Happy" }, { "Name": "Head" }, { "Name": "Person" }], "Aliases": [{ "Name": "Laugh" }], "Categories": [{ "Name": "Expressions and Emotions" }] },
          { "Name": "Rock", "Confidence": 55.43935775756836, "Instances": [], "Parents": [], "Aliases": [], "Categories": [{ "Name": "Nature and Outdoors" }] },
          { "Name": "Stone Wall", "Confidence": 55.06966018676758, "Instances": [], "Parents": [{ "Name": "Architecture" }, { "Name": "Building" }, { "Name": "Wall" }], "Aliases": [], "Categories": [{ "Name": "Buildings and Architecture" }] }
        ],
        "LabelModelVersion": "3.0"
      }};          
                      
function get_test_data(file_name){
    try {
        // Code that may throw an exception
        return test_data[file_name];
    } catch {
        // Code to handle the exception
        console.log("NO TEST DATA");
        return null;
    }
};


export { get_test_data };

