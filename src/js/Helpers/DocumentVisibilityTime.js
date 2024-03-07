export class DocumentVisibilityTime {
    static timeSpentOutside = null;
    static timeWhenCameOutOfDocument;
    static hidden = false;

    static start() {
        if (this.timeSpentOutside !== null) {
            return false;
        }

        DocumentVisibilityTime.timeSpentOutside = 0;

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                DocumentVisibilityTime.hidden = true;
                DocumentVisibilityTime.timeWhenCameOutOfDocument = performance.now();
            } else if (DocumentVisibilityTime.hidden) {
                DocumentVisibilityTime.hidden = false;
                DocumentVisibilityTime.timeSpentOutside += performance.now() - DocumentVisibilityTime.timeWhenCameOutOfDocument;
            }
        });

        return true;
    }

    static get now() { 
        return performance.now() - DocumentVisibilityTime.timeSpentOutside;
    }
}