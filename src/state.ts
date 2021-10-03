import LightState from "react-light-state";

export type Note = {
    _id?: string;
    title?: string;
    note?: string;
};

type State = {
    notes: Note[];
};

const initState = {
    notes: [],
};

const store = new LightState<State>(initState, "simplenote", {
    storageName: "simplenotestore",
});

const { useStore, setState, getState } = store;
export { useStore };

export const notesSelector = (state: State) => state.notes;

export const add = () => {
    const _id = Date.now().toString();
    setState((state) => ({
        ...state,
        notes: [
            {
                _id,
                title: "untitled",
            },
            ...state.notes,
        ],
    }));
    return _id;
};

export const getContent = (_id: string) => {
    const notes = getState("notes");
    return notes.find((item) => item._id === _id);
};
export const updateContent = (_id: string, note: string) => {
    setState((state) => {
        const notes = [...state.notes];
        const idx = notes.findIndex((item) => item._id === _id);
        notes[idx].note = note;
        notes[idx].title = note.split("\n")[0] || "unnamed";
        return { notes };
    });
};
export const deteteNote = (_id: string) => {
    setState((state) => {
        const notes = [...state.notes];
        const idx = notes.findIndex((item) => item._id === _id);
        notes.splice(idx, 1);
        return { notes };
    });
};
