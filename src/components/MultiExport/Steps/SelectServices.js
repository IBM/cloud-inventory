import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Checkbox } from "carbon-components-react";
import Categories from "../../Categories";

const SelectServices = forwardRef((props, ref) => {
  const [checkedCount, setCheckedCount] = useState(0);
  const [checkedServices, setCheckedServices] = useState([]);

  const handleCheckService = (event, service) => {
    if (event) {
      const tempCheckedServices = checkedServices;
      tempCheckedServices.push(service);
      setCheckedServices(tempCheckedServices);
      setCheckedCount(checkedCount + 1);
    } else {
      setCheckedServices(
        checkedServices.filter((checkedService) => checkedService !== service)
      );
      setCheckedCount(checkedCount - 1);
    }
  };

  useEffect(() => {
    let servicesLenght = 0;
    Categories.forEach(
      (category) => (servicesLenght += category.services.length)
    );

    setCheckedServices(
      Categories.flatMap((category) =>
        category.services.map((service) => service)
      )
    );

    setCheckedCount(servicesLenght);
  }, []);

  // Exporta funcoes deste componente como referencia
  // para serem usada em outros componentes
  useImperativeHandle(ref, () => {
    return {
      getServices: checkedServices,
    };
  });

  return (
    <div>
      <div className="bx--export--services">
        <div className="bx--export--services__title">
          <div>Select which services you want to export:</div>
          <div>Total Selected: {checkedCount}</div>
        </div>
        {Categories.map((category) => {
          return (
            <div>
              <div className="bx--export--services__title">
                {category.title}
              </div>
              <div className="bx--export--services__options">
                {category.services.map((service) => {
                  return (
                    <Checkbox
                      id={`checkbox-${service.path}`}
                      labelText={service.title}
                      defaultChecked={true}
                      onChange={(event) => {
                        handleCheckService(event, service);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default SelectServices;
