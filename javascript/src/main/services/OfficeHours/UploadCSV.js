import { fetchWithToken } from "main/utils/fetch";

const uploadOfficeHoursCSV = (getToken, onSuccess, onError) => {
    const func = async (file) => {
        const data = new FormData();
        data.append( "csv",file);
        
        try{
            await fetchWithToken('/api/admin/officehours/upload', getToken, {
                method: "POST",
                body: data
            });
            onSuccess();
        } catch (err){
            onError(err);
        }
    };
    return func;
}

export default uploadOfficeHoursCSV; 
