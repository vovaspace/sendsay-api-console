import { createPortal } from 'react-dom';

import { ChildrenPropType } from '@/utils';


const MOUNT_NODE = document.body;


export const Portal = (props) => {
  const {
    children,
  } = props;


  return createPortal(children, MOUNT_NODE);
};


export const PortalPropTypes = {
  children: ChildrenPropType.isRequired,
};


Portal.propTypes = PortalPropTypes;
