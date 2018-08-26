// @flow
import styles from './RemoveColorTool.scss';
import React from 'react';
import { partial } from 'underscore';
import classNames from 'classnames';
import Color from 'color';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const QUERY = gql`
  query {
    likedColors
  }
`;

const REMOVE_COLOR_MUTATION = gql`
  mutation RemoveColor($id: ID!) {
    removeColor(id: $id) @client {
      id
    }
  }
`;

type Props = {
  +color: object,
  +isOnlyItem: boolean,
  +onClick: () => mixed,
};

const RemoveTool = ({ color, isOnlyItem }: Props) => {
  const colorObject = Color(color.hexCode);
  const black = Color('#333');
  const white = Color('#FFF');
  const interfaceColor = colorObject.isDark()
    ? colorObject.mix(white)
    : colorObject.mix(black);

  if (isOnlyItem) {
    return null;
  }

  return (
    <Query query={QUERY}>
      {({ loading, error, data }) => {
        const isOnlyColor = data.likedColors.length === 1;
        if (loading || error || isOnlyColor) {
          return null;
        }

        return (
          <Mutation mutation={REMOVE_COLOR_MUTATION}>
            {(removeColor, { data }) => {
              return (
                <svg
                  className={classNames(styles.removeTool)}
                  onClick={partial(removeColor, {
                    variables: { id: color.id },
                  })}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 408.483 408.483"
                >
                  <g>
                    <path
                      fill={interfaceColor.hex()}
                      d="M87.748 388.784c.46 11.01 9.52 19.7 20.54 19.7h191.91c11.018 0 20.078-8.69 20.54-19.7L334.44 99.468h-260.4L87.75 388.784zM247.655 171.33c0-4.61 3.738-8.35 8.35-8.35h13.355c4.61 0 8.35 3.738 8.35 8.35V336.62c0 4.61-3.738 8.35-8.35 8.35h-13.355c-4.61 0-8.35-3.737-8.35-8.35V171.33zm-58.44 0c0-4.61 3.74-8.35 8.35-8.35h13.355c4.61 0 8.35 3.738 8.35 8.35V336.62c0 4.61-3.738 8.35-8.35 8.35h-13.355c-4.61 0-8.35-3.737-8.35-8.35V171.33zm-58.44 0c0-4.61 3.738-8.35 8.35-8.35h13.355c4.61 0 8.35 3.738 8.35 8.35V336.62c0 4.61-3.74 8.35-8.35 8.35h-13.356c-4.61 0-8.35-3.737-8.35-8.35V171.33zM343.567 21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.97c-2.378 0-4.305 1.928-4.305 4.305v16.737H64.916c-7.125 0-12.9 5.776-12.9 12.9V74.47h304.45V33.944c0-7.125-5.774-12.9-12.9-12.9z"
                    />
                  </g>
                </svg>
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default RemoveTool;
