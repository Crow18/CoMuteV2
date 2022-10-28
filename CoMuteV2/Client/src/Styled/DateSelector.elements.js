
import styled from "styled-components";

export const DateTimePickerUtility = styled.div`
display: flex;
align-items: center;
justify-content: ${props => {
        switch(props.position)
        {
            case 'right':
                return 'end';
       
            case 'left':
                return 'start';

            default:
                return 'center'
        }
        
    }
};


.icon{
       

       }

    .rmdp-container
    {
        

        .rmdp-input
        {
            
            text-align: center;
            min-width: 100%;
            height: 1.8em;
            padding: .2em;
            border-radius: 5px;
            border: none;
            font-size: .8em;
            font-weight: 500;
            background-color: ${props => props.theme.inputColor};
            color: ${props => props.theme.fontColor};
            
            &:focus{
                outline: none;
                border: 1px solid ${props=> props.theme.defaultTextColored};
            }    
        }

    
        .calclock{
            background-color: ${props => props.theme.backgroundColor};
            border: 1px solid ${props=> props.theme.defaultTextColored};
            box-shadow: none;
            color:  ${props=> props.theme.defaultTextColored};
            border-radius: 10px;
            
            .rmdp-calendar{
            
                border-color: ${props=> props.theme.headerColor};                
                

                .rmdp-header{

                    div{
                        color: ${props=> props.theme.headerColor};
                    }

                    .rmdp-arrow-container{                  

                        &:hover{
                            background-color: ${props=> props.theme.headerColor};                        
                        }                    
                    }

                    span .rmdp-arrow{
                            border-color: ${props=> props.theme.headerColor};
                            
                            &:hover{
                                border-color: ${props=> props.theme.defaultText};

                            }
                        }
                }
                
                .rmdp-month-picker{
                    background-color: ${props => props.theme.backgroundColor};
                    color: ${props => props.theme.fontColor};
                }

                .rmdp-year-picker{
                    background-color: ${props => props.theme.backgroundColor};
                    color: ${props => props.theme.fontColor};
                    .rmdp-selected{
                        &:hover{

                            background-color: ${props => props.theme.headerColor};
                        }
                    }
                }

                .rmdp-week-day{
                color:  ${props=> props.theme.fontColor};
            
                }

                .rmdp-today span{
                    background-color:  ${props => props.theme.itemColor};
                    color:  ${props => props.theme.fontColor};
                }

                .rmdp-day .sd{
                    &:hover{
                        background-color:  ${props => props.theme.headerColor};
                    }
                }

                .rmdp-selected .sd{
                    background-color: ${props=> props.theme.headerColor};
                    color:  ${props=> props.theme.fontColor};
                }

                .sd{
                    color: ${props=> props.theme.defaultText};
                }  
            }



            .rmdp-analog-clock{
                border: 5px solid ${props => props.theme.itemColor};
                background-color: ${props=> props.theme.inputColor};

                .dot{
                    background-color: ${props=> props.theme.backgroundColor};
                }
                
                .rmdp-hour{
                    background-color: ${props=> props.theme.headerColor};
                    width: 5px;
                }

                .rmdp-minute{
                    background-color: ${props=> props.theme.headerColor};
                }

                .dial-lines
                {
                    background-color: ${props=> props.theme.headerColor};
                }

                span{
                    color:  ${props=> props.theme.defaultTextColored};
                }
            }

            .rmdp-time-picker{

                input{
                    background-color:  ${props => props.theme.backgroundColor};
                    color:  ${props=> props.theme.defaultText};

                    &:focus{
                        border: 1px solid ${props=> props.theme.defaultTextColored};
                        outline: none;
                        border-radius: 5px;
                    }
                }


                .rmdp-arrow-container{

                    &:hover{
                        background-color: ${props=> props.theme.headerColor};
                    }

                    .rmdp-arrow{
                        border-color: ${props=> props.theme.headerColor};
                    }
                }
                
            }

        }
        
    }
`;