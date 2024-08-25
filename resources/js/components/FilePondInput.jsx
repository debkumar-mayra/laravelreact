import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const FilePondInput = ({
    name,
    files,
    handleChange,
    allowMultiple = false,
    labelIdle,
}) => {
    return (
        <FilePond
            files={files}
            onupdatefiles={(fileItems) =>
                handleChange(fileItems, name, allowMultiple)
            }
            allowMultiple={allowMultiple}
            name={name}
            labelIdle={
                labelIdle ||
                'Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            }
        />
    );
};

export default FilePondInput;
