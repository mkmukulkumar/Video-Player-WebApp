import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ListItem {
  description: string;
  sources: string[];
  subtitle: string;
  thumb: string;
  title: string;
}

interface InitialState {
  value: ListItem[];
}

const initialState: InitialState = {
  value: [],
};



export const playlist= createSlice({
    name:"playlist",
    initialState,
    reducers: {
        addtoPlaylist:(state,action:PayloadAction<ListItem>)=>{
            // state.value.unshift(action.payload);
            const itemIndex = state.value.findIndex(item => item.title === action.payload.title);
            if (itemIndex === -1) {
                state.value.unshift(action.payload);
            } 
            else{
                const [existingItem] = state.value.splice(itemIndex, 1);
                state.value.unshift(existingItem);
            }
            
        },
        removefromPlaylist:(state,action:PayloadAction<ListItem>)=>{
            const itemToRemove = action.payload;
            const indexToRemove = state.value.findIndex(item => item.title === itemToRemove.title);

            if (indexToRemove !== -1) {
                state.value.splice(indexToRemove, 1);
            }
        },
    }
})
export const {addtoPlaylist,removefromPlaylist} =playlist.actions;
export default playlist.reducer;