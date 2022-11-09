import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Inertia } from '@inertiajs/inertia';
import VideoSnapshot from 'video-snapshot';
import { resizedataURL } from '@/utils';

const DropZoneUploader = ({ onSuccess, accept, uploadableSection, multiple = false, fileSize = 50, isHidden = false, isLibaray = false, dropzoneProcessing, setDropzoneProcessing, extraInfo }) => {

    const [rejectedFiles, setRejectedFiles] = useState([]);

    const [progressPercentage, setProgressPercentage] = useState(0);
    const [cancelToken, setCancelToken] = useState(null);

    const handleOnDropRejected = (rejectedFiles) => {
        setRejectedFiles(rejectedFiles);
    }

    const handleOnDropAccepted = async (acceptedFiles) => {

        setDropzoneProcessing(true);

        let videoThumbnailData = [];
        if (isLibaray) {
            videoThumbnailData = await Promise.all(acceptedFiles.map(async (file) => {
                const snapshoter = new VideoSnapshot(file);
                const snapshot = await snapshoter.takeSnapshot();
                return resizedataURL(snapshot, 50, 50);
            }));
        }

        Inertia.post(route('dropzoneFileUpload'), { 'uploads': acceptedFiles, 'uploadableSection': uploadableSection, 'isLibaray': isLibaray, 'thumbnails': videoThumbnailData }, {
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
                setDropzoneProcessing(false);
                // console.log(errors);
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
                multiple={multiple}
                maxSize={(fileSize * 1024 * 1024)}
            >
                {({ getRootProps, getInputProps }) => (
                    (!isHidden && !dropzoneProcessing) &&
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
                            <p className="mt-5"><small>{extraInfo}<br />There is a <b>file size limit of {(fileSize >= 1024 ? `${(fileSize / 1024).toFixed(1)}gb` : `${fileSize}mb`)}</b></small></p>
                        </div>
                    </section>
                )}
            </Dropzone>
            {dropzoneProcessing && <div className="flex mb-5"><button className="btn btn-info" disabled={true}><i className="bi bi-clock"></i> Processing ({progressPercentage}%) ...</button><span className="cursor-pointer btn btn-secondary ml-5" onClick={() => onCancelRequest()}>Cancel</span></div>}
        </>
    )
}

export default DropZoneUploader;