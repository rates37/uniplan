from selenium import webdriver
from selenium.webdriver.common.by import By
import re
import time

opening = "<span class=\"\">"
ending = "</span>"
next_button_id = "pagination-page-next"

if __name__ == "__main__":
    browser = webdriver.Chrome("./chromedriver.exe")
    url = "https://handbook.monash.edu/search"
    browser.get(url)
    
    # open file for writing to:
    myFile = open("unit_list.txt", 'w')
    
    # wait for user to allow continue:
    input("press enter to begin scraping units")
    
    # read browser pages one at a time:
    for _ in range(122):
        # read content:
        content = browser.page_source
        # print(f"Page source: {content}")
        # find spans:
        start_indices = [m.end() for m in re.finditer(opening, content)]
        end_indices = [m.start() for m in re.finditer(ending, content)]
        print(len(start_indices), ',', len(end_indices))
        
        
        # write each unit to the file:
        if start_indices and end_indices:
            for start in start_indices:
                end = min(i for i in end_indices if i > start)
                # print(content[start:end])
                myFile.write(content[start:end] + '\n')
        myFile.flush()
        
        # # loop if necessary:
        # if input("Enter 0 to exit or press enter to continue") == "0":
        #     break
        
        # go to next page:
        browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)  # wait to scroll down so next page button becomes clickable
        
        # wait for page to load:
        time.sleep(1)
        while True:
            try:
                browser.find_element(By.ID, next_button_id).click()
            except:
                 pass
            else:
                break
        
        # browser.find_element(By.ID, next_button_id).click()
        
    # close file:
    myFile.close()