import {Button, FormControl, InputGroup} from "react-bootstrap";
import {useState} from "react";

function SearchBar({searchFtn}) {
    const [query, setQuery] = useState("");

    return (
        <div>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search for something"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2" onChange={(e)=> setQuery(e.target.value)}
                />
                <Button id="button-addon2" onClick={() => searchFtn(query)}>
                    Search
                </Button>
            </InputGroup>
        </div>

    )
}

export default SearchBar;