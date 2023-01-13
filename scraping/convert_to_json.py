# Script to convert the unit list.txt file to a json object 




if __name__ == "__main__":
    txtFile = open("unit_list.txt", "r")
    jsonFile = open("units.json", "w")
    jsonFile.write("{\n\"units\": [")
    
    for line in txtFile:
        if line:
            spaceIndex = line.find(' ')
            name = line[0:spaceIndex]
            desc = line[spaceIndex+1:-1]
            
            jsonFile.write("{" + f"\"name\": \"{name}\", \"desc\": \"{desc}\"" + "},\n")
        jsonFile.flush()
        
    
    
    jsonFile.write("]\n}")
    
    txtFile.close()
    jsonFile.close()