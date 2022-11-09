import React from "react";
import PropTypes from "prop-types";

const VimeoEmbed = ({ embedId }) => (
  <iframe src={`https://player.vimeo.com/video/${embedId}`}
    width="100%"
    height="550"
    frameborder="0"
    allow="autoplay; fullscreen"
    allowfullscreen></iframe>
);

VimeoEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default VimeoEmbed;