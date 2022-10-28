const ACTIONS ={
    TO_ISO: 'toIsoDate',
    TO_LOCALE: 'toLocaleDate' 
};

function dateReducer(action)
{
    switch (action.type){
        case ACTIONS.TO_ISO:
            let year = action.payload.split(', ')[0].split('/').reverse().join('/');
            let fullDate = year+ ', ' +action.payload.split(' ')[1];
            return new Date(fullDate).toISOString();

        case ACTIONS.TO_LOCALE:
            return new Date(action.payload).toLocaleTimeString('en-GB', {hourCycle: "h12", year:"numeric", month:"numeric", day:"numeric", hour:"2-digit", minute:"2-digit"});
            
        default:
            return ;
    }
}

export default function useJSONDateConvert()
{

    const convertToISODate = (dt) => {
 
        return dateReducer({type: ACTIONS.TO_ISO, payload: dt});
    }

    const convertToLocaleDate = (dt) => {
        return dateReducer({type: ACTIONS.TO_LOCALE, payload: dt});

    }

    return [convertToISODate, convertToLocaleDate];
}