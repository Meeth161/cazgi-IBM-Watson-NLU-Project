import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        let list;
        if(this.props.type === 'url')
            list = this.props.emotions.result.entities[0].emotion;
        else
            list = this.props.emotions.result.keywords[0].emotion;
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
                Object.entries(list).map(function(mapentry) {

                    return (
                        <tr>
                            <td>{mapentry[0]}</td>
                            <td>{mapentry[1]}</td>
                        </tr>
                    )
                })
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
