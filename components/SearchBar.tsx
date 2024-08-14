"use client";

import { FormEvent, useState } from "react";

const isValidAmazonLink = (url : string) => {
    try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;

        if(hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.endsWith('amazon')){
            return true;
        }
    } catch (e) {
        return false;
    }
    return false;
}

const SearchBar = () => {
    const [searchPrompt, setSearchPrompt] = useState('')
    const handleFormSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValidLink = isValidAmazonLink(searchPrompt);
        alert(isValidLink ? "Valid Link" : "Invalid Link");
    }
  return (
    <form 
    className="flex flex-wrap gap-4 mt-12"
    onSubmit={handleFormSubmit}
    >
    <input
     type="text"
     placeholder="Enter Product Link"
     className="searchbar-input"
     value={searchPrompt}
     onChange={(e)=>setSearchPrompt(e.target.value)}
      />
      <button type="submit" className="searchbar-btn">
        Search
      </button>
    </form>
  )
}

export default SearchBar