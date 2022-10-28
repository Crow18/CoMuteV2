import React, { useRef, useEffect } from 'react';
import usePlacesAutocomplete from "use-places-autocomplete";

import { AutoCompleteInput, AutoCompleteDataList, AutoCompleteOption, AutoCompleteAddressContainer } from '../../Styled/AutoCompleteAddress.elements';

const AutoCompleteAddress = ({readOnly, Value, rf}) => {
    const {ready, value, setValue, suggestions: {status, data}, clearSuggestions} = usePlacesAutocomplete();
    const blurRef = useRef();

    useEffect(() => {
      document.addEventListener("click", handleOnBlur)

      return(() => {
        document.removeEventListener("click", handleOnBlur)
      });
    }, [ready])
    
    const handleOnBlur = (e) =>{

      !blurRef.current.contains(e.target) && clearSuggestions();

    }

    const handleInput = () => {
        setValue(rf.current.value);
      };
    
      const handleSelect = (e) => {
        setValue(e.target.value, false);
        clearSuggestions();
      };

  return (
    <AutoCompleteAddressContainer>
        <AutoCompleteInput onChange={handleInput} ref={rf} value={value? value : Value}  readOnly={readOnly} />
        <AutoCompleteDataList ref={blurRef}>
        {
          status === 'OK' && data &&
            data.map(({description, place_id}) => 
              <AutoCompleteOption key={place_id} onClick={handleSelect}>{description}</AutoCompleteOption>
            )
        }
        </AutoCompleteDataList>
    </AutoCompleteAddressContainer>
  )
}

export default AutoCompleteAddress