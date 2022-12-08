import { useEffect, useState } from "react";

const useDialogVisibility = () => {
    const [dialogOpened, setDialogOpened] = useState(false);

    useEffect(() => {
        const navigation = document.getElementById('nav');
        if (navigation) {

            if (dialogOpened) {
                navigation.style.display = 'none';
            } else {
                navigation.style.display = '';
            }
        }
    }, [dialogOpened]);

    return [dialogOpened, setDialogOpened] as [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

export default useDialogVisibility;
