import React, {useState, useEffect} from 'react';
import Layout from '@/Layouts/Admin/Layout';
import {Link, usePage} from "@inertiajs/inertia-react";
import {humanFileSize} from '@/utils';
import Pagination from '@/Shared/Pagination';
import SearchFilter from './SearchFilter';
import ConfirmModal from '@/Shared/Modals/ConfirmModal';
import {Inertia} from '@inertiajs/inertia';

const VideoActionToolbar = ({setHoverLocked, file}) => {

  return (
    <>
      {(file.is_archived == 0 && <ArchiveVideoDialog setHoverLocked={setHoverLocked} file={file}/>)}
      {(file.is_archived == 1 && <ActiveVideoDialog setHoverLocked={setHoverLocked} file={file}/>)}
    </>
  )
}

const ArchiveVideoDialog = ({setHoverLocked, file}) => {

  const [archiveVideoDialog, setArchiveVideoDialog] = useState(false);

  useEffect(() => {
    setHoverLocked(archiveVideoDialog);
  }, [archiveVideoDialog]);

  function handleArchiveVideoSubmit(e) {
    Inertia.post(route('files.archiveFile', file.id), {
      preserveScroll: true
    });
  }

  return (
    <>
      <ConfirmModal
        title="Archive video?"
        open={archiveVideoDialog}
        onClose={() => setArchiveVideoDialog(false)}
        onConfirm={handleArchiveVideoSubmit}
      >
        Are you sure you want to archive this video<br/>`{file.filename}`?
      </ConfirmModal>

      <span className="cursor-pointer" onClick={() => setArchiveVideoDialog(true)}><i
        className="bi bi-archive"></i></span>
    </>
  )
}

const ActiveVideoDialog = ({setHoverLocked, file}) => {

  const [activeVideoDialog, setActiveVideoDialog] = useState(false);

  useEffect(() => {
    setHoverLocked(activeVideoDialog);
  }, [activeVideoDialog]);

  function handleActiveVideoSubmit(e) {
    Inertia.post(route('files.activeFile', file.id), {
      preserveScroll: true
    });
  }

  return (
    <>
      <ConfirmModal
        title="Active video?"
        open={activeVideoDialog}
        onClose={() => setActiveVideoDialog(false)}
        onConfirm={handleActiveVideoSubmit}
      >
        Are you sure you want to active this video<br/>`{file.filename}`?
      </ConfirmModal>

      <span className="cursor-pointer" onClick={() => setActiveVideoDialog(true)}><i className="bi bi-check-circle"></i></span>
    </>
  )
}

const VideoRowData = ({file}) => {
  const [hovered, setHovered] = useState(false);
  const [hoverLocked, setHoverLocked] = useState(false);

  return (
    <tr className="hover:bg-gray-100 focus-within:bg-gray-100"
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <td className="px-6 pt-5 pb-4">
        <figure>
          <img src={file.video_thumbnail} className="rounded object-cover"/>
        </figure>
      </td>
      <td><a href={route('files.downloadFile', file.id)}>{file.filename}</a></td>
      <td>{humanFileSize(file.size)}</td>
      <td>{file.ext}</td>
      <td>{file.created_at}</td>
      <td>{file.updated_at}</td>
      <th>
        <div className={`inline-flex items-center pr-5 ${hovered || hoverLocked ? 'block' : 'hidden'}`}>
          <VideoActionToolbar setHoverLocked={setHoverLocked} file={file}/>
        </div>
      </th>
    </tr>
  );
};

const Videos = () => {
  const {files, filters} = usePage().props;
  const {
    data,
    meta: {links}
  } = files;

  return (
    <div>
      <ul className="nav nav-tabs newtabsv main-course-tabs bg-white nav-line-tabs nav-line-tabs-2x fs-5">
        <li className="nav-item"><Link className={`nav-link ${(filters?.mode != 'archived' && 'active')}`}
                                       href={route("videos")}>Active</Link></li>
        <li className="nav-item"><Link className={`nav-link ${(filters.mode == 'archived' && 'active')}`}
                                       href={route("videos") + "?mode=archived"}>Archived</Link></li>
      </ul>
      <div className="tab-content w-100">
        <SearchFilter placeHolder={"Search videos by name"}/>
        <div className="tab-pane fade show active" role="tabpanel">
          <div className="overflow-x-auto bg-white shadow">
            <table className="w-full whitespace-nowrap">
              <thead>
              <tr className="font-bold text-left">
                <th className="px-6 pt-5 pb-4">Thumbnail</th>
                <th className="px-6 pt-5 pb-4">Filename</th>
                <th className="px-6 pt-5 pb-4">Size</th>
                <th className="px-6 pt-5 pb-4">Ext</th>
                <th className="px-6 pt-5 pb-4">Uploaded</th>
                <th className="px-6 pt-5 pb-4">Modified</th>
                <th className="px-6 pt-5 pb-4"></th>
              </tr>
              </thead>
              <tbody>
              {data.map((file, index) => (
                <VideoRowData file={file} key={index}/>
              ))}
              {data.length === 0 && (
                <tr>
                  <td className="px-6 py-4 border-t" colSpan="7">
                    No files found.
                  </td>
                </tr>
              )}
              </tbody>

            </table>
          </div>
          <Pagination links={links}/>
        </div>
      </div>
    </div>
  );
};

Videos.layout = page => <Layout title="Videos" children={page} openedMenu="10"/>;

export default Videos;
