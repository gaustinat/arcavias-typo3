<?php

/**
 * @copyright Copyright (c) Metaways Infosystems GmbH, 2011
 * @license LGPLv3, http://www.arcavias.com/en/license
 * @version $Id: TablesCreateMAdmin.php 14246 2011-12-09 12:25:12Z nsendetzky $
 */


/**
 * Creates all required tables.
 */
class MW_Setup_Task_TablesCreateMAdmin extends MW_Setup_Task_Abstract
{
	/**
	 * Returns the list of task names which this task depends on.
	 *
	 * @return array List of task names
	 */
	public function getPreDependencies()
	{
		return array( 'TablesCreateMShop' );
	}


	/**
	 * Returns the list of task names which depends on this task.
	 *
	 * @return array List of task names
	 */
	public function getPostDependencies()
	{
		return array();
	}


	/**
	 * Executes the task for MySQL databases.
	 */
	protected function _mysql()
	{
		$this->_msg('Creating admin tables', 0);
		$this->_status('');

		$ds = DIRECTORY_SEPARATOR;

		$files = array(
			dirname(realpath(__FILE__)) . $ds . 'default' . $ds . 'schema' . $ds . 'mysql' . $ds . 'log.sql',
			dirname(realpath(__FILE__)) . $ds . 'default' . $ds . 'schema' . $ds . 'mysql' . $ds . 'job.sql',
		);

		$this->_setup($files);
	}


	/**
	 * Creates all required tables if they doesn't exist
	 */
	protected function _setup( array $files )
	{
		foreach ( $files as $filepath )
		{
			$this->_msg('Using tables from ' . basename($filepath), 1); $this->_status('');

			if ( ( $content = file_get_contents($filepath) ) === false ) {
				throw new MW_Setup_Exception(sprintf('Unable to get content from file "%1$s"', $filepath));
			}

			foreach ( $this->_getTableDefinitions($content) as $name => $sql )
			{
				$this->_msg(sprintf('Checking table "%1$s": ', $name), 2);

				if ( $this->_schema->tableExists($name) !== true ) {
					$this->_execute($sql);
					$this->_status('created');
				} else {
					$this->_status('OK');
				}
			}

			foreach ( $this->_getIndexDefinitions($content) as $name => $sql )
			{
				$parts = explode('.', $name);
				$this->_msg(sprintf('Checking index "%1$s": ', $name), 2);

				if ( $this->_schema->indexExists($parts[0], $parts[1]) !== true ) {
					$this->_execute($sql);
					$this->_status('created');
				} else {
					$this->_status('OK');
				}
			}
		}
	}
}
