
export const validFile = (extension) => {
    if (extension == 'png' || extension == 'jpg' || extension == 'jpeg') {
        return true;
    }
    return false;
}