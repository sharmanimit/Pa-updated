import React from "react";
import HeadersAndFootersView from "../FileApproval/documentEditor/editor";

const Editor = ({ editorId, editorUrl }) => {
  return (
    <div>
      <HeadersAndFootersView
        fileId={editorId}
        fileUrl1={editorUrl}
        blnIsPartCase={false}
        isAnnexure={true}
        blnShowQuickSign={true}
      />
    </div>
  );
};

export default Editor;
