import { useContext } from 'react';
import { createPortal } from 'react-dom';

import { ChildrenPropType } from '@/utils';

import { PortalMountNodeContext } from './PortalMountNodeContext';


const DEFAULT_MOUNT_NODE = document.body;


export const Portal = (props) => {
  const {
    children,
  } = props;

  const contextMountNode = useContext(PortalMountNodeContext);

  return createPortal(children, contextMountNode ?? DEFAULT_MOUNT_NODE);
};


export const PortalPropTypes = {
  children: ChildrenPropType.isRequired,
};


Portal.propTypes = PortalPropTypes;
