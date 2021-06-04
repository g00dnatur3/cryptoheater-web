
export class BaseStyle {
  public container: React.CSSProperties = {

  };
  public row?: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
  };
  public separator?: React.CSSProperties = {
      borderWidth: 0,
      borderTopWidth: 1,
      borderStyle: 'solid',
      height: 0,
      paddingBottom: 20,
      color: 'lightgrey',
  };
  // flip: React.CSSProperties = {
  //   transform: 'scaleX(-1)',
  //   WebkitTransform: 'scaleX(-1)',
  // }
  public picture?: React.CSSProperties = {
    paddingTop: 5,
    paddingBottom: 5,
  };
  public center: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  public centerColumn?: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };
  public column?: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };
  public centerRow?: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  };
  public withStyles ? = (styles) => {
    if (styles) {
      const keys = Object.keys(styles);
      for (const key of keys) {
        this[key] = Object.assign(this[key], styles[key]);
      }
    }
  }
}

export default BaseStyle;
