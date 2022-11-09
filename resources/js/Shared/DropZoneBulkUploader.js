import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Inertia } from '@inertiajs/inertia';
import VideoSnapshot from 'video-snapshot';
import { resizedataURL } from '@/utils';

const DropZoneBulkUploader = ({ onSuccess, accept, chapter, dropzoneProcessing, setDropzoneProcessing, dropzoneDisabled, extraInfo }) => {

    const [rejectedFiles, setRejectedFiles] = useState([]);
    const [errors, setErrors] = useState([]);

    const [progressPercentage, setProgressPercentage] = useState(0);
    const [cancelToken, setCancelToken] = useState(null);

    const validVideoTypes = ["video/mp4", "video/3gp", "video/mov", "video/avi", "video/wmv"];

    const handleOnDropRejected = (rejectedFiles) => {
        setRejectedFiles(rejectedFiles);
    }

    const handleOnDropAccepted = async (acceptedFiles) => {

        setDropzoneProcessing(true);

        let videoThumbnailData = [];
        let isLibaray = false;
        videoThumbnailData = await Promise.all(acceptedFiles.map(async (file) => {
            if (validVideoTypes.includes(file.type)) {
                if (!isLibaray) isLibaray = true;
                const snapshoter = new VideoSnapshot(file);
                const snapshot = await snapshoter.takeSnapshot();
                return resizedataURL(snapshot, 50, 50);
            } else {
                return null;
            }
        }));

        Inertia.post(route('bulkUpload', chapter.id), { 'uploads': acceptedFiles, 'uploadableSection': { 'name': "Bulk", 'section': 'Primary' }, 'isLibaray': isLibaray, 'thumbnails': videoThumbnailData }, {
            preserveScroll: true,
            onProgress: (progress) => {
                const percentage = parseInt((progress.loaded / progress.total) * 100);
                setProgressPercentage(percentage);
            },
            onCancelToken: (cancelToken) => {
                setCancelToken(cancelToken);
            },
            onSuccess: (response) => {
                if (response.props.flash.data) {
                    onSuccess(response.props.flash.data);
                } else {
                    setDropzoneProcessing(false);
                }
            },
            onError: (errors) => {
                setErrors(errors);
                setDropzoneProcessing(false);
            }
        });
    }

    const fileRejectionItems = rejectedFiles.map(({ file, errors }) => (
        <li key={file.path}>
            <h5 className="text-white mt-2">{file.path} - {file.size} bytes</h5>
            <ul>
                {errors.map(e => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    const onCancelRequest = () => {
        cancelToken && cancelToken.cancel();
        setDropzoneProcessing(false);
    }

    return (
        <>
            <Dropzone onDropAccepted={handleOnDropAccepted}
                onDropRejected={handleOnDropRejected}
                accept={accept}
                multiple={true}
                disabled={dropzoneDisabled}
            >
                {({ getRootProps, getInputProps }) => (
                    !dropzoneProcessing &&
                    <section>
                        {rejectedFiles.length > 0 &&
                            <div className="mb-5 flex items-center justify-between bg-red-500 text-white rounded">
                                <div className="flex items-center m-2">
                                    <ul>{fileRejectionItems}</ul>
                                </div>
                                <button
                                    onClick={() => setRejectedFiles([])}
                                    type="button"
                                    className="focus:outline-none group mr-2 p-2"
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                        }
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <h4 className="mt-5">Drag 'n' drop file here, or click to select files</h4>
                            <p className="mt-5"><small>{extraInfo}</small></p>
                        </div>
                    </section>
                )}
            </Dropzone>
            {dropzoneProcessing && <div className="flex mb-5"><button className="btn btn-info" disabled={true}><i className="bi bi-clock"></i> Processing ({progressPercentage}%) ...</button><span className="cursor-pointer btn btn-secondary ml-5" onClick={() => onCancelRequest()}>Cancel</span></div>}
            {errors.uploads && <div className="fv-plugins-message-container invalid-feedback">{errors.uploads}</div>}
        </>
    )
}

export default DropZoneBulkUploader;