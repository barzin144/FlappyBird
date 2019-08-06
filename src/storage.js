
export default class Storage {

    getStorageData()
    {
        return JSON.parse(localStorage.getItem('flappyBirdData'));
    }

    setStorageData(data)
    {
        localStorage.setItem('flappyBirdData', JSON.stringify(data));
    }
}